class SmartCalculator {
    constructor(initialValue) {
        this._stringForCounting = [];
        this._stringForCounting.push(initialValue);
        return this;
    }

    add(number) {
        this._stringForCounting.push('+', number);
        return this;
    }

    subtract(number) {
        this._stringForCounting.push('-', number);
        return this;
    }

    multiply(number) {
        this._stringForCounting.push('*', number);
        return this;
    }

    devide(number) {
        this._stringForCounting.push('/', number);
        return this;
    }

    pow(number) {

        let base = this._stringForCounting.pop();
        if(typeof base === 'number') {                 //if it is the first pow
            let k = 'Math.pow(' + base + ',' + number + ')';
            this._stringForCounting.push(k);
        }
        else {
            let indexOfLastComma = base.lastIndexOf(',');
            let lastPow = base.slice(indexOfLastComma + 1, base.indexOf(')', indexOfLastComma));

            let firstPart = base.slice(0, indexOfLastComma + 1);
            let lastPart = base.slice(base.lastIndexOf(lastPow) + lastPow.length , base.length);
            let result = firstPart +  'Math.pow(' +lastPow + ',' + number + ')' + lastPart;
            this._stringForCounting.push(result);
        }
        return this;
    }

    valueOf() {
        return eval(this._stringForCounting.join(''));
    }

}

module.exports = SmartCalculator;
