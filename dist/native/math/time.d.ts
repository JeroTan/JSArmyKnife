export type TRANSFORM_FORMAT = "simple" | "yyyy-mm-dd" | "iso" | "simple-named" | "time-12h" | "time-24-seconds" | "mnt, dd yyyy" | "dxx mnt, yyyy";
export declare function transformDate(date: Date | string | number, format?: TRANSFORM_FORMAT, utc?: boolean): string;
export declare class DateUTC extends Date {
    getFullYear(): number;
    getMonth(): number;
    getDate(): number;
    getHours(): number;
    getMinutes(): number;
    getSeconds(): number;
    getMilliseconds(): number;
    getDay(): number;
}
export declare function getToday(format?: TRANSFORM_FORMAT): string;
export type NUMBER_OF_MONTHS = number | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type NUMBER_OF_DAYS = number | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export declare function numberOfDays(month: string | NUMBER_OF_MONTHS, year?: number, date?: undefined | string | number | Date): 30 | 31 | 29 | 28 | undefined;
export declare function monthName(number: NUMBER_OF_MONTHS, format?: "short" | "long"): "Jan" | "January" | "Feb" | "February" | "Mar" | "March" | "Apr" | "April" | "May" | "Jun" | "June" | "Jul" | "July" | "Aug" | "August" | "Sep" | "September" | "Oct" | "October" | "Nov" | "November" | "Dec" | "December" | undefined;
export declare function dayName(number: NUMBER_OF_DAYS, format?: string): "Sun" | "Sunday" | "Mon" | "Monday" | "Tue" | "Tuesday" | "Wed" | "Wednesday" | "Thu" | "Thursday" | "Fri" | "Friday" | "Sat" | "Saturday" | undefined;
export declare function hour12(hour24: number): number;
export declare function timeToMilliseconds(timeString: string): number;
export declare class DateNavigator extends Date {
    private reference;
    private timezone?;
    constructor(date?: undefined | string | number | Date);
    setTimezone(custom?: string | "Asia/Manila" | "+08:00"): this;
    normalize(whatTime: string, type?: "min" | "max"): this;
    prevMillisecond(n?: number): this;
    prevSecond(n?: number): this;
    prevMinute(n?: number): this;
    prevHour(n?: number): this;
    prevDay(n?: number): this;
    prevWeek(n?: number): this;
    prevMonth(n?: number, type?: "min" | "max" | "same"): this;
    prevYear(n?: number): this;
    prevDecade(n?: number): this;
    prevCentury(n?: number): this;
    nextMillisecond(n?: number): this;
    nextSecond(n?: number): this;
    nextMinute(n?: number): this;
    nextHour(n?: number): this;
    nextDay(n?: number): this;
    nextWeek(n?: number): this;
    nextMonth(n?: number, type?: string): this;
    nextYear(n?: number): this;
    nextDecade(n?: number): this;
    nextCentury(n?: number): this;
    gapMillisecond(dateRef: Date): number;
    gapSecond(dateRef: Date): number;
    gapMinute(dateRef: Date): number;
    gapHour(dateRef: Date): number;
    gapDay(dateRef: Date): number;
    gapWeek(dateRef: Date): number;
    gapMonth(dateRef: Date): number;
    gapYear(dateRef: Date): number;
    gapDecade(dateRef: Date): number;
    gapCentury(dateRef: Date): number;
    toISOStringRevise(): string;
}
