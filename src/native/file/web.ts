export function convertFileToBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.result == null) {
				throw new Error("Invalid File");
			}
			//If array buffer convert it string
			if (reader.result instanceof ArrayBuffer) {
				const arr = new Uint8Array(reader.result);
				const str = String.fromCharCode(...arr);
				resolve(str);
			}
			resolve(reader.result as string);
		};
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
}

export function convertBase64ToFile(base64: string, filename = "untitled"): File {
	const arr = base64.split(",");
	const mime = arr[0].match(/:(.*?);/);
	if (mime == null || mime[1] == undefined) {
		throw new Error("Invalid base64 string");
	}

	const bstr = atob(arr[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], filename, { type: mime[1] });
}

export function getFileLink(fileInput: HTMLInputElement, fileIndex = 0) {
	if (!fileInput.files) {
		return null;
	}
	let blobURL = URL.createObjectURL(fileInput.files[fileIndex]);
	return blobURL;
}
