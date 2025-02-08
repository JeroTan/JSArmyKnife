/**
 * I WOULD LIKE TO THANK THIS GUY FOR CREATING A MAGNIFICENT "FREE" QR ALGORITHM
 * https://github.com/kazuhikoarase
 *
 * His other works:
 * https://kazuhikoarase.github.io/;
 */
/**
 * @class QRCode
 * @constructor
 * @example
 * new QRCode(document.getElementById("test"), "http://jindo.dev.naver.com/collie");
 *
 * @example
 * var oQRCode = new QRCode("test", {
 *    text : "http://naver.com",
 *    width : 128,
 *    height : 128
 * });
 *
 * oQRCode.clear(); // Clear the QRCode.
 * oQRCode.makeCode("http://map.naver.com"); // Re-create the QRCode.
 *
 * @param {HTMLElement|String} el target element or 'id' attribute of element.
 * @param {Object|String} vOption
 * @param {String} vOption.text QRCode link data
 * @param {Number} [vOption.width=256]
 * @param {Number} [vOption.height=256]
 * @param {String} [vOption.colorDark="#000000"]
 * @param {String} [vOption.colorLight="#ffffff"]
 * @param {QRCode.CorrectLevel} [vOption.correctLevel=QRCode.CorrectLevel.H] [L|M|Q|H]
 */
declare let QRCode: (el: HTMLElement | string, vOption: object | string) => void;
/**
 * @info Accepts element then size (in px)
 */
export declare class QR extends QRCode {
    constructor(element: HTMLElement | Node, option?: {
        size?: number;
        darkColor?: string;
        lightColor?: string;
        svg?: boolean;
    });
    generate(text: string, Failed?: Function): this;
}
export {};
