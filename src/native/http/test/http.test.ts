import { describe, it, expect, beforeEach, vi } from "vitest";
import { HttpNativePlate } from "../http";

describe("HttpNativePlate class", () => {
  let http: HttpNativePlate;

  beforeEach(() => {
    http = new HttpNativePlate();
  });

  it("should create an instance of HttpNativePlate", () => {
    expect(http).toBeInstanceOf(HttpNativePlate);
  });

  it("should set base URL", () => {
    http.setBaseURL("https://pokeapi.co/api/v2");
    expect(http["baseURL"]).toBe("https://pokeapi.co/api/v2");
  });

  it("should initialize headers via constructor", () => {
    const client = new HttpNativePlate("https://pokeapi.co/api/v2", {
      "Content-Type": "application/json",
    });
    expect(client["Config"].headers).toEqual({
      "Content-Type": "application/json",
    });
  });

  it("should set headers directly", () => {
    http.headers({ Authorization: "Bearer 123" });
    expect(http["Config"].headers).toEqual({ Authorization: "Bearer 123" });
  });

  it("should merge headers when update = true", () => {
    http.headers({ "Content-Type": "application/json" });
    http.headers({ Authorization: "Bearer 123" }, true);
    expect(http["Config"].headers).toEqual({
      "Content-Type": "application/json",
      Authorization: "Bearer 123",
    });
  });

  it("should set request body", () => {
    http.data(JSON.stringify({ name: "pikachu" }));
    expect(http["Config"].body).toBe(JSON.stringify({ name: "pikachu" }));
  });

  it("should set a form data body", () => {
    const formData = new FormData();
    formData.append("file", new Blob(["file-content"], { type: "text/plain" }), "test.txt");
    http.data(formData);
    expect(http["Config"].body).toBe(formData);
  });

  it("should set request path", () => {
    http.path("/pokemon/ditto");
    expect(http["pathURL"]).toBe("/pokemon/ditto");
  });

  it("should set query params", () => {
    http.params({ limit: "5", offset: "10" });
    expect(http["paramObject"]).toEqual({ limit: "5", offset: "10" });
  });

  it("should merge query params when update = true", () => {
    http.params({ limit: "5" });
    http.params({ offset: "10" }, true);
    expect(http["paramObject"]).toEqual({ limit: "5", offset: "10" });
  });

  it("should set request method", () => {
    http.method("POST");
    expect(http["Config"].method).toBe("POST");
  });

  it("should use shorthand GET method", () => {
    http.get();
    expect(http["Config"].method).toBe("GET");
  });

  it("should use shorthand POST method", () => {
    http.post();
    expect(http["Config"].method).toBe("POST");
  });

  it("should use shorthand PUT method", () => {
    http.put();
    expect(http["Config"].method).toBe("PUT");
  });

  it("should use shorthand PATCH method", () => {
    http.patch();
    expect(http["Config"].method).toBe("PATCH");
  });

  it("should use shorthand DELETE method", () => {
    http.delete();
    expect(http["Config"].method).toBe("DELETE");
  });

  it("should create a new signal", () => {
    const oldAbortion = http.getAbortion();
    http.newAbortion();
    const newAbortion = http.getAbortion();
    expect(newAbortion).not.toBe(oldAbortion);
  });

  it("should reset body and signal", () => {
    http.data("test-body");
    const oldAbortion = http.getAbortion();
    http.reset();
    expect(http["Config"].body).toBeUndefined();
    expect(http.getAbortion()).not.toBe(oldAbortion);
  });

  it("should abort an ongoing request", () => {
    const abortion = http.getAbortion();
    http.stopFetching();
    expect(abortion.signal.aborted).toBe(true);
  });

  //
  // 🔥 Real API requests to PokeAPI
  //
  it("should fetch Ditto data from PokeAPI", async () => {
    const res = await http
      .setBaseURL("https://pokeapi.co/api/v2")
      .path("/pokemon/ditto")
      .get()
      .request();

    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.name).toBe("ditto");
    expect(data).toHaveProperty("abilities");
  });

  it("should fetch a limited list of Pokémon with params", async () => {
    const res = await http
      .setBaseURL("https://pokeapi.co/api/v2")
      .path("/pokemon")
      .params({ limit: "3" })
      .get()
      .request();

    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.results.length).toBe(3);
    expect(data.results[0]).toHaveProperty("name");
  });
});
