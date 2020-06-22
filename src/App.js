import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './components/CurrencyRow';

const base_url = 'https://api.exchangeratesapi.io/latest';

function App() {

  const [ CurrencyOptions, setCurrencyOptions] = useState([]);
  const [ fromCurrency, setfromCurrency ] = useState();
  const [ ExchangeRate, setExchangeRate ] = useState();
  const [ toCurrency, settoCurrency ] = useState();
  const [ amount, setamount] = useState(1);
  const [ amountInFromCurrency, setamountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if( amountInFromCurrency){
    fromAmount = amount;
    toAmount = amount * ExchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / ExchangeRate;
  }

  useEffect(() => {
    fetch(base_url)
    .then(res => res.json())
    .then(data => {
      const firstCurrency = Object.keys(data.rates)[0];
      setCurrencyOptions([data.base, ...Object.keys(data.rates)])
      setfromCurrency(data.base)
      settoCurrency(firstCurrency)
      setExchangeRate(data.rates[firstCurrency])
    })
    .catch(err => console.log(err))
  }, [])

  useEffect(() =>{
    if(fromCurrency != null && toCurrency != null){
      fetch(`${base_url}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange(e){
    setamount(e.target.value)
    setamountInFromCurrency(true)
  }
  function handleToAmountChange(e){
    setamount(e.target.value)
    setamountInFromCurrency(false)
  }

  return (
    <div className="App">
      <h1>Convert</h1>
      <CurrencyRow 
      CurrencyOptions={CurrencyOptions}
      selectCurrency={fromCurrency}
      onChangeCurrency={e => setfromCurrency(e.target.value)}
      amount={fromAmount}
      onChangeAmount={handleFromAmountChange}
      />
      <div className='equals'> = </div>
      <CurrencyRow 
      CurrencyOptions={CurrencyOptions}
      selectCurrency={toCurrency}
      onChangeCurrency={e => settoCurrency(e.target.value)}
      amount={toAmount}
      onChangeAmount={handleToAmountChange}
      />
    </div>
  );
}

export default App;
