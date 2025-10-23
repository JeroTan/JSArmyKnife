export class DataDispatch<VAR_TYPE extends { [key: string | number]: any } | object | {}> {
	// Get the value of state changer
	private dispatch: Function = () => {};
	constructor(dispatch: boolean | Function = false) {
		//Dispatch callback must have a parameter that also accepts a callback. That callback must have a parameter about the old data;
		if (dispatch && typeof dispatch === "function") this.dispatch = dispatch;
	}
	addDispatch(dispatch: Function) {
		this.dispatch = dispatch;
		return this;
	}
	store(key: string | number, val: any | ((key: any) => any)) {
		this.dispatch((old: object) => {
			const newData: VAR_TYPE = { ...old } as VAR_TYPE;
			if (typeof val === "function") {
				newData[String(key) as keyof VAR_TYPE] = val(structuredClone(newData[String(key) as keyof VAR_TYPE]));
			} else {
				newData[String(key) as keyof VAR_TYPE] = val;
			}
			return newData;
		});
		return this;
	}
	clear(key: string | number, clearValue: any = "") {
		this.dispatch((old: object) => {
			const newData: VAR_TYPE = { ...old } as VAR_TYPE;
			newData[String(key) as keyof VAR_TYPE] = clearValue;
			return newData;
		});
		return this;
	}
	batch(objects: VAR_TYPE, refresh = false) {
		refresh;
		// if(!refresh){
		//     this.dispatch(objects);
		//     return this;
		// }

		this.dispatch((old: object) => {
			const newData: VAR_TYPE = { ...old } as VAR_TYPE;
			for (const i in newData) {
				if (!objects[i]) continue;
				newData[i] = objects[i];
			}
			return newData;
		});
		return this;
	}
}
export function useMod<STATE, STATE_SET>(get: STATE, set: STATE_SET): { get: () => STATE; set: STATE_SET } {
	return {
		get() {
			return get;
		},
		set,
	};
}
