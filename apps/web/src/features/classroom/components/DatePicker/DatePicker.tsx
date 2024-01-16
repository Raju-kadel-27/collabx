import React, { useState } from "react";
import Date from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const DatePicker = () => {
  const [startDate, setStartDate] = React.useState(new Date());
  return (
    <Date selected={startDate} onChange={(date) => setStartDate(date)} />
  );
};