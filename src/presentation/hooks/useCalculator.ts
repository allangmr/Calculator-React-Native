import { useRef, useState } from "react";

enum Operators {
    add,
    subtract,
    multiply,
    divide,
}

export const useCalculator = () => {
    const [number, setNumber] = useState('0');
    const [prevNumber, setPrevNumber] = useState('0');

    const lastOperation = useRef<Operators>();

    const clean = () => {
        setNumber('0');
        setPrevNumber('0');
    };

    const deleteOperation = () => {
        if(number.length === 1 || (number.length === 2 && number.includes('-'))) {
            return setNumber('0');
        }
        setNumber(number.slice(0, -1));
    };

    const toggleSign = () => {
        if(number.includes('-')) {
            return setNumber(number.replace('-', ''));
        }
        setNumber('-' + number);
    };

    const buildNumber = (numberString: string) => {
        // eslint-disable-next-line curly
        if(number.includes('.') && numberString === '.') return;
        if(number.startsWith('0') || number.startsWith('-0')) {
            // Decimal point
            if(numberString === '.') {
                return setNumber(number + numberString);
            }

            //  Evaluate if its zero and not a decimal point
            if(numberString === '0' && number.includes('.')) {
                return setNumber(number + numberString);
            }

            // Evaluate if its different from zero and not a decimal point and its the first number
            if(numberString !== '0' && !number.includes('.')) {
                return setNumber(numberString);
            }

            // Avoid  0000.00
            if(numberString === '0' && !number.includes('.')) {
                return;
            }

            return setNumber(number + numberString);
        }
        setNumber(number + numberString);
    };

    const setLastNumber = () => {
        if(number.endsWith('.')) {
            setPrevNumber(number.slice(0, -1));
        } else {
            setPrevNumber(number);
        }

        setNumber('0');
    };

    const divideOperation = () => {
        setLastNumber();
        lastOperation.current = Operators.divide;
    };

    const multiplyOperation = () => {
        setLastNumber();
        lastOperation.current = Operators.multiply;
    };

    const addOperation = () => {
        setLastNumber();
        lastOperation.current = Operators.add;
    };

    const subtractOperation = () => {
        setLastNumber();
        lastOperation.current = Operators.subtract;
    };


    const calculateResult = () => {
        const num1 = Number(number);
        const num2 = Number(prevNumber);

        switch (lastOperation.current) {
            default: throw new Error('Invalid operation');
            case Operators.add:
                setNumber(`${num1 + num2}`);
                break;
            case Operators.subtract:
                setNumber(`${num2 - num1}`);
                break;
            case Operators.multiply:
                setNumber(`${num1 * num2}`);
                break;
            case Operators.divide:
                if(num1 === 0) {
                    setNumber('Error');
                } else {
                    setNumber(`${num2 / num1}`);
                }
                break;
        }
    };


    return {
        // Properties
        number,
        prevNumber,
        // Methods
        buildNumber,
        toggleSign,
        clean,
        deleteOperation,
        divideOperation,
        multiplyOperation,
        addOperation,
        subtractOperation,
        calculateResult,
    };
};
