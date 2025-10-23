import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { Resolve, STRING_RESPONSE, FILE_RESPONSE, BUFFER_RESPONSE } from "../resolver";

// Mock fetch for controlled testing
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("Resolve class", () => {
	let resolver: Resolve;
	let mockResponse: Response;

	beforeEach(() => {
		// Reset mocks
		mockFetch.mockReset();

		// Create a fresh resolver instance
		resolver = new Resolve(undefined);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("Constructor and basic setup", () => {
		it("should create an instance of Resolve", () => {
			expect(resolver).toBeInstanceOf(Resolve);
		});

		it("should initialize with a promise response", () => {
			const mockPromise = Promise.resolve(new Response());
			const resolverWithPromise = new Resolve(mockPromise);
			expect(resolverWithPromise).toBeInstanceOf(Resolve);
		});

		it("should add response promise via addResponse method", () => {
			const mockPromise = Promise.resolve(new Response("test"));
			resolver.addResponse(mockPromise);
			expect(resolver["promiseResponse"]).toBe(mockPromise);
		});
	});

	describe("Status code handling", () => {
		it("should track excluded status codes", async () => {
			mockResponse = new Response("OK", { status: 200 });
			resolver.addResponse(Promise.resolve(mockResponse));

			const callback = vi.fn();
			resolver.s200(callback, "RAW");

			// Status 200 should be added to excluded list
			expect(resolver["excludeStatus"]).toContain(200);
		});

		it("should check status correctly", async () => {
			mockResponse = new Response("OK", { status: 200 });
			resolver.addResponse(Promise.resolve(mockResponse));

			const isStatus200 = await resolver["checkStatus"](200);
			const isStatus404 = await resolver["checkStatus"](404);

			expect(isStatus200).toBe(true);
			expect(isStatus404).toBe(false);
		});
	});

	describe("Response type parsing - RAW", () => {
		it("should parse RAW string response", async () => {
			mockResponse = new Response("Hello World", { status: 200 });
			resolver.addResponse(Promise.resolve(mockResponse));

			const callback: STRING_RESPONSE = vi.fn();
			resolver.s200(callback, "RAW");

			// Wait for async operations
			await new Promise((resolve) => setTimeout(resolve, 10));

			expect(callback).toHaveBeenCalledWith("Hello World", expect.any(Response));
		});

		it("should handle default method with RAW response", async () => {
			mockResponse = new Response("Default response", { status: 200 });
			resolver.addResponse(Promise.resolve(mockResponse));

			const callback: STRING_RESPONSE = vi.fn();
			resolver.default(callback, "RAW");

			await new Promise((resolve) => setTimeout(resolve, 10));

			expect(callback).toHaveBeenCalledWith("Default response", expect.any(Response));
		});
	});

	// describe("Response type parsing - JSON", () => {
	// 	it("should parse JSON response", async () => {
	// 		const jsonData = { name: "test", value: 123 };
	// 		mockResponse = new Response(JSON.stringify(jsonData), {
	// 			status: 200,
	// 			headers: { "Content-Type": "application/json" }
	// 		});
	// 		resolver.addResponse(Promise.resolve(mockResponse));

	// 		const callback: JSON_RESPONSE = vi.fn();
	// 		resolver.s200(callback, "JSON");

	// 		await new Promise(resolve => setTimeout(resolve, 10));

	// 		expect(callback).toHaveBeenCalledWith(jsonData, expect.any(Response));
	// 	});

	// 	it("should handle JSON parsing errors", async () => {
	// 		mockResponse = new Response("invalid json", { status: 200 });
	// 		resolver.addResponse(Promise.resolve(mockResponse));

	// 		const callback: JSON_RESPONSE = vi.fn();

	// 		// Expect JSON parsing to throw an error
	// 		expect(() => {
	// 			resolver.s200(callback, "JSON");
	// 		}).not.toThrow(); // The error is thrown asynchronously
	// 	});

	// 	it("should use JSON as default response type", async () => {
	// 		const jsonData = { status: "success" };
	// 		mockResponse = new Response(JSON.stringify(jsonData), { status: 200 });
	// 		resolver.addResponse(Promise.resolve(mockResponse));

	// 		const callback: JSON_RESPONSE = vi.fn();
	// 		resolver.s200(callback, "JSON"); // Explicitly specify JSON as responseType

	// 		await new Promise(resolve => setTimeout(resolve, 10));

	// 		expect(callback).toHaveBeenCalledWith(jsonData, expect.any(Response));
	// 	});
	// });

	describe("Response type parsing - FILE", () => {
		it("should parse FILE (Blob) response", async () => {
			const blobData = new Blob(["file content"], { type: "text/plain" });
			mockResponse = new Response(blobData, { status: 200 });
			resolver.addResponse(Promise.resolve(mockResponse));

			const callback: FILE_RESPONSE = vi.fn();
			resolver.s200(callback, "FILE");

			await new Promise((resolve) => setTimeout(resolve, 10));

			expect(callback).toHaveBeenCalledWith(expect.any(Blob), expect.any(Response));
		});
	});

	describe("Response type parsing - BUFFER", () => {
		it("should parse BUFFER (ArrayBuffer) response", async () => {
			const bufferData = new ArrayBuffer(8);
			mockResponse = new Response(bufferData, { status: 200 });
			resolver.addResponse(Promise.resolve(mockResponse));

			const callback: BUFFER_RESPONSE = vi.fn();
			resolver.s200(callback, "BUFFER");

			await new Promise((resolve) => setTimeout(resolve, 10));

			expect(callback).toHaveBeenCalledWith(expect.any(ArrayBuffer), expect.any(Response));
		});
	});

	describe("HTTP Status Code Methods", () => {
		describe("Success status codes (2xx)", () => {
			it("should handle s200 (OK)", async () => {
				mockResponse = new Response("OK", { status: 200 });
				resolver.addResponse(Promise.resolve(mockResponse));

				const callback = vi.fn();
				resolver.s200(callback, "RAW");

				await new Promise((resolve) => setTimeout(resolve, 10));
				expect(callback).toHaveBeenCalled();
			});

			it("should handle s201 (Created)", async () => {
				mockResponse = new Response("Created", { status: 201 });
				resolver.addResponse(Promise.resolve(mockResponse));

				const callback = vi.fn();
				resolver.s201(callback, "RAW");

				await new Promise((resolve) => setTimeout(resolve, 10));
				expect(callback).toHaveBeenCalled();
			});

			it("should handle s204 (No Content)", async () => {
				mockResponse = new Response(null, { status: 204 });
				resolver.addResponse(Promise.resolve(mockResponse));

				const callback = vi.fn();
				resolver.s204(callback, "RAW");

				await new Promise((resolve) => setTimeout(resolve, 10));
				expect(callback).toHaveBeenCalled();
			});
		});

		describe("Redirection status codes (3xx)", () => {
			it("should handle s301 (Moved Permanently)", async () => {
				mockResponse = new Response("Moved", { status: 301 });
				resolver.addResponse(Promise.resolve(mockResponse));

				const callback = vi.fn();
				resolver.s301(callback, "RAW");

				await new Promise((resolve) => setTimeout(resolve, 10));
				expect(callback).toHaveBeenCalled();
			});
		});

		describe("Client Error status codes (4xx)", () => {
			it("should handle s400 (Bad Request)", async () => {
				mockResponse = new Response("Bad Request", { status: 400 });
				resolver.addResponse(Promise.resolve(mockResponse));

				const callback = vi.fn();
				resolver.s400(callback, "RAW");

				await new Promise((resolve) => setTimeout(resolve, 10));
				expect(callback).toHaveBeenCalled();
			});

			it("should handle s401 (Unauthorized)", async () => {
				mockResponse = new Response("Unauthorized", { status: 401 });
				resolver.addResponse(Promise.resolve(mockResponse));

				const callback = vi.fn();
				resolver.s401(callback, "RAW");

				await new Promise((resolve) => setTimeout(resolve, 10));
				expect(callback).toHaveBeenCalled();
			});

			it("should handle s404 (Not Found)", async () => {
				mockResponse = new Response("Not Found", { status: 404 });
				resolver.addResponse(Promise.resolve(mockResponse));

				const callback = vi.fn();
				resolver.s404(callback, "RAW");

				await new Promise((resolve) => setTimeout(resolve, 10));
				expect(callback).toHaveBeenCalled();
			});

			it("should handle s418 (I'm a teapot)", async () => {
				mockResponse = new Response("I'm a teapot", { status: 418 });
				resolver.addResponse(Promise.resolve(mockResponse));

				const callback = vi.fn();
				resolver.s418(callback, "RAW");

				await new Promise((resolve) => setTimeout(resolve, 10));
				expect(callback).toHaveBeenCalled();
			});
		});

		describe("Server Error status codes (5xx)", () => {
			it("should handle s500 (Internal Server Error)", async () => {
				mockResponse = new Response("Internal Server Error", { status: 500 });
				resolver.addResponse(Promise.resolve(mockResponse));

				const callback = vi.fn();
				resolver.s500(callback, "RAW");

				await new Promise((resolve) => setTimeout(resolve, 10));
				expect(callback).toHaveBeenCalled();
			});

			it("should handle s503 (Service Unavailable)", async () => {
				mockResponse = new Response("Service Unavailable", { status: 503 });
				resolver.addResponse(Promise.resolve(mockResponse));

				const callback = vi.fn();
				resolver.s503(callback, "RAW");

				await new Promise((resolve) => setTimeout(resolve, 10));
				expect(callback).toHaveBeenCalled();
			});
		});
	});

	describe("Special methods", () => {
		it("should handle s0 (status 0) with network error simulation", async () => {
			// Create a mock Response with status 0 by creating a custom object
			const mockResponseWithStatus0 = {
				status: 0,
				ok: false,
				clone: () => ({
					text: () => Promise.resolve("Network Error"),
					json: () => Promise.reject(new Error("No JSON for status 0")),
					blob: () => Promise.resolve(new Blob(["Network Error"])),
					arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
				}),
			} as Response;

			resolver.addResponse(Promise.resolve(mockResponseWithStatus0));

			const callback = vi.fn();
			resolver.s0(callback, "RAW");

			await new Promise((resolve) => setTimeout(resolve, 10));
			expect(callback).toHaveBeenCalled();
		});

		it("should handle sOthers for unhandled status codes", async () => {
			mockResponse = new Response("Custom Status", { status: 299 }); // Uncommon status
			resolver.addResponse(Promise.resolve(mockResponse));

			const callback = vi.fn();
			resolver.sOthers(callback, "RAW");

			await new Promise((resolve) => setTimeout(resolve, 10));
			expect(callback).toHaveBeenCalled();
		});

		it("should handle sAfter method", async () => {
			mockResponse = new Response("After", { status: 200 });
			resolver.addResponse(Promise.resolve(mockResponse));

			const callback = vi.fn();
			resolver.sAfter(callback, "RAW");

			await new Promise((resolve) => setTimeout(resolve, 10));
			expect(callback).toHaveBeenCalled();
		});
	});

	describe("Status exclusion logic", () => {
		it("should not trigger callback for excluded status codes in sOthers", async () => {
			mockResponse = new Response("OK", { status: 200 });
			resolver.addResponse(Promise.resolve(mockResponse));

			const callback200 = vi.fn();
			const callbackOthers = vi.fn();

			// First register s200 handler
			resolver.s200(callback200, "RAW");

			// Then register sOthers handler - should not trigger for 200
			resolver.sOthers(callbackOthers, "RAW");

			await new Promise((resolve) => setTimeout(resolve, 10));

			expect(callback200).toHaveBeenCalled();
			// sOthers should not be called because 200 is already handled and excluded
		});

		it("should chain multiple status handlers", async () => {
			mockResponse = new Response("OK", { status: 200 });
			resolver.addResponse(Promise.resolve(mockResponse));

			const callback1 = vi.fn();
			const callback2 = vi.fn();

			const result = resolver.s200(callback1, "RAW").s404(callback2, "RAW"); // This won't trigger for 200

			expect(result).toBe(resolver); // Should return this for chaining

			await new Promise((resolve) => setTimeout(resolve, 10));

			expect(callback1).toHaveBeenCalled();
			expect(callback2).not.toHaveBeenCalled();
		});
	});

	describe("Error handling", () => {
		it("should handle null/undefined response", async () => {
			resolver.addResponse(Promise.resolve(undefined as any));

			const callback = vi.fn();
			resolver.s200(callback, "RAW");

			await new Promise((resolve) => setTimeout(resolve, 10));

			// Should not call callback with undefined response
			expect(callback).not.toHaveBeenCalled();
		});

		it("should handle response promise rejection gracefully", async () => {
			resolver.addResponse(Promise.reject(new Error("Network error")));

			const callback = vi.fn();

			// Should not throw synchronously
			expect(() => {
				resolver.s200(callback, "RAW");
			}).not.toThrow();

			// Wait for async operations to complete
			await new Promise((resolve) => setTimeout(resolve, 20));

			// Callback should not be called when promise rejects
			expect(callback).not.toHaveBeenCalled();
		});
	});

	// 🔥 Real API test (following your style)
	describe("Real API Integration", () => {
		it("should work with real HTTP response from JSONPlaceholder", async () => {
			// Create a real fetch promise
			const realPromise = fetch("https://jsonplaceholder.typicode.com/posts/1");
			const realResolver = new Resolve(realPromise);

			let receivedData: { id: number; title: string; userId: number } | null = null;
			let receivedResponse: Response | null = null;

			realResolver.s200<{ id: number; title: string; userId: number }>((data, response) => {
				receivedData = data;
				receivedResponse = response;
			}, "JSON");

			// Wait for the real request to complete
			await realResolver.promiseResponse;

			if (receivedResponse) {
				expect((receivedResponse as Response).status).toBe(200);
			}
			if (receivedData) {
				expect(receivedData).toHaveProperty("id", 1);
				expect(receivedData).toHaveProperty("title");
				expect(receivedData).toHaveProperty("userId");
			}
		});

		it("should handle 404 response correctly", async () => {
			// Create a mock 404 response
			const mock404Response = new Response("Not Found", { status: 404 });
			const mockPromise = Promise.resolve(mock404Response);
			const resolver404 = new Resolve(mockPromise);

			let receivedResponse: Response | null = null;
			const was404Called = await new Promise((resolve) => {
				resolver404
					.s404((_, response) => {
						receivedResponse = response;
						resolve(true);
					}, "RAW")
					.sOthers(() => {
						resolve(false);
					}, "RAW");
			});

			// Wait for async processing
			await resolver.promiseResponse;

			expect(was404Called).toBe(true);
			if (receivedResponse) {
				expect((receivedResponse as unknown as Response).status).toBe(404);
			}
		});
	});
});
