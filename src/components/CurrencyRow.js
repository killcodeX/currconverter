import React from 'react';

function CurrencyRow(props) {

    const { CurrencyOptions, selectCurrency, onChangeCurrency, amount, onChangeAmount } = props;

    return (
        <div>
            <input type ='number' className='input' value={amount} onChange={onChangeAmount}/>
            <select value={selectCurrency} onChange={onChangeCurrency}>
                { CurrencyOptions.map( (option,i) => (
                    <option key={i} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}


export default CurrencyRow;
