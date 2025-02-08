/**
 * @description - Open a link in a new tab.
 */
export declare function openLink(link: string): void;
/**
 * @description - same with openLink but return a function that sends a link. Usually use in html element.
 */
export declare function openLinkHigh(link: string): () => void;
