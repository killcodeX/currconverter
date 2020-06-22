import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './components/CurrencyRow';

const base_url = 'https://api.exchangeratesapi.io/latest';

function App() {

  const [ CurrencyOptions, setCurrencyOptions] = useState([]);
  const [ fromCurrency, setfromCurrency ] = useState();
  const [ toCurrency, settoCurrency ] = useState();
  const [ amount, setamount] = useState(1);
  const [ amountInFromCurrency, setamountInFromCurrency] = useState(true);

  console.log(CurrencyOptions);

  useEffect(() => {
    fetch(base_url)
    .then(res => res.json())
    .then(data => {
      const firstCurrency = Object.keys(data.rates)[0];
      setCurrencyOptions([data.base, ...Object.keys(data.rates)])
      setfromCurrency(data.base)
      settoCurrency(firstCurrency)
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <div className="App">
      <h1>Convert</h1>
      <CurrencyRow 
      CurrencyOptions={CurrencyOptions}
      selectCurrency={fromCurrency}
      onChangeCurrency={e => setfromCurrency(e.target.value)}
      />
      <div className='equals'> = </div>
      <CurrencyRow 
      CurrencyOptions={CurrencyOptions}
      selectCurrency={toCurrency}
      onChangeCurrency={e => settoCurrency(e.target.value)}
      />
    </div>
  );
}

export default App;
