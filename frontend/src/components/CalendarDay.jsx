import React from "react";

const CalendarDay = ({ events }) => {
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
      <h1 className={`text-center bg-indigo-100 text-indigo-700 text-xl p-3`}>
        {events[0].days.name}
      </h1>
      <div
        className={`border border-2 border-gray-50 h-full grid grid-cols-${events.length} gap-1`}
        style={{ gridTemplateRows: "repeat(11, minmax(50px, 15px))" }}
      >
        {events.map((event) => {
          return (
            <div
              className={"bg-indigo-200 border border-indigo-500"}
              style={{
                gridRow: `span ${getSpanGridRow(event)} / span ${getSpanGridRow(
                  event
                )}`,
                gridRowStart: getSpanGridStart(event),
              }}
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
