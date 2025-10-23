import { AnimeTroupe } from "@jsarmyknife/native--animation";
import { swapClass } from "@jsarmyknife/native--dom";

interface POP_OVER_DATA {
	element?: HTMLElement;
	message: string;
	title: string;
	position?: "top" | "right" | "bottom" | "left";
}

interface SCREENPOP_CONFIG {
	darken?: boolean;
	animate?: boolean;
	highlightElements: HTMLElement[];
	popOver: Array<POP_OVER_DATA>;
	trigger?: (THIS: ScreenPop) => void;
}

const config: SCREENPOP_CONFIG = {
	darken: false,
	animate: false,
	highlightElements: [],
	popOver: [],
};

/**
 * @info This is intended for client-side only
 */
export class ScreenPop {
	private canvas = document.createElement("aside");
	private canvasName = "screen-canvas-pop";
	private canvasConfig = structuredClone(config);
	private canvasBreakPoint: { [key: number]: SCREENPOP_CONFIG } = {};
	private isAlreadyClose = false;

	constructor() {
		this.canvas.setAttribute("id", this.canvasName);
	}

	//-- In House --//
	protected resetCanvas() {
		if (document.getElementById(this.canvasName) != null) {
			document.getElementById(this.canvasName)?.remove();
		}
		this.canvas = document.createElement("aside");
		this.canvas.setAttribute("id", this.canvasName);
		this.canvas.style.width = "100%";
		this.canvas.style.height = "100%";
		this.canvas.style.position = "fixed";
		this.canvas.style.zIndex = "101";
		document.body.prepend(this.canvas);

		return this;
	}
	//-- In House --//

	public darken() {
		this.canvasConfig.darken = true;
		return this;
	}
	public highlightElements(elements: HTMLElement | HTMLElement[]) {
		if (Array.isArray(elements)) {
			elements.forEach((x) => {
				this.canvasConfig.highlightElements.push(x);
			});
			return this;
		}
		this.canvasConfig.highlightElements.push(elements);
		return this;
	}
	public popOver(details: POP_OVER_DATA | POP_OVER_DATA[]) {
		if (Array.isArray(details)) {
			details.forEach((x) => {
				this.canvasConfig.popOver.push(x);
			});
			return this;
		}
		this.canvasConfig.popOver.push(details);
		return this;
	}
	public animate() {
		this.canvasConfig.animate = true;
		return this;
	}
	public trigger(callback: (THIS: ScreenPop) => void) {
		this.canvasConfig.trigger = callback;
		return this;
	}
	public breakPoint(whenToDown: { [key: number]: Partial<SCREENPOP_CONFIG> }) {
		//Pixel Size
		const THIS = this;
		(Object.keys(whenToDown) as unknown as Array<number>).forEach((key) => {
			const breakPointCache = {} as Partial<SCREENPOP_CONFIG>;
			(Object.keys(THIS.canvasConfig) as Array<keyof SCREENPOP_CONFIG>).forEach((key2) => {
				breakPointCache[key2] = THIS.canvasConfig[key2] as any;
			});

			(Object.keys(whenToDown[key]) as Array<keyof SCREENPOP_CONFIG>).forEach((key2) => {
				breakPointCache[key2] = whenToDown[key][key2] as any;
			});
			THIS.canvasBreakPoint[key] = breakPointCache as unknown as SCREENPOP_CONFIG;
		});
		return THIS;
	}

	public run() {
		function applyConfig(canvasConfig: SCREENPOP_CONFIG, canvas: HTMLElement) {
			if (canvasConfig.darken) {
				const darkColor = `rgba(0,0,0,0.4)`;
				if (canvasConfig.animate) {
					setTimeout(() => {
						const animateThis = new AnimeTroupe(
							canvas,
							[{ backgroundColor: `transparent` }, { backgroundColor: darkColor }],
							{
								duration: 500,
								easing: "easeOutQuad",
							},
						);
						animateThis.play();
						animateThis.isStop(() => {
							canvas.style.backgroundColor = darkColor;
						});
					}, 1);
				} else {
					canvas.style.backgroundColor = darkColor;
				}
			}
			if (canvasConfig.highlightElements.length) {
				const clipPoint = {
					head: [
						["0%", "0%"],
						["0%", "100%"],
					] as Array<Array<string>>,
					body: [] as Array<Array<string>>,
					tail: [
						["100%", "100%"],
						["100%", "0%"],
					] as Array<Array<string>>,
				};
				canvasConfig.highlightElements.forEach((element) => {
					//Start
					clipPoint.body.push([`${element.getBoundingClientRect().left}px`, "100%"]);

					//Body
					clipPoint.body.push([
						`${element.getBoundingClientRect().left}px`,
						`${element.getBoundingClientRect().top}px`,
					]);
					clipPoint.body.push([
						`${element.getBoundingClientRect().left + element.offsetWidth}px`,
						`${element.getBoundingClientRect().top}px`,
					]);
					clipPoint.body.push([
						`${element.getBoundingClientRect().left + element.offsetWidth}px`,
						`${element.offsetHeight + element.getBoundingClientRect().top}px`,
					]);
					clipPoint.body.push([
						`${element.getBoundingClientRect().left}px`,
						`${element.offsetHeight + element.getBoundingClientRect().top}px`,
					]);

					//End
					clipPoint.body.push([`${element.getBoundingClientRect().left}px`, "100%"]);
				});

				//Combine
				const clipPath: string = `polygon(${(() => {
					const headString = clipPoint.head.map((p) => p.join(" ")).join(",");
					const bodyString = clipPoint.body.map((p) => p.join(" ")).join(",");
					const tailString = clipPoint.tail.map((p) => p.join(" ")).join(",");
					return headString + ", " + bodyString + ", " + tailString;
				})()})`;
				canvas.style.clipPath = clipPath;
			}
			if (canvasConfig.popOver && canvasConfig.popOver.length) {
				canvasConfig.popOver.forEach((pop, i) => {
					const { element, message, title, position } = pop;
					let referenceElement: HTMLElement;
					if (!element) {
						if (!canvasConfig.highlightElements[i]) {
							return;
						}
						referenceElement = canvasConfig.highlightElements[i];
					} else {
						referenceElement = element;
					}
					const popOverContainer = document.createElement("div");
					const titleElement = document.createElement("div");
					const messageElement = document.createElement("div");
					const pointerElement = document.createElement("div");
					const miniAnimation = document.createElement("div");

					swapClass({
						id: popOverContainer,
						mk: "bg-base-200 rounded px-3 py-2 relative",
					});
					const minWidth =
						referenceElement.offsetWidth < 200
							? 200
							: referenceElement.offsetWidth < 400
								? referenceElement.offsetWidth
								: 400;
					const maxWidth = referenceElement.offsetWidth > 400 ? 400 : referenceElement.offsetWidth;
					const actualWidth = minWidth;
					popOverContainer.style.minWidth = `${minWidth}px`;
					popOverContainer.style.maxWidth = `${maxWidth}px`;

					titleElement.style.textAlign = "center";
					titleElement.classList.add("text-xl");
					titleElement.classList.add("font-normal");
					titleElement.textContent = title;

					messageElement.classList.add("w-full");
					messageElement.textContent = message;

					pointerElement.classList.add("w-5");
					pointerElement.classList.add("bg-base-200");
					pointerElement.style.zIndex = "1";
					pointerElement.style.position = "absolute";

					swapClass({
						id: miniAnimation,
						mk: " animate-pulse flex justify-center mt-1",
					});
					const animationContainer = document.createElement("div");
					swapClass({
						id: animationContainer,
						mk: "relative w-full animate-bounce",
					});
					const textMessageForAnimation = document.createElement("div");
					textMessageForAnimation.textContent = "click to continue";
					swapClass({
						id: textMessageForAnimation,
						mk: "text-xs w-full text-center",
					});
					animationContainer.appendChild(textMessageForAnimation);
					miniAnimation.appendChild(animationContainer);

					switch (position) {
						case "top":
							//pivot
							popOverContainer.style.bottom = `${referenceElement.getBoundingClientRect().bottom - 25 + referenceElement.offsetHeight}px`;

							//arterial
							popOverContainer.style.left = `${referenceElement.getBoundingClientRect().left + referenceElement.offsetWidth * 0.5}px`;

							//Center
							popOverContainer.style.transform = `translate(-50%, 0%)`;

							//Pointer
							pointerElement.style.aspectRatio = "1/cos(30deg)";
							pointerElement.style.clipPath = "polygon(50% 100%,100% 0,0 0)";
							pointerElement.style.left = `${actualWidth * 0.5}px`;
							pointerElement.style.transform = `translate(-50%, 0%)`;
							pointerElement.style.bottom = "-10px";

							break;
						case "right":
							//pivot
							popOverContainer.style.left = `${referenceElement.getBoundingClientRect().left + referenceElement.offsetWidth + 20}px`;

							//arterial
							popOverContainer.style.top = `${referenceElement.getBoundingClientRect().top + referenceElement.offsetHeight * 0.5}px`;

							//Center
							popOverContainer.style.transform = `translate(0%, -50%)`;

							//Pointer
							pointerElement.style.aspectRatio = "cos(30deg)";
							pointerElement.style.clipPath = "polygon(100% 0,0 50%,100% 100%)";
							pointerElement.style.top = `50%`;
							pointerElement.style.transform = `translate(0%, -50%)`;
							pointerElement.style.left = "-10px";
							break;
						case "bottom":
							//pivot
							popOverContainer.style.top = `${referenceElement.getBoundingClientRect().top + referenceElement.offsetHeight + 20}px`;

							//arterial
							popOverContainer.style.left = `${referenceElement.getBoundingClientRect().left + referenceElement.offsetWidth * 0.5}px`;

							//Center
							popOverContainer.style.transform = `translate(-50%, 0%)`;

							//Pointer
							pointerElement.style.aspectRatio = "1/cos(30deg)";
							pointerElement.style.clipPath = " polygon(50% 0,100% 100%,0 100%)";
							pointerElement.style.left = `${actualWidth * 0.5}px`;
							pointerElement.style.transform = `translate(-50%, 0%)`;
							pointerElement.style.top = "-10px";

							break;
						case "left":
							//pivot
							popOverContainer.style.left = `${referenceElement.getBoundingClientRect().left - actualWidth - 20}px`;

							//arterial
							popOverContainer.style.top = `${referenceElement.getBoundingClientRect().top + referenceElement.offsetHeight * 0.5}px`;

							//Center
							popOverContainer.style.transform = `translate(0%, -50%)`;

							//Pointer
							pointerElement.style.aspectRatio = "cos(30deg)";
							pointerElement.style.clipPath = "polygon(0 0,100% 50%,0 100%)";
							pointerElement.style.top = `50%`;
							pointerElement.style.transform = `translate(0%, -50%)`;
							pointerElement.style.right = "-10px";
							break;
						default:
							//pivot
							popOverContainer.style.top = `${referenceElement.getBoundingClientRect().top + referenceElement.offsetHeight + 20}px`;

							//arterial
							popOverContainer.style.left = `${referenceElement.getBoundingClientRect().left + referenceElement.offsetWidth * 0.5}px`;

							//Center
							popOverContainer.style.transform = `translate(-50%, 0%)`;

							//Pointer
							pointerElement.style.aspectRatio = "1/cos(30deg)";
							pointerElement.style.clipPath = " polygon(50% 0,100% 100%,0 100%)";
							pointerElement.style.left = `${actualWidth * 0.5}px`;
							pointerElement.style.transform = `translate(-50%, 0%)`;
							pointerElement.style.top = "-10px";

							break;
					}

					canvas.appendChild(popOverContainer);
					popOverContainer.appendChild(pointerElement);
					popOverContainer.appendChild(titleElement);
					popOverContainer.appendChild(messageElement);
					popOverContainer.appendChild(miniAnimation);
				});
			}
			if (canvasConfig.trigger != undefined) {
				canvas.style.cursor = "pointer";
				canvas.addEventListener("click", () => {
					if (canvasConfig.trigger) canvasConfig.trigger(THIS as ScreenPop);
				});
			}
		}
		function useBreakPoint(originalConfig: SCREENPOP_CONFIG, breakPointList: { [key: number]: SCREENPOP_CONFIG }) {
			let revise = originalConfig;
			const sortedWidthPoint = (Object.keys(breakPointList) as unknown as Array<keyof typeof breakPointList>).sort(
				(a, b) => a - b,
			) as Array<keyof typeof breakPointList>;
			for (const width of sortedWidthPoint) {
				if (document.documentElement.clientWidth < width) {
					revise = breakPointList[width];
					break;
				}
			}
			return revise;
		}
		const THIS = this.resetCanvas();
		applyConfig(useBreakPoint(THIS.canvasConfig, THIS.canvasBreakPoint), THIS.canvas);

		addEventListener("resize", () => {
			if (THIS.isAlreadyClose) {
				return;
			}
			const THISrevise = THIS.resetCanvas();
			applyConfig(useBreakPoint(THISrevise.canvasConfig, THISrevise.canvasBreakPoint), THISrevise.canvas);
		});

		return THIS;
	}

	public close() {
		if (this.isAlreadyClose) return this;
		this.isAlreadyClose = true;
		this.canvas.remove();
		return this;
	}
}
