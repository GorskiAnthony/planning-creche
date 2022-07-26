import React from "react";
import CalendarDay from "@components/CalendarDay";

const CalendarWeek = ({ events }) => {
  return (
    <>
      {events.map((event, id) => {
        return <CalendarDay key={id} events={event} />;
      })}
    </>
  );
};

export default CalendarWeek;
