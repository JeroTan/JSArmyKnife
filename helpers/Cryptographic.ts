import { createHmac, createCipheriv, createDecipheriv, randomBytes, subtle, createHash } from "crypto";

/*|---------------------------------------------------------*/
/*|                    Type Definition                     |*/
/*|---------------------------------------------------------*/

export type HASH_ALGORITHM = (
    "DSA"|"DSA-SHA"|"DSA-SHA1"|"DSA-SHA1-old"|

    "RSA-MD4"|"RSA-MD5"|"RSA-MDC2"|"RSA-RIPEMD160"|"RSA-SHA"|"RSA-SHA1"|"RSA-SHA1-2"|"RSA-SHA224"|"RSA-SHA256"|"RSA-SHA384"|"RSA-SHA512"|

    "dsaEncryption"|"dsaWithSHA"|"dsaWithSHA1"|"dss1"|

    "ecdsa-with-SHA1"|

    "md4"|"md4WithRSAEncryption"|"md5"|"md5WithRSAEncryption"|"mdc2"|"mdc2WithRSA"|

    "ripemd"|"ripemd160"|"ripemd160WithRSA"|"rmd160"|

    "sha"|"sha1"|"sha1WithRSAEncryption"|"sha224"|"sha224WithRSAEncryption"|"sha256"|"sha256WithRSAEncryption"|"sha384"|"sha384WithRSAEncryption"|"sha512"|"sha512WithRSAEncryption"|"shaWithRSAEncryption"|"ssl2-md5"|"ssl3-md5"|"ssl3-sha1"|

    "whirlpool"
)

export type CIPHER_ALGORITHM = (
    "CAST-cbc"|

    "aes-128-cbc"|"aes-128-cbc-hmac-sha1"|"aes-128-cfb"|"aes-128-cfb1"|"aes-128-cfb8"|"aes-128-ctr"|"aes-128-ecb"|"aes-128-gcm"|"aes-128-ofb"|"aes-128-xts"|"aes-192-cbc"|"aes-192-cfb"|"aes-192-cfb1"|"aes-192-cfb8"|"aes-192-ctr"|"aes-192-ecb"|"aes-192-gcm"|"aes-192-ofb"|"aes-256-cbc"|"aes-256-cbc-hmac-sha1"|"aes-256-cfb"|"aes-256-cfb1"|"aes-256-cfb8"|"aes-256-ctr"|"aes-256-ecb"|"aes-256-gcm"|"aes-256-ofb"|"aes-256-xts"|"aes128"|"aes192"|"aes256"|

    "bf"|"bf-cbc"|"bf-cfb"|"bf-ecb"|"bf-ofb"|"blowfish"|

    "camellia-128-cbc"|"camellia-128-cfb"|"camellia-128-cfb1"|"camellia-128-cfb8"|"camellia-128-ecb"|"camellia-128-ofb"|"camellia-192-cbc"|"camellia-192-cfb"|"camellia-192-cfb1"|"camellia-192-cfb8"|"camellia-192-ecb"|"camellia-192-ofb"|"camellia-256-cbc"|"camellia-256-cfb"|"camellia-256-cfb1"|"camellia-256-cfb8"|"camellia-256-ecb"|"camellia-256-ofb"|"camellia128"|"camellia192"|"camellia256"|"cast"|"cast-cbc"|"cast5-cbc"|"cast5-cfb"|"cast5-ecb"|"cast5-ofb"|

    "des"|"des-cbc"|"des-cfb"|"des-cfb1"|"des-cfb8"|"des-ecb"|"des-ede"|"des-ede-cbc"|"des-ede-cfb"|"des-ede-ofb"|"des-ede3"|"des-ede3-cbc"|"des-ede3-cfb"|"des-ede3-cfb1"|"des-ede3-cfb8"|"des-ede3-ofb"|"des-ofb"|"des3"|"desx"|"desx-cbc"|

    "id-aes128-GCM"|"id-aes192-GCM"|"id-aes256-GCM"|"idea"|"idea-cbc"|"idea-cfb"|"idea-ecb"|"idea-ofb"|

    "rc2"|"rc2-40-cbc"|"rc2-64-cbc"|"rc2-cbc"|"rc2-cfb"|"rc2-ecb"|"rc2-ofb"|"rc4"|"rc4-40"|"rc4-hmac-md5"|

    "seed"|"seed-cbc"|"seed-cfb"|"seed-ecb"|"seed-ofb"
);

export type DIGEST = (
    "base64"|"base64url"|"binary"|
    "hex"
)

class CryptTemplate{
    protected algorithm:string = "";
    protected key:string = "123456";//Please change or extends because this is not secure, just like using contraceptives made with tissue paper.
    protected data = "";
    protected encoding:DIGEST = "hex";

    constructor(key?:string|undefined, data?:string|undefined, algorithm?:string|undefined, encoding?:DIGEST|undefined){
        if(key)
            this.setKey(key);
        if(algorithm)
            this.setAlgorithm(algorithm);
        if(data)
            this.setData(data);
        if(encoding)
            this.setEncoding(encoding);
    }

    //--Setter--//
    public setKey(key:string){
        this.key = key;
        return this;
    }
    public setAlgorithm(algorithm:string){
        this.algorithm = algorithm;
        return this;
    }
    public setData(data:string){
        this.data = data;
        return this;
    }
    public setEncoding(encoding:DIGEST){
        this.encoding = encoding;
        return this;
    }
}



/*|---------------------------------------------------------*/
/*|               Public Class Starts Here                 |*/
/*|---------------------------------------------------------*/

export class Hash extends CryptTemplate{//One-way encryption, meaning once converted you can never convert it back again, unlike divorce where lovers can be unfaithful to each other.
    algorithm:HASH_ALGORITHM = "sha256"; 

    constructor(key?:string|undefined, data?:string|undefined, algorithm?:HASH_ALGORITHM|undefined, encoding?:DIGEST|undefined){
        super(key, data, algorithm, encoding)
    }

    //--Setter--//
    public setAlgorithm(algorithm:HASH_ALGORITHM){
        this.algorithm = algorithm;
        return this;
    }
    //--Setter--//

    public generate(newData?:string|undefined){
        return createHmac(this.algorithm, this.key).update(newData !== undefined ? newData : this.data).digest(this.encoding);
    }
    public compareTo(otherData:string){
        return this.generate() === this.generate(otherData);
    }
}

export class HashWebCrypto extends CryptTemplate{
    algorithm:"SHA-1"|"SHA-256"|"SHA-384"|"SHA-512" = "SHA-256";

    constructor(key?:string|undefined, data?:string|undefined, algorithm?:"SHA-1"|"SHA-256"|"SHA-384"|"SHA-512"|undefined, encoding?:DIGEST|undefined){
        super(key, data, algorithm, encoding);
    }

    //--Setter--//
    public setAlgorithm(algorithm:"SHA-1"|"SHA-256"|"SHA-384"|"SHA-512"){
        this.algorithm = algorithm;
        return this;
    }
    //--Setter--//
    
    public async generate(newData?:string|undefined){
        const streamData = (new TextEncoder()).encode(newData !== undefined ? newData : this.data);
        const rawHash = await subtle.digest(this.algorithm, streamData);

        const hashArray = Array.from(new Uint8Array(rawHash)); // convert buffer to byte array
        return hashArray.map((b) => b.toString(16).padStart(2, "0")).join(""); // convert bytes to hex string
    }
    public async compareTo(otherData:string){
        return await this.generate() === await this.generate(otherData);
    }
}

class SymmetricCrypt extends CryptTemplate{//Unlike hash, if you encrypt something you can still turn it back as long as you have key. Just like no matter what sin we have, we can always come to God.
    algorithm:CIPHER_ALGORITHM = "aes-128-cbc"; 
    iv:Buffer|string = Buffer.from(randomBytes(16));

    constructor(key?:string|undefined, data?:string|undefined, iv?:Buffer|string|undefined, algorithm?:CIPHER_ALGORITHM|undefined, encoding?:DIGEST|undefined){
        super(key, data, algorithm, encoding);
        if(iv)
            this.setIV(iv);
        else 
            this.iv == this.key;
    }

    //--Setter--//
    public setAlgorithm(algorithm:CIPHER_ALGORITHM){
        this.algorithm = algorithm;
        return this;
    }
    public setIV(iv:Buffer|string){
        this.iv = iv;
        return this;
    }

    //--Setter--//
    //--In House--//
    protected improviseKey(newKey?:string|undefined){
        let improviseKey:any = createHash("sha256");
        improviseKey.update(newKey !== undefined ? newKey : this.key);
        return improviseKey.digest("hex").slice(0,16);
    }
    //--In House--//

    encrypt(newData?:string|undefined){
        const IV = typeof this.iv === "string" ? this.improviseKey(this.iv) : this.iv;
        const cipherType = createCipheriv( this.algorithm, this.improviseKey(), IV );
        const shambles = cipherType.update(newData !== undefined ? newData : this.data, "utf8", this.encoding);
        const encoder = cipherType.final(this.encoding);
        return shambles + encoder;
    }
    decrypt(newData?:string|undefined){
        const IV = typeof this.iv === "string" ? this.improviseKey(this.iv) : this.iv;
        const decipherType = createDecipheriv( this.algorithm, this.improviseKey(), IV );
        let text = decipherType.update(newData !== undefined ? newData : this.data, this.encoding, "utf8");
        let encoder = decipherType.final("utf-8");
        return text + encoder;
    }


}

class AsymmetricCrypt{
    //To Be Continue
}


