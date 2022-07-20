import React from "react";

const CalendarDay = ({ name, weekDay, timeStart, timeEnd }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-center">{name}</h2>
      <h3 className="text-center">{weekDay}</h3>
      <p className="text-center">
        {timeStart} - {timeEnd}
      </p>
    </div>
  );
};

export default CalendarDay;
