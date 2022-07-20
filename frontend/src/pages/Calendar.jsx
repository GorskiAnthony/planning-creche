import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout.jsx";
import api from "../services/api";
import CalendarDay from "../components/CalendarDay.jsx";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [sortBy, setSortBy] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get("/calendars");
      setEvents(response.data.events);
      setLoading(false);
    }
    fetchData();
  }, []);

  events.sort((a, b) => {
    return a.dayId - b.dayId;
  });

  return (
    <Layout>
      <h1>Calendar</h1>
      <div className="grid grid-cols-5">
        {loading ? (
          <div>Loading...</div>
        ) : (
          events.map((event) => {
            return (
              <CalendarDay
                key={event.id}
                name={`${event.employee.firstname} - ${event.employee.lastname}`}
                weekDay={event.days.name}
                timeStart={event.timeStart}
                timeEnd={event.timeEnd}
              />
            );
          })
        )}
      </div>
    </Layout>
  );
};
export default Calendar;
