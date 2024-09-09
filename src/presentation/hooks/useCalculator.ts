/* eslint-disable curly */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";

enum Operators {
    add = '+',
    subtract = '-',
    multiply = 'x',
    divide = '÷',
}

export const useCalculator = () => {
    const [formula, setFormula] = useState('');
    const [number, setNumber] = useState('0');
    const [prevNumber, setPrevNumber] = useState('0');

    const lastOperation = useRef<Operators>();

    useEffect(() => {
        if(lastOperation.current) {
            const firstFormulaPart = formula.split(' ').at(0);
            setFormula(`${firstFormulaPart} ${lastOperation.current} ${number}`);
        } else {
            setFormula(number);
        }
    }, [ number ]);

    useEffect(() => {
        const calculate = calculateSubResult();
        setPrevNumber(`${calculate}`);
    }, [formula]);

    const clean = () => {
        setNumber('0');
        setPrevNumber('0');
        setFormula('0');
        lastOperation.current = undefined;
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
        calculateResult();
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
        const result = calculateSubResult();
        setFormula(`${result}`);
        lastOperation.current = undefined;
        setPrevNumber('0');
    };

    const calculateSubResult = () => {
        const [firstNumber, operation, secondNumber] = formula.split(' ');
        const num1 = Number(firstNumber);
        const num2 = Number(secondNumber);

        if(isNaN(num2)) return num1;

        switch (operation) {
            case Operators.add:
                return num1 + num2;
            case Operators.subtract:
                return num1 - num2;
            case Operators.multiply:
                return num1 * num2;
            case Operators.divide:
                if(num1 === 0) {
                    setNumber('Error');
                } else {
                    return num1 / num2;
                }
                break;
            default: throw new Error('Invalid operation');
        }
    };


    return {
        // Properties
        number,
        prevNumber,
        formula,
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
