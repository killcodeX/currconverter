import React from 'react';

function CurrencyRow(props) {

    const { CurrencyOptions, selectCurrency, onChangeCurrency } = props;

    return (
        <div>
            <input type ='number' className='input'/>
            <select value={selectCurrency} onChange={onChangeCurrency}>
                { CurrencyOptions.map( (option,i) => (
                    <option key={i} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}


export default CurrencyRow;
