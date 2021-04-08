import React, { useState, useEffect } from 'react';
import file from './homeLP.csv';
import Papa from 'papaparse';
import {
  homeBillRateA,
  homeBillRateB,
  evBillRateA,
  evBillRateB,
  compareRates,
  numberWithCommas,
} from './utils';
import './App.css';
import Header from './components/Header';
import Results from './components/Results';
import Info from './components/Info';

const App = () => {
  const [initialData, setInitialData] = useState([]);

  const [rate, setRate] = useState('');
  const [miles, setMiles] = useState(0);
  const [hours, setHours] = useState('');

  const [B1rateA, setB1rateA] = useState(0);
  const [B2rateA, setB2rateA] = useState(0);
  const [B1rateB, setB1rateB] = useState(0);
  const [B2rateB, setB2rateB] = useState(0);

  const [results, setResults] = useState(false);
  const [info, setInfo] = useState();

  //Extracts home load profile data from CSV file
  const parseCSV = async () => {
    const response = await fetch(file);
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    const csv = decoder.decode(result.value);
    const results = Papa.parse(csv, { header: true, skipEmptyLines: true });
    setInitialData(results.data);
  };

  //Resets all values on entire form
  const resetForm = (e) => {
    e.preventDefault();
    setRate('');
    setMiles(0);
    setHours('');
    setB1rateA(0);
    setB2rateA(0);
    setB1rateB(0);
    setB2rateB(0);
    setResults(false);
    setInfo();
  };

  //Calls functions to calculate total bills for rates and displays results
  const onSubmit = (e) => {
    e.preventDefault();
    setResults(true);

    let B1rateA = homeBillRateA(initialData);
    if (B1rateA !== 1350.56) B1rateA = 1350.56; //backup for if the parsing takes too long
    const B2rateA = B1rateA + evBillRateA(miles);
    setB1rateA(B1rateA.toFixed(2));
    setB2rateA(B2rateA.toFixed(2));

    let B1rateB = homeBillRateB(initialData);
    if (B1rateB !== 993.96) B1rateB = 993.96; //backup for if the parsing takes too long
    const B2rateB = B1rateB + evBillRateB(miles, hours);
    setB1rateB(B1rateB.toFixed(2));
    setB2rateB(B2rateB.toFixed(2));

    const info = compareRates(rate, B2rateA, B2rateB);
    setInfo(info);
  };

  useEffect(() => {
    parseCSV();
  }, []);

  return (
    <div>
      <div className="container">
        <Header />
        <div className="form">
          <form onSubmit={onSubmit}>
            <div className="formControl">
              <label htmlFor="rate">Which rate you are currently on?</label>
              <select
                required
                id="rate"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              >
                <option value=""></option>
                <option value="Rate A">Rate A: $0.15/kWh</option>
                <option value="Rate B">
                  Rate B: $0.20/kWh (12pm-6pm) / $0.08/kWh (6pm-12pm)
                </option>
              </select>
            </div>
            <div className="formControl">
              <label htmlFor="miles">
                How many miles will you drive per year?
              </label>
              <div className="slider">
                <input
                  required
                  id="miles"
                  type="range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={miles}
                  onChange={(e) => setMiles(e.target.value)}
                />
                <h4>
                  {numberWithCommas(miles)} <span>MILES</span>{' '}
                </h4>
              </div>
            </div>
            <div className="formControl">
              <label htmlFor="time">
                What hours of the day do you plan to charge?
              </label>
              <div className="buttons">
                <label
                  className={`option 
                  ${hours === '12am6am' ? 'highlighted' : ''}`}
                  htmlFor="12am6am"
                >
                  12AM - 6AM
                  <input
                    id="12am6am"
                    type="radio"
                    name="time"
                    value="12am6am"
                    checked={hours === '12am6am'}
                    onChange={(e) => setHours(e.target.value)}
                  />
                </label>
                <label
                  className={`option  ${
                    hours === '6am12pm' ? 'highlighted' : ''
                  }`}
                  htmlFor="6am12pm"
                >
                  6AM - 12PM
                  <input
                    id="6am12pm"
                    type="radio"
                    name="time"
                    value="6am12pm"
                    checked={hours === '6am12pm'}
                    onChange={(e) => setHours(e.target.value)}
                  />
                </label>
                <label
                  className={`option ${
                    hours === '12pm6pm' ? 'highlighted' : ''
                  }`}
                  htmlFor="12pm6pm"
                >
                  12PM - 6PM
                  <input
                    id="12pm6pm"
                    type="radio"
                    name="time"
                    value="12pm6pm"
                    checked={hours === '12pm6pm'}
                    onChange={(e) => setHours(e.target.value)}
                  />
                </label>
                <label
                  className={`option ${
                    hours === '6pm12am' ? 'highlighted' : ''
                  }`}
                  htmlFor="6pm12am"
                >
                  6PM - 12AM
                  <input
                    id="6pm12am"
                    type="radio"
                    name="time"
                    value="6pm12am"
                    checked={hours === '6pm12am'}
                    onChange={(e) => setHours(e.target.value)}
                  />
                </label>
              </div>
            </div>
            <div className="buttons">
              <button className="btn" onClick={(e) => resetForm(e)}>
                Reset
              </button>
              <button className="btn">Calculate</button>
            </div>
          </form>
        </div>

        {results && (
          <div>
            <Results
              B1rateA={B1rateA}
              B1rateB={B1rateB}
              B2rateA={B2rateA}
              B2rateB={B2rateB}
            />
            <Info info={info} />
          </div>
        )}
      </div>

      <div className="signature">
        <h6>Created by Shisan Nafiz</h6>
      </div>
    </div>
  );
};

export default App;
