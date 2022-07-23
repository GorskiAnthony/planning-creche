import React, { useEffect, useState } from "react";
import Layout from "@/layout/Layout.jsx";
import api from "@services/api";
import CalendarDay from "@components/CalendarDay.jsx";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get("/calendars");
      const size = response.data.calendar.length;
      if (size === 0) {
        setEvents([]);
        setLoading(false);
      } else {
        for (let i = 0; i < 5; i++) {
          const weekday = [];
          // add user dayId into array
          for (let j = 0; j < size; j++) {
            if (response.data.calendar[j].dayId === i + 1) {
              weekday.push(response.data.calendar[j]);
            }
          }
          setEvents((prevEvents) => [...prevEvents, weekday]);
        }
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl mb-3">Calendrier</h1>
      <div className="grid grid-cols-1 md:grid-cols-5">
        {loading ? (
          <div>Loading...</div>
        ) : events.length === 0 ? (
          <div>Aucun événement</div>
        ) : (
          events.map((event, id) => {
            if (event.length === 0) {
              return null;
            }
            return <CalendarDay key={id} events={event} />;
          })
        )}
      </div>
    </Layout>
  );
};
export default Calendar;
