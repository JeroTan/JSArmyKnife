export function randomizer(min = 0, max = Number.MAX_SAFE_INTEGER, allowDecimal = false){
    const randData = Math.random();
    const result = randData * (max-min) + min;

    if(result % 1 == 0)
        return result;

    if(allowDecimal){
        return adjustDecimal(result, allowDecimal);
    }else{
        return removeDecimal(result);
    }

}

export function removeDecimal(number){
    let result = Math.floor(number);
    result = String(result);
    if(result.includes('.')){
        result = result.split(".");
        result = result[0];
    }
    result = Number(result);
    return result;
}
export function ceilDecimal(number){
    return removeDecimal( Math.ceil(number) );
}

export function adjustDecimal(number, addPlaceValue = true, trimZero=true){
    const placeValue = typeof addPlaceValue === "boolean" ? 2 : Number(addPlaceValue);
    let result = number.toFixed(placeValue);
    result = result.toString().split(".");

    if(result.length == 2 && placeValue < result[1].length){
        result[1] = result[1].slice(placeValue);
    }

    if( trimZero && result.length == 2  && Number(result[1]) == 0 ){
        result = `${result[0]}`;
    }else{
        result = `${result[0]}.${result[1]}`;
    }
    return Number(result);
}

export function separateNumber(raw){
    const result = {
        sign: false, //Sign Boolean
        whole: 0,
        decimal: 0,
    }
    const splitRaw = raw.toString().split(".");
    if(splitRaw[0][0] == "-" ){
        result.sign = true;
        result.whole = Number(splitRaw[0].substring(1));
    }else{
        result.whole = Number(splitRaw[0]);
    }

    if(splitRaw.length == 2)
        result.decimal = Number(splitRaw[1]);

    return result;
}

export function combineNumber(data, convertToNumber = false){//@data = {sign, whole, decimal}
    let result = `${data.sign ? "-":""}${data.whole}${ data.decimal ? "."+data.decimal : "" }`;
    if(convertToNumber)
        result = Number(result);
    return result;
}

export function padNumber(number, length){
    const raw = separateNumber(number);
    if(length < 0)
        length = 0;
    const paddingValue = 10 ** length;
    
    if(paddingValue > raw.whole){
        raw.whole = (paddingValue + raw.whole).toString().substring(1);
        return combineNumber(raw, false);
    }

    return combineNumber(raw, false);
    
}


//------------ Date Transformer ------------//
export function transformDate(date, format="simple"){
    const dateMe = new Date(date);
    switch(format){
        case "simple":{
            return `${dateMe.getFullYear()}, ${dateMe.getMonth()+1}-${dateMe.getDate()} | ${dateMe.getHours()}:${dateMe.getMinutes()}`;
        }
        case "yyyy-mm-dd":{
            return `${padNumber(dateMe.getFullYear(), 4)}-${padNumber(date.getMonth()+1, 2)}-${padNumber(date.getDate(), 2)}`;
        }
        case "iso":{
            return `${dateMe.getFullYear()}-${padNumber(dateMe.getMonth()+1, 2)}-${padNumber(dateMe.getDate(), 2)}T${padNumber(dateMe.getHours(), 2)}:${padNumber(dateMe.getMinutes(), 2)}`
        }
        case "simple-named":{
            return `${dateMe.getFullYear()}, ${ monthName(dateMe.getMonth()+1) } ${dateMe.getDate()} ${dayName(dateMe.getDay()+1)} | ${hour12(dateMe.getHours())}:${padNumber(dateMe.getMinutes(), 2)}${ dateMe.getHours() >=13 ? "pm":"am"  }`;
        }
    }
   
}
export function getToday(){
    return transformDate(Date.now());
}

export function numberOfDays(month, year = new Date().getFullYear(), date =false){
    if(typeof month == "string" && isNaN(month)){
        month = month.toLowerCase();
    }else{
        month = month.toString();
    }
    if(typeof year == "string"){
        year = Number(year);
    }
    if(date){
        month = (date.getMonth()+1).toString();
        year = date.getFullYear();
    }

    switch(month){
        case "1":
        case "january":
            return 31;
        case "2":
        case "february":
            return year % 4 === 0 ? 29: 28;
        case "3":
        case "march":
            return 31;
        case "4":
        case "april":
            return 30;
        case "5":
        case "may":
            return 31;
        case "6":
        case "june":
            return 30;
        case "7":
        case "july":
            return 31;
        case "8":
        case "august":
            return 31;
        case "9":
        case "september":
            return 30;
        case "10":
        case "october":
            return 31;
        case "11":
        case "november":
            return 30;
        case "12":
        case "december":
            return 31;
    }
}
export function monthName(number, format="short"){ //Short or Full
    switch(number){
        case 1:
            return format=="short"?"Jan":"January";
        case 2:
            return format=="short"?"Feb":"February";
        case 3:
            return format=="short"?"Mar":"March";
        case 4:
            return format=="short"?"Apr":"April";
        case 5:
            return format=="short"?"May":"May";
        case 6:
            return format=="short"?"Jun":"June";
        case 7:
            return format=="short"?"Jul":"July";
        case 8:
            return format=="short"?"Aug":"August";
        case 9:
            return format=="short"?"Sep":"September";
        case 10:
            return format=="short"?"Oct":"October";
        case 11:
            return format=="short"?"Nov":"November";
        case 12:
            return format=="short"?"Dec":"December";
    }
}
export function dayName(number, format="short"){
    switch(number){
        case 1:
            return format=="short"?"Sun":"Sunday";
        case 2:
            return format=="short"?"Mon":"Monday";
        case 3:
            return format=="short"?"Tue":"Tuesday";
        case 4:
            return format=="short"?"Wed":"Wednesday";
        case 5:
            return format=="short"?"Thu":"Thursday";
        case 6:
            return format=="short"?"Fri":"Friday";
        case 7:
            return format=="short"?"Sat":"Saturday";
    }
}
export function hour12(hour24){
    return removeDecimal(hour24%12) || 12;
}
export class DateNavigator extends Date{
    constructor(date=undefined){
        if(date == undefined){
            super()
        }else
            super(date);
        const second = 1000; //1000 milliseconds == 1 second;
        const minute = 60 * second; 
        const hour = 60 * minute;
        const day = 24 * hour;
        this.reference = {
            second: second,
            minute: minute,
            hour: hour,
            day: day,
        }
    }
    changeDate(date){
        // TO BE CONTINUE
        return this;
    }
    normalize(whatTime, type="min"){//@whatTime = Year(2037 or 1970), Month(0 or 11), Day(0, 28,29,30,31), Hour(0, 23), Minute(0, 59), Seconds(0, 59), Milliseconds(0,999)
        const {day} = this.reference;
        const translate = {
            "0":0, "millisecond":0, "Millisecond":0, "ms":0,    "MS":0,      "mls":0,   "MIS":0,
            "1":1, "second":1,      "Second":1,      "s":1,     "S":1,       "ss":1,    "SS":1,
            "2":2, "minute":2,      "Minute":2,      "m":2,     "M":2,       "mi":2,    "MI":2,
            "3":3, "hour":3,        "Hour":3,        "h":3,     "H":3,       "hh":3,    "HH":3,
            "4":4, "day":4,         "Day":4,         "date":4,  "Date":4,    "d":4,     "D":4,      "dd":4,    "DD":4,  "week":4,  "Week":4,
            "5":5, "month":5,       "Month":5,       "mm":5,    "MM":5,
            "6":6, "year":6,        "Year":6,        "y":6,     "y":6,       "yyyy":6,  "YYYY":7,
        }
        
        if(translate[whatTime] == undefined){
            return this;
        }
   
        if( translate[whatTime] >=0 ){
            super.setMilliseconds( type=="min"?0:999 );
        }
        
        if( translate[whatTime] >=1 ){
            super.setSeconds( type=="min"?0:59 );
        }
        
        if( translate[whatTime] >=2 ){
            super.setMinutes( type=="min"?0:59 );
        }

        if( translate[whatTime] >=3 ){
            super.setHours( type=="min"?0:23 );
        }

        if(translate[whatTime] >=4){
            if(whatTime == "week" || whatTime == "Week"){
                if(type=="min"){
                    super.setTime(   super.getTime() - day*(super.getDay())    )//Set the starting to sunday;
                }
                else{
                    super.setTime(   super.getTime() + day*(6-super.getDay())    )//Set the ending saturday.
                }
            }else{
                if(type=="min"){
                    super.setDate(1);
                }
                else{
                    super.setDate(32);
                    super.setDate(0);
                }
            }
            
        }

        if(translate[whatTime] >=5){
            super.setMonth( type=="min"?0:11 );
        }

        if(translate[whatTime] >=6){
            super.setFullYear( type=="min"?1970:2037 );
        }
            
        return this;
    }

    //---- PREV----//
    prevSecond(n=1){
        const {second} = this.reference;
        super.setTime( super.getTime() - (second*n) );
        return this;
    }
    prevMinute(n=1){
        const {minute} = this.reference;
        super.setTime( super.getTime() - (minute*n) );
        return this;
    }
    prevHour(n=1){
        const {hour} = this.reference;
        super.setTime( super.getTime() - (hour*n) );
        return this;
    }
    prevDay(n=1){
        const {day} = this.reference;
        super.setTime( super.getTime() - (day*n) );
        return this;
    }
    prevWeek(n=1){
        const {day} = this.reference;
        super.setTime( super.getTime() - (day*7*n) );
        return this;
    }
    prevMonth(n=1, type="min"){
        while(n>0){
            super.setDate(0);
            --n;
        }
        if(type=="min")
                super.setDate(1);
        return this;
    }
    prevYear(n=1){
        super.setFullYear( super.getFullYear()-n );
        return this;
    }
    prevDecade(n=1){
        super.setFullYear( super.getFullYear()-n*10 );
        return this;
    }
    prevCentury(n=1){
        super.setFullYear( super.getFullYear()-n*100 );
        return this;
    }

    //---- NEXT----//
    nextSecond(n=1){
        const {second} = this.reference;
        super.setTime( super.getTime() + second*n );
        return this;
    }
    nextMinute(n=1){
        const {minute} = this.reference;
        super.setTime( super.getTime() + minute*n );
        return this;
    }
    nextHour(n=1){
        const {hour} = this.reference;
        super.setTime( super.getTime() + hour*n );
        return this;
    }
    nextDay(n =1){
        const {day} = this.reference;
        super.setTime( super.getTime() + day*n );
        return this;
    }
    nextWeek(n=1){
        const {day} = this.reference;
        super.setTime( super.getTime() + day*7*n );
        return this;
    }
    nextMonth(n=1, type="min"){
        while(n>0){
            super.setDate(32);
            super.setDate(1);
            --n;
        }
        if(type=="max"){
            super.setDate(32);
            super.setDate(0);
        }
            
        return this;
    }
    nextYear(n=1){
        super.setFullYear( super.getFullYear()+n );
        return this;
    }
    nextDecade(n=1){
        super.setFullYear( super.getFullYear()+n*10 );
        return this;
    }
    nextCentury(n=1){
        super.setFullYear( super.getFullYear()+n*100 );
        return this;
    }

    //---- GAP----//
    gapSecond(dateRef){
        const {second} = this.reference;
        const gap = super.getTime() - dateRef.getTime();
        return removeDecimal( gap/second );
    }
    gapMinute(dateRef){
        const {minute} = this.reference;
        const gap = super.getTime() - dateRef.getTime();
        return removeDecimal( gap/minute );
    }
    gapHour(dateRef){
        const {hour} = this.reference;
        const gap = super.getTime() - dateRef.getTime();
        return removeDecimal( gap/hour );
    }
    gapDay(dateRef){
        const {day} = this.reference;
        const gap = super.getTime() - dateRef.getTime();
        return removeDecimal( gap/day );
    }
    gapWeek(dateRef){
        const {day} = this.reference;
        super.setTime(    super.getTime() +  day*( 6-super.getDay() )    );
        const gap = super.getTime() - dateRef.getTime();
        return removeDecimal( gap/(7*day) );
    }
    gapMonth(dateRef){
        let annualGap = super.getFullYear() - dateRef.getFullYear();
        let monthGap = super.getMonth() - dateRef.getMonth();
        if(monthGap < 0){
            annualGap-=1;
            monthGap+=12;
        }
        return (annualGap*12) + monthGap;
    }
    gapYear(dateRef){
        const annualGap = super.getFullYear() - dateRef.getFullYear();
        return annualGap;
    }
    gapDecade(dateRef){
        const annualGap = super.getFullYear() - dateRef.getFullYear();
        return removeDecimal(annualGap/10);
    }
    gapCentury(dateRef){
        const annualGap = super.getFullYear() - dateRef.getFullYear();
        return removeDecimal(annualGap/100);
    }

}

