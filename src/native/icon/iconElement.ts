import { IconList } from "./iconify";

export class IconElement<T> {
	referenceIconList: typeof IconList | T;
	constructor(referenceIconList: typeof IconList | T = IconList) {
		this.referenceIconList = referenceIconList;
	}

	getIcon(data: { name: keyof (typeof IconList | T); inClass?: string; outClass?: string }) {
		const { name, outClass, inClass } = data;
		const iconList = this.referenceIconList as any;
		const iconData = iconList[name];
		if (iconData === undefined) {
			return "ICON DOES NOT EXIST";
		}

		// Create container div and assign the outClass
		const container = document.createElement("div");
		if (outClass) {
			container.className = outClass;
		}

		// Create svg element with the proper namespace and attributes from iconData
		const svg = document.createElementNS(iconData.svg.xmlns, "svg");
		svg.setAttribute("width", "100%");
		svg.setAttribute("height", "100%");
		svg.setAttribute("viewBox", iconData.svg.viewBox);

		// Create group element and assign the inClass
		const g = document.createElementNS(iconData.svg.xmlns, "g");
		if (inClass) {
			g.className = inClass;
		}

		// For each vector, create the corresponding SVG element and set its attributes
		iconData.vectors.forEach((vector: any, index: number) => {
			const { element, ...elementAttributes } = vector;
			// create an element in the proper namespace, e.g., "path"
			const el = document.createElementNS(iconData.svg.xmlns, element);
			for (const attr in elementAttributes) {
				if (elementAttributes.hasOwnProperty(attr)) {
					el.setAttribute(attr, elementAttributes[attr]);
				}
			}
			g.appendChild(el);
		});

		svg.appendChild(g);
		container.appendChild(svg);
		return container;
	}
}
