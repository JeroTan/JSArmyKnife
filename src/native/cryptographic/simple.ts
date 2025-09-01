// import { createHmac, createCipheriv, createDecipheriv, randomBytes, subtle, createHash } from "crypto";
// import { createHmac, subtle } from "crypto";

/*|---------------------------------------------------------*/
/*|                    Type Definition                     |*/
/*|---------------------------------------------------------*/

// export type HASH_ALGORITHM = (
//     "DSA"|"DSA-SHA"|"DSA-SHA1"|"DSA-SHA1-old"|

//     "RSA-MD4"|"RSA-MD5"|"RSA-MDC2"|"RSA-RIPEMD160"|"RSA-SHA"|"RSA-SHA1"|"RSA-SHA1-2"|"RSA-SHA224"|"RSA-SHA256"|"RSA-SHA384"|"RSA-SHA512"|

//     "dsaEncryption"|"dsaWithSHA"|"dsaWithSHA1"|"dss1"|

//     "ecdsa-with-SHA1"|

//     "md4"|"md4WithRSAEncryption"|"md5"|"md5WithRSAEncryption"|"mdc2"|"mdc2WithRSA"|

//     "ripemd"|"ripemd160"|"ripemd160WithRSA"|"rmd160"|

//     "sha"|"sha1"|"sha1WithRSAEncryption"|"sha224"|"sha224WithRSAEncryption"|"sha256"|"sha256WithRSAEncryption"|"sha384"|"sha384WithRSAEncryption"|"sha512"|"sha512WithRSAEncryption"|"shaWithRSAEncryption"|"ssl2-md5"|"ssl3-md5"|"ssl3-sha1"|

//     "whirlpool"
// )

// export type CIPHER_ALGORITHM = (
//     "CAST-cbc"|

//     "aes-128-cbc"|"aes-128-cbc-hmac-sha1"|"aes-128-cfb"|"aes-128-cfb1"|"aes-128-cfb8"|"aes-128-ctr"|"aes-128-ecb"|"aes-128-gcm"|"aes-128-ofb"|"aes-128-xts"|"aes-192-cbc"|"aes-192-cfb"|"aes-192-cfb1"|"aes-192-cfb8"|"aes-192-ctr"|"aes-192-ecb"|"aes-192-gcm"|"aes-192-ofb"|"aes-256-cbc"|"aes-256-cbc-hmac-sha1"|"aes-256-cfb"|"aes-256-cfb1"|"aes-256-cfb8"|"aes-256-ctr"|"aes-256-ecb"|"aes-256-gcm"|"aes-256-ofb"|"aes-256-xts"|"aes128"|"aes192"|"aes256"|

//     "bf"|"bf-cbc"|"bf-cfb"|"bf-ecb"|"bf-ofb"|"blowfish"|

//     "camellia-128-cbc"|"camellia-128-cfb"|"camellia-128-cfb1"|"camellia-128-cfb8"|"camellia-128-ecb"|"camellia-128-ofb"|"camellia-192-cbc"|"camellia-192-cfb"|"camellia-192-cfb1"|"camellia-192-cfb8"|"camellia-192-ecb"|"camellia-192-ofb"|"camellia-256-cbc"|"camellia-256-cfb"|"camellia-256-cfb1"|"camellia-256-cfb8"|"camellia-256-ecb"|"camellia-256-ofb"|"camellia128"|"camellia192"|"camellia256"|"cast"|"cast-cbc"|"cast5-cbc"|"cast5-cfb"|"cast5-ecb"|"cast5-ofb"|

//     "des"|"des-cbc"|"des-cfb"|"des-cfb1"|"des-cfb8"|"des-ecb"|"des-ede"|"des-ede-cbc"|"des-ede-cfb"|"des-ede-ofb"|"des-ede3"|"des-ede3-cbc"|"des-ede3-cfb"|"des-ede3-cfb1"|"des-ede3-cfb8"|"des-ede3-ofb"|"des-ofb"|"des3"|"desx"|"desx-cbc"|

//     "id-aes128-GCM"|"id-aes192-GCM"|"id-aes256-GCM"|"idea"|"idea-cbc"|"idea-cfb"|"idea-ecb"|"idea-ofb"|

//     "rc2"|"rc2-40-cbc"|"rc2-64-cbc"|"rc2-cbc"|"rc2-cfb"|"rc2-ecb"|"rc2-ofb"|"rc4"|"rc4-40"|"rc4-hmac-md5"|

//     "seed"|"seed-cbc"|"seed-cfb"|"seed-ecb"|"seed-ofb"
// );

// export type DIGEST = (
//     "base64"|"base64url"|"binary"|
//     "hex"
// )

// class CryptTemplate{
//     protected algorithm:string = "";
//     protected key:string = import.meta?.env?.SECRET_APP_KEY || "419and68";//Please change or extends because this is not secure, just like using contraceptives made with tissue paper.
//     protected data = "";
//     protected encoding:DIGEST = "hex";

//     constructor(key?:string|undefined, data?:string|undefined, algorithm?:string|undefined, encoding?:DIGEST|undefined){
//         if(key)
//             this.setKey(key);
//         if(algorithm)
//             this.setAlgorithm(algorithm);
//         if(data)
//             this.setData(data);
//         if(encoding)
//             this.setEncoding(encoding);
//     }

//     //--Setter--//
//     public setKey(key:string){
//         this.key = key;
//         return this;
//     }
//     public setAlgorithm(algorithm:string){
//         this.algorithm = algorithm;
//         return this;
//     }
//     public setData(data:string){
//         this.data = data;
//         return this;
//     }
//     public setEncoding(encoding:DIGEST){
//         this.encoding = encoding;
//         return this;
//     }
// }



/*|------------------------------------------------------------------------------------------|*/
/*|               Public Class Starts Here                                                   |*/
/*|------------------------------------------------------------------------------------------|*/

// export class Hash extends CryptTemplate{//One-way encryption, meaning once converted you can never convert it back again, unlike divorce where lovers can be unfaithful to each other.
//     algorithm:HASH_ALGORITHM = "sha256"; 

//     constructor(key?:string|undefined, data?:string|undefined, algorithm?:HASH_ALGORITHM|undefined, encoding?:DIGEST|undefined){
//         super(key, data, algorithm, encoding)
//     }

//     //--Setter--//
//     public setAlgorithm(algorithm:HASH_ALGORITHM){
//         this.algorithm = algorithm;
//         return this;
//     }
//     //--Setter--//

//     public generate(newData?:string|undefined){
//         return createHmac(this.algorithm, this.key).update(newData !== undefined ? newData : this.data).digest(this.encoding);
//     }
//     public compareTo(otherData:string){
//         return this.generate() === this.generate(otherData);
//     }
// }

// export class HashWebCrypto extends CryptTemplate{
//     algorithm:"SHA-1"|"SHA-256"|"SHA-384"|"SHA-512" = "SHA-256";

//     constructor(key?:string|undefined, data?:string|undefined, algorithm?:"SHA-1"|"SHA-256"|"SHA-384"|"SHA-512"|undefined, encoding?:DIGEST|undefined){
//         super(key, data, algorithm, encoding);
//     }

//     //--Setter--//
//     public setAlgorithm(algorithm:"SHA-1"|"SHA-256"|"SHA-384"|"SHA-512"){
//         this.algorithm = algorithm;
//         return this;
//     }
//     //--Setter--//
	
//     public async generate(newData?:string|undefined){
//         const streamData = (new TextEncoder()).encode(newData !== undefined ? newData : this.data);
//         const rawHash = await subtle.digest(this.algorithm, streamData);

//         const hashArray = Array.from(new Uint8Array(rawHash)); // convert buffer to byte array
//         return hashArray.map((b) => b.toString(16).padStart(2, "0")).join(""); // convert bytes to hex string
//     }
//     public async compareTo(otherData:string){
//         return await this.generate() === await this.generate(otherData);
//     }
// }

// class SymmetricCrypt extends CryptTemplate{//Unlike hash, if you encrypt something you can still turn it back as long as you have key. Just like no matter what sin we have, we can always come to God.
//     algorithm:CIPHER_ALGORITHM = "aes-128-cbc"; 
//     iv:Buffer|string = Buffer.from(randomBytes(16));

//     constructor(key?:string|undefined, data?:string|undefined, iv?:Buffer|string|undefined, algorithm?:CIPHER_ALGORITHM|undefined, encoding?:DIGEST|undefined){
//         super(key, data, algorithm, encoding);
//         if(iv)
//             this.setIV(iv);
//         else 
//             this.iv == this.key;
//     }

//     //--Setter--//
//     public setAlgorithm(algorithm:CIPHER_ALGORITHM){
//         this.algorithm = algorithm;
//         return this;
//     }
//     public setIV(iv:Buffer|string){
//         this.iv = iv;
//         return this;
//     }

//     //--Setter--//
//     //--In House--//
//     protected improviseKey(newKey?:string|undefined){
//         let improviseKey:any = createHash("sha256");
//         improviseKey.update(newKey !== undefined ? newKey : this.key);
//         return improviseKey.digest("hex").slice(0,16);
//     }
//     //--In House--//

//     encrypt(newData?:string|undefined){
//         const IV = typeof this.iv === "string" ? this.improviseKey(this.iv) : this.iv;
//         const cipherType = createCipheriv( this.algorithm, this.improviseKey(), IV );
//         const shambles = cipherType.update(newData !== undefined ? newData : this.data, "utf8", this.encoding);
//         const encoder = cipherType.final(this.encoding);
//         return shambles + encoder;
//     }
//     decrypt(newData?:string|undefined){
//         const IV = typeof this.iv === "string" ? this.improviseKey(this.iv) : this.iv;
//         const decipherType = createDecipheriv( this.algorithm, this.improviseKey(), IV );
//         let text = decipherType.update(newData !== undefined ? newData : this.data, this.encoding, "utf8");
//         let encoder = decipherType.final("utf-8");
//         return text + encoder;
//     }


// }

// class AsymmetricCrypt{
//     //To Be Continue
// }


/*|------------------------------------------------------------------------------------------|*/
/*|               Classic Encryption                                                         |*/
/*|------------------------------------------------------------------------------------------|*/

export class Vigenere{
	private data = "";
	private key = "419and68"

	constructor(key?:string|undefined, data?:string|undefined){
		if(key)
			this.setkey(key);

		if(data)
			this.setData(data);
	}

	//--Set--//
	public setData(data:string){
		this.data = data;
		return this;
	}
	public setkey(key:string){
		this.key = key;
		return this;
	}
	//--Set--//

	encrypt(){
		let result = ''
		const preCryptData = btoa(this.data);
		for (let i = 0, j = 0; i < preCryptData.length; i++) {
			const c = preCryptData.charAt(i)
			result += String.fromCharCode((c.charCodeAt(0) + this.key.charCodeAt(j) )%65535 );
			j = ++j % this.key.length
		}
		return btoa(result)
	}
	
	decrypt(){
		let result = '';
		try{
			const preDecryptData = atob(this.data);
			for (let i = 0, j = 0; i < preDecryptData.length; i++) {
				const c = preDecryptData.charAt(i)
				result += String.fromCharCode((65535 + c.charCodeAt(0) - this.key.charCodeAt(j) )%65535 );
				j = ++j % this.key.length
			}
			return atob(result)
		}catch{
			return "";
		}
		
	}
}


//NOT MINE
//SEE HERE: https://stackoverflow.com/questions/59777670/how-can-i-hash-a-string-with-sha256
//@ts-ignore
export function pureHash(message:string) {
	var sha256 = function sha256(ascii:string) {
		function rightRotate(value:any, amount:any) {
			return (value>>>amount) | (value<<(32 - amount));
		};
		
		var mathPow = Math.pow;
		var maxWord = mathPow(2, 32);
		var lengthProperty = 'length'
		var i, j; // Used as a counter across the whole file
		var result = ''
	
		var words:any = [];
		var asciiBitLength = ascii[lengthProperty as any] as any*8;
		
		//* caching results is optional - remove/add slash from front of this line to toggle
		// Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
		// (we actually calculate the first 64, but extra values are just ignored)
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		var hash = sha256.h = sha256.h || [];
		// Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		var k = sha256.k = sha256.k || [];
		var primeCounter = k[lengthProperty];
		/*/
		var hash = [], k = [];
		var primeCounter = 0;
		//*/
	
		var isComposite:any = {};
		for (var candidate = 2; primeCounter < 64; candidate++) {
			if (!isComposite[candidate as any] as any) {
				for (i = 0; i < 313; i += candidate) {
					isComposite[i] = candidate;
				}
				hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
				k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
			}
		}
		
		ascii += '\x80' // Append Ƈ' bit (plus zero padding)
		while (ascii[lengthProperty as any]as any%64 - 56) ascii += '\x00' // More zero padding
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		for (i = 0; i < ascii[lengthProperty as any]as unknown; i++) {
			j = ascii.charCodeAt(i);
			if (j>>8) return; // ASCII check: only accept characters in range 0-255
			words[i>>2] |= j << ((3 - i)%4)*8;
		}
		words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
		words[words[lengthProperty]] = (asciiBitLength)
		
		// process each chunk
		for (j = 0; j < words[lengthProperty];) {
			var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
			var oldHash = hash;
			// This is now the undefinedworking hash", often labelled as variables a...g
			// (we have to truncate as well, otherwise extra entries at the end accumulate
			hash = hash.slice(0, 8);
			
			for (i = 0; i < 64; i++) {
				// var i2 = i + j;
				// Expand the message into 64 words
				// Used below if 
				var w15 = w[i - 15], w2 = w[i - 2];
	
				// Iterate
				var a = hash[0], e = hash[4];
				var temp1 = hash[7]
					+ (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
					+ ((e&hash[5])^((~e)&hash[6])) // ch
					+ k[i]
					// Expand the message schedule if needed
					+ (w[i] = (i < 16) ? w[i] : (
							w[i - 16]
							+ (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) // s0
							+ w[i - 7]
							+ (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)) // s1
						)|0
					);
				// This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
				var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
					+ ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2])); // maj
				
				hash = [(temp1 + temp2)|0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
				hash[4] = (hash[4] + temp1)|0;
			}
			
			for (i = 0; i < 8; i++) {
				hash[i] = (hash[i] + oldHash[i])|0;
			}
		}
		
		for (i = 0; i < 8; i++) {
			for (j = 3; j + 1; j--) {
				var b = (hash[i]>>(j*8))&255;
				result += ((b < 16) ? 0 : '') + b.toString(16);
			}
		}
		return result;
	};

	return sha256(message);
};

export function btoaEx(anyStringPoint:string){
	const binString = Array.from(new TextEncoder().encode(anyStringPoint), (byte:number) =>
    String.fromCodePoint(byte),
  ).join("");
  return btoa(binString);
}

export function atobEx(encrypted:string){
	const binString = atob(encrypted);
  return new TextDecoder().decode(Uint8Array.from<string>(binString, (m) => m.codePointAt(0) || 0));
}


export function xorEnrypt(data: string, key: string): string {
  const dataBytes = new TextEncoder().encode(data);
  const keyBytes = new TextEncoder().encode(key);

  const encrypted = dataBytes.map((byte, i) => byte ^ keyBytes[i % keyBytes.length]);

  return btoa(String.fromCharCode(...encrypted));
}

export function xorDecrypt(encrypted: string, key: string): string {
  const encryptedBytes = Uint8Array.from(atob(encrypted), char => char.charCodeAt(0));
  const keyBytes = new TextEncoder().encode(key);

  const decrypted = encryptedBytes.map((byte, i) => byte ^ keyBytes[i % keyBytes.length]);

  return new TextDecoder().decode(decrypted);
}

export class NumberCrypt {
	private key: number;

	constructor(key: number) {
		this.key = key;
	}

	encrypt(number: number): number {
		return number ^ this.key; // XOR encryption
	}
	decrypt(encryptedNumber: number): number {
		return encryptedNumber ^ this.key; // XOR decryption
	}
}


export function numberEncode(number: number){
	const numberCrypt = new NumberCrypt(123);
	return numberCrypt.encrypt(number);
}

export function numberDecode(encoded: number){
	const numberCrypt = new NumberCrypt(123);
	return numberCrypt.decrypt(encoded);
}