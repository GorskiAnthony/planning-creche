import React from "react";
import { getSpanGridRow, getSpanGridStart } from "@services/gridSpan";

const CalendarDay = ({ events }) => {
  console.log({ events });
  return (
    <div className="mr-0.5">
      <h1 className="text-center bg-gray-700 text-white text-xl p-3">
        {events.days.name}
      </h1>
      <div
        className={`border border-2 border-indigo-100 h-full grid grid-cols-1 gap-1`}
        style={{ gridTemplateRows: "repeat(11, minmax(30px, 15px))" }}
      >
        <div
          className={"bg-indigo-200 border border-indigo-500"}
          style={{
            gridRow: `span ${getSpanGridRow(events)} / span ${getSpanGridRow(
              events
            )}`,
            gridRowStart: getSpanGridStart(events),
          }}
          key={events.id}
        >
          <div className="bg-indigo-600 py-3">
            <p className="text-xs text-white text-center">
              👩‍🍼 {events.employee.firstname}
            </p>
            <p className="text-xs text-white text-center">
              ⏱ {events.timeStart} - {events.timeEnd}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarDay;
