import React from "react";

const CalendarDay = ({ events }) => {
  console.log(events);

  const getSpanGridRow = (event) => {
    const start = parseInt(event.timeStart.split(":")[0]);
    const end = parseInt(event.timeEnd.split(":")[0]);
    return end - start;
  };

  const getSpanGridStart = (event) => {
    const start = parseInt(event.timeStart.split(":")[0]);
    return start - 6;
  };

  return (
    <div>
      <h1 className="text-center bg-indigo-100 text-indigo-700 text-xl p-3">
        {events[0].days.name}
      </h1>
      <div
        className="border border-2 border-gray-50 h-full grid grid-cols-4"
        style={{ gridTemplateRows: "repeat(11, minmax(50px, 15px))" }}
      >
        {events.map((event) => {
          return (
            <div
              className={`w-12 bg-indigo-200 border border-indigo-500 row-span-${getSpanGridRow(
                event
              )} row-start-${getSpanGridStart(event)}`}
              key={event.id}
            >
              <p className="text-xs text-indigo-900">
                {event.employee.firstname}
              </p>
              <p className="text-xs text-indigo-900">
                {event.timeStart} - {event.timeEnd}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarDay;
