export interface STATE_STACK_DATA<T> {
	[key: string | number]: T;
}
export class State {
	private stateList: STATE_STACK_DATA<Subscription<any>> = {};

	public addState<DATA_TYPE>(stateKey: string | number, value?: DATA_TYPE, silent = false) {
		if (this.stateList[stateKey] == undefined)
			return (this.stateList[stateKey] = new Subscription<DATA_TYPE>(value, silent));
		else {
			return this.stateList[stateKey] as Subscription<DATA_TYPE>;
		}
	}

	public newState<DATA_TYPE>(value?: DATA_TYPE, silent = false, stateKey?: string | number) {
		if (stateKey == undefined) {
			stateKey = this.stateList ? Object.keys(this.stateList).length : 0;
		}
		if (this.stateList[stateKey] == undefined)
			return (this.stateList[stateKey] = new Subscription<DATA_TYPE>(value, silent));
		else {
			return this.stateList[stateKey] as Subscription<DATA_TYPE>;
		}
	}

	public select<ACTUAL_TYPE>(stateKey: string | number, value?: ACTUAL_TYPE) {
		const subs = this.stateList[stateKey] as Subscription<ACTUAL_TYPE>;
		if (subs == undefined) {
			this.stateList[stateKey] = new Subscription<ACTUAL_TYPE>(value, true);
		}
		if (value) {
			this.stateList[stateKey].update(value);
		}
		return this.stateList[stateKey] as Subscription<ACTUAL_TYPE>;
	}
}

export class Subscription<DATA_TYPE> {
	private value: DATA_TYPE = undefined as any;
	private oldValue: DATA_TYPE = undefined as any;
	private stateTrigger = document.createElement("button");

	constructor(value?: DATA_TYPE, silent = false) {
		if (value) this.set(value, silent);
	}

	//--Setter--//
	set(value: DATA_TYPE, silent = false) {
		if (this.oldValue === this.value) {
			this.oldValue = value;
		}
		this.value = value;
		if (!silent) {
			this.stateTrigger.dispatchEvent(new Event("click"));
		}
		return this;
	}
	//--Setter--//

	get() {
		return this.value;
	}

	trigger() {
		this.stateTrigger.dispatchEvent(new Event("click"));
		return this;
	}

	update(value: DATA_TYPE | ((value: DATA_TYPE, oldValue?: DATA_TYPE) => DATA_TYPE), silent = false) {
		if (typeof value == "function") {
			value = (value as (value: DATA_TYPE, oldValue?: DATA_TYPE) => DATA_TYPE)(this.value, this.oldValue);
			this.oldValue = this.value;
			this.value = value as DATA_TYPE;
			if (!silent) {
				this.stateTrigger.dispatchEvent(new Event("click"));
			}
			return;
		}
		this.value = value;
		if (!silent) {
			this.stateTrigger.dispatchEvent(new Event("click"));
		}
	}

	subscribe(callback: (value: DATA_TYPE, oldValue?: DATA_TYPE) => void) {
		const THIS = this;
		this.stateTrigger.addEventListener("click", () => {
			try {
				callback(THIS.value, THIS.oldValue);
			} catch (e) {
				console.log("Something happened in the subscription:");
				console.log("FROM: ", callback);
				console.log("VALUE:", THIS.value);
				console.log("ERROR: ", e);
				console.log("If this is intended (i.e accessing values from parallel subscription), ignore this message");
			}
		});
	}
}

export class StateSync<T> {
	private states: Subscription<T>[] = [];

	constructor(...states: Subscription<T>[]) {
		this.states = states || [];
	}

	addStates(states: Subscription<T>[] | Subscription<T>) {
		if (Array.isArray(states)) {
			this.states.push(...states);
		} else {
			this.states.push(states);
		}
	}

	private toString(data: T) {
		if (typeof data === "object" && data !== null) {
			return JSON.stringify(data);
		} else {
			return String(data);
		}
	}

	sync() {
		for (const state of this.states) {
			state.subscribe((value) => {
				for (const otherState of this.states) {
					if (this.toString(otherState.get()) !== this.toString(value)) {
						otherState.update(value);
					}
				}
			});
		}
	}
}
