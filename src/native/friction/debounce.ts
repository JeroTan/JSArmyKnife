export class Debouncer {
	private timer: number = 0;
	private debouncer: number | undefined = undefined;
	private callback: Function = () => true;

	constructor(timer: number = 0) {
		this.time(timer);
	}
	time(timer: number = 0) {
		if (timer) this.timer = timer;
		return this;
	}
	do(callback: Function = () => true) {
		this.callback = callback;
		return this;
	}
	run() {
		clearTimeout(this.debouncer);
		this.debouncer = setTimeout(this.callback, this.timer);
		return this;
	}
}
