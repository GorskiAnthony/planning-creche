import React from "react";

const CalendarDay = ({ events }) => {
  const colors = ["cyan", "teal", "green", "orange", "red", "purple", "pink"];
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
      <h1 className={`text-center bg-gray-700 text-white text-xl p-3`}>
        {events[0].days.name}
      </h1>
      <div
        className={`border border-2 border-indigo-100 h-full grid grid-cols-${events.length} gap-1`}
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
              <div className="bg-indigo-600 py-3">
                <p className="text-xs text-white text-center">
                  👩‍🍼 {event.employee.firstname}
                </p>
                <p className="text-xs text-white text-center">
                  ⏱ {event.timeStart} - {event.timeEnd}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarDay;
