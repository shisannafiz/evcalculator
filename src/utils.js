//Calculates the total home bill for Rate A with load profile data
export const homeBillRateA = (LP) => {
  let totalPrice = 0;
  LP.forEach((hour) => {
    const { 'Electricity:Facility [kWh](Hourly)': electricity } = hour;
    totalPrice += electricity * 0.15;
  });
  return totalPrice;
};

//Calculates the total home bill for Rate B with load profile data
export const homeBillRateB = (LP) => {
  let totalPrice = 0;
  LP.forEach((hour) => {
    const {
      'Date/Time': dateTime,
      'Electricity:Facility [kWh](Hourly)': electricity,
    } = hour;
    const timeHour = JSON.stringify(dateTime).substring(9, 11);
    if (timeHour >= 13 && timeHour <= 18) {
      totalPrice += electricity * 0.2;
    } else {
      totalPrice += electricity * 0.08;
    }
  });
  return totalPrice;
};

//Calculates total bill for EV for Rate A with electricity consumption per mile driven
export const evBillRateA = (miles) => {
  return miles * 0.3 * 0.15;
};

//Calculates total bill for EV for Rate B with electricity consumption per mile driven
export const evBillRateB = (miles, hours) => {
  if (hours === '12pm6pm') {
    return miles * 0.3 * 0.2;
  } else {
    return miles * 0.3 * 0.08;
  }
};

//Checks if the current rate is the cheapest
export const compareRates = (rate, B2A, B2B) => {
  if (rate === 'Rate A') {
    return B2A < B2B ? true : false;
  } else if (rate === 'Rate B') {
    return B2B < B2A ? true : false;
  }
};

//Adds commas to numbers
export const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
