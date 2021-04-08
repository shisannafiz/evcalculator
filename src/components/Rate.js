import React from 'react';
import { numberWithCommas } from '../utils';

const Rate = ({ rate, noEV, withEV }) => {
  return (
    <div className="rate">
      <h2>{rate}</h2>
      <div className="bills">
        <h3>
          Annual Bill without EV: <span>${numberWithCommas(noEV)}</span>
        </h3>
        <h3>
          Annual Bill with EV: <span>${numberWithCommas(withEV)}</span>
        </h3>
      </div>
    </div>
  );
};

export default Rate;
