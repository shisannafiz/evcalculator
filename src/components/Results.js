import React from 'react';
import Rate from './Rate';

const Results = ({ B1rateA, B2rateA, B1rateB, B2rateB }) => {
  return (
    <div className="results">
      <Rate rate="Rate A" noEV={B1rateA} withEV={B2rateA} />
      <Rate rate="Rate B" noEV={B1rateB} withEV={B2rateB} />
    </div>
  );
};

export default Results;
