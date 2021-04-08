import React from 'react';

const Info = ({ info }) => {
  return (
    <div className="info">
      {info && <h4>You are currently on the cheapest rate.</h4>}
      {!info && (
        <h4>
          You are currently not on the cheapest option, we suggest switching
          rates for a lower bill.
        </h4>
      )}
    </div>
  );
};

export default Info;
