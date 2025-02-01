import { useState } from 'react';

const Calculator = () => {
    const [firstNumber, setFirstNumber] = useState('');
    const [secondNumber, setSecondNumber] = useState('');
    const [operator, setOperator] = useState('');
    const [result, setResult] = useState('');
    const [currentInput, setCurrentInput] = useState('first'); // 'first' or 'second'

    const handleNumberClick = (num) => {
        const currentValue = currentInput === 'first' ? firstNumber : secondNumber;
        if (currentValue.length < 2) {
        if (currentInput === 'first') {
            setFirstNumber(currentValue + num);
        } else {
            setSecondNumber(currentValue + num);
        }
        }
    };

    const handleOperatorClick = (op) => {
        if (firstNumber) {
        setOperator(op);
        setCurrentInput('second');
        }
    };

    const calculate = () => {
        if (!firstNumber || !secondNumber || !operator) return;

        const num1 = parseInt(firstNumber);
        const num2 = parseInt(secondNumber);
        let calculatedResult;

        switch (operator) {
            case '+':
                calculatedResult = num1 + num2;
                break;
            case '-':
                calculatedResult = num1 - num2;
                break;
            case '*':
                calculatedResult = num1 * num2;
                break;
            case '/':
                calculatedResult = num2 !== 0 ? num1 / num2 : 'Error';
                break;
            default:
            return;
        }

        setResult(calculatedResult.toString());
    };

const clear = () => {
    setFirstNumber('');
    setSecondNumber('');
    setOperator('');
    setResult('');
    setCurrentInput('first');
    };

    return (
    <card className="p-6 w-64 bg-gray-100">
        <h2>Calculator - Lab Exercise 6</h2>
        <div className="componentBox">
            <span>Operations:    </span>
            <span className="text-xl">
            {firstNumber} {operator} {secondNumber} {result && '= ' + result}
            </span>
        </div>

        <div className="componentBox">

            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button key={num} onClick={() => handleNumberClick(num.toString())} >{num}</button>
            ))}

            {['+', '-', '*', '/'].map((op) => (
            <button key={op} onClick={() => handleOperatorClick(op)} >{op}</button>
            ))}

            <button onClick={calculate} className="col-span-2 bg-green-500 hover:bg-green-600 text-white">=</button>
            <button onClick={clear} className="col-span-2 bg-red-500 hover:bg-red-600 text-white">Clear</button>

        </div>
    </card>
    );
};

export default Calculator;
