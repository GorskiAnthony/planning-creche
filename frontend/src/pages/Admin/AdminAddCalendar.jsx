import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "@/layout/Layout.jsx";
import Breadcrumbs from "@components/Breadcrumbs.jsx";
import api from "@services/api.js";
import Select from "@components/Select.jsx";
import times from "@services/times.js";
import { success } from "@services/toast.js";

const AdminAddCalendar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [days, setDays] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [currentCalendar, setCurrentCalendar] = useState({
    day: "",
    timeStart: "07:00",
    timeEnd: "13:00",
    employeeId: "",
  });

  useEffect(() => {
    Promise.all([api.get("/users"), api.get(`/days`)]).then(([users, days]) => {
      setDays(days.data.days);
      setEmployees(users.data.users);
      setCurrentCalendar({
        ...currentCalendar,
        employeeId: users.data.users[0].firstname,
        day: days.data.days[0].name,
      });
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const getDayId = days.find((day) => day.name === currentCalendar.day).id;
    const getEmployeeId = employees.find(
      (employee) => employee.firstname === currentCalendar.employeeId
    ).id;
    api
      .post(`/calendars`, {
        day: getDayId,
        timeStart: currentCalendar.timeStart,
        timeEnd: currentCalendar.timeEnd,
        employeeId: getEmployeeId,
      })
      .then(() => {
        success(
          `😎 le planning de ${currentCalendar.employeeId} a bien été ajouté`
        );
        navigate(`/admin`);
      })
      .catch(() => {
        error("❌ Une erreur est survenue");
      });

    console.log({ getDayId, getEmployeeId });
    //!TODO
  };

  const handleChange = (data) => {
    //! TODO: get new Date from data
    setCurrentCalendar({
      ...currentCalendar,
      ...data,
    });
  };

  console.log(currentCalendar);
  return (
    <Layout>
      <Breadcrumbs breadcrumbs={"Ajouter un planning"} />
      <div className="mt-10">
        <div className="sm:flex sm:items-center my-4">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              Assigner un planning
            </h1>
          </div>
        </div>
        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <div className="text-lg font-medium leading-6 text-gray-900"></div>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={handleSubmit}>
                <div className="shadow sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="timeStart"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Employée
                        </label>
                        <Select
                          datas={employees}
                          initialData={currentCalendar.employeeId}
                          handleChange={handleChange}
                          name="employeeId"
                          target="firstname"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="timeEnd"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Journée
                        </label>
                        <Select
                          datas={days}
                          initialData={currentCalendar.day}
                          handleChange={handleChange}
                          name="day"
                          target="name"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="timeStart"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Début de journée
                        </label>
                        <Select
                          datas={times}
                          initialData={currentCalendar.timeStart}
                          handleChange={handleChange}
                          name="timeStart"
                          target="value"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="timeEnd"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Fin de journée
                        </label>
                        <Select
                          datas={times}
                          initialData={currentCalendar.timeEnd}
                          handleChange={handleChange}
                          name="timeEnd"
                          target="value"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminAddCalendar;
