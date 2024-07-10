import './Container.css';
import { useState } from "react";

export default function Container() {
  const [display, setDisplay] = useState("0");
  const [evaluated, setEvaluated] = useState(false); 

  const handleClick = (event) => {
    const number = event.target.textContent;

    if (evaluated) {
      setDisplay(number);
      setEvaluated(false);
    } else if (display === '0') {
      setDisplay(number);
    } else {
      setDisplay(display + number);
    }
  };

  const handleOperator = (event) => {
    const operator = event.target.textContent;
    const lastChar = display[display.length - 1];

    if (evaluated) {
      setEvaluated(false);
    }

    if ("+-*/".includes(lastChar)) {
      if (operator === '-' && !display.endsWith(' ')) {
        setDisplay(display + operator);
      } else {
        const updatedDisplay = display.replace(/[*\/+-]+$/, '') + operator;
        setDisplay(updatedDisplay);
      }
    } else {
      setDisplay(display + operator);
    }
  };

  const handleSubmit = () => {
    try {
      const result = eval(display.replace(/[^-()\d/*+.]/g, '')); 
      setDisplay(result.toString());
      setEvaluated(true); 
    } catch (error) {
      setDisplay("Error");
      setEvaluated(true); 
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEvaluated(false);
  };

  const handleDecimal = () => {
    if (evaluated) {
      setDisplay('0.');
      setEvaluated(false);
      return;
    }

    const array = display.split(/[\+\-\*\/]/); 
    const lastElement = array[array.length - 1];

    if (!lastElement.includes('.')) {
      setDisplay(display + '.');
    }
  };

  return (
    <div className="calculator">
      <div id="display" className="row">{display}</div>
      <div id="clear" onClick={handleClear} className="row">
        AC
      </div>
      <div id="seven" onClick={handleClick}>7</div>
      <div id="eight" onClick={handleClick}>8</div>
      <div id="nine" onClick={handleClick}>9</div>
      <div id="multiply" onClick={handleOperator}>*</div>
      <div id="four" onClick={handleClick}>4</div>
      <div id="five" onClick={handleClick}>5</div>
      <div id="six" onClick={handleClick}>6</div>
      <div id="divide" onClick={handleOperator}>/</div>
      <div id="one" onClick={handleClick}>1</div>
      <div id="two" onClick={handleClick}>2</div>
      <div id="three" onClick={handleClick}>3</div>
      <div id="add" onClick={handleOperator}>+</div>
      <div id="zero" onClick={handleClick}>0</div>
      <div id="decimal" onClick={handleDecimal}>.</div>
      <div id="equals" onClick={handleSubmit}>=</div>
      <div id="subtract" onClick={handleOperator}>-</div>
    </div>
  );
}
