import React from "react";
import { getSpanGridRow, getSpanGridStart } from "@services/gridSpan";

const CalendarDay = ({ events }) => {
  return (
    <div className="mr-0.5">
      <h1 className="text-center bg-gray-700 text-white text-xl p-3">
        {events[0].days.name}
      </h1>
      <div
        className={`border border-2 border-indigo-100 h-full grid grid-cols-${
          events.length - 1
        } gap-1`}
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
