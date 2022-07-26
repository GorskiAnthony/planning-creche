import React, { useEffect, useState } from "react";
import Layout from "@/layout/Layout.jsx";
import api from "@services/api";
import CalendarWeek from "@components/CalendarWeek.jsx";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get("/calendars");
      const weekday = [];
      const size = response.data.calendars.length;
      for (let i = 0; i < size / 5; i++) {
        const personnalWeekday = [];
        for (let j = 0; j < 5; j++) {
          if (response.data.calendars[i * 5 + j] !== undefined) {
            personnalWeekday.push(response.data.calendars[i * 5 + j]);
          } else {
            personnalWeekday.push({
              id: "",
              days: { name: "", id: "" },
              employee: { firstname: "", lastname: "", id: "" },
              timeStart: "",
              timeEnd: "",
            });
          }
        }
        personnalWeekday.sort((a, b) => {
          return a.dayId - b.dayId;
        });
        weekday.push(personnalWeekday);
      }
      setEvents(weekday);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <Layout>
      {loading ? (
        <div>Loading...</div>
      ) : events.length === 0 ? (
        <div>Aucun événement</div>
      ) : (
        events.map((event, id) => {
          return (
            <div key={id} className="py-8">
              <h1 className="text-2xl font-bold py-4">
                Planning de {event[0].employee.firstname}{" "}
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-5">
                <CalendarWeek key={id} events={event} />
              </div>
            </div>
          );
        })
      )}
    </Layout>
  );
};
export default Calendar;
