import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "@/layout/Layout.jsx";
import Breadcrumbs from "@components/Breadcrumbs.jsx";
import api from "@services/api.js";
import Modal from "@components/Modal.jsx";
import { CalendarIcon } from "@heroicons/react/solid";
import Select from "@components/Select.jsx";
import times from "@services/times.js";
import { success, error } from "@services/toast.js";

const AdminEditCalendar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const [currentDate, setCurrentDate] = useState({
    day: "",
    timeStart: "",
    timeEnd: "",
    employeeId: "",
  });

  const toggleModal = () => {
    setModal((modal) => !modal);
  };

  useEffect(() => {
    api.get(`/calendars/${id}`).then((response) => {
      setCurrentDate({
        day: response.data.event.dayId,
        timeStart: response.data.event.timeStart,
        timeEnd: response.data.event.timeEnd,
        employeeId: response.data.event.employeeId,
      });
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .put(`/calendars/${id}`, currentDate)
      .then((response) => {
        success("Calendar updated successfully");
        navigate("/admin");
      })
      .catch((err) => {
        error(err.message);
      });
  };

  const handleChange = (data) => {
    //! TODO: get new Date from data
    setCurrentDate({ ...currentDate, ...data });
  };

  const handleDelete = () => {
    //! TODO: Delete calendar
  };

  return (
    <Layout>
      <Breadcrumbs breadcrumbs={"Modifier le planning"} />
      {modal && (
        <Modal
          isOpen={modal}
          toggleModal={toggleModal}
          handleDelete={handleDelete}
        />
      )}
      <div className="mt-10">
        <div className="sm:flex sm:items-center my-4">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              Modification du planning
            </h1>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              onClick={toggleModal}
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto"
            >
              <CalendarIcon className="w-5 h-5" />
            </button>
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
                          Début de journée
                        </label>
                        <Select
                          times={times}
                          initialTime={currentDate.timeStart}
                          handleChange={handleChange}
                          name="timeStart"
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
                          times={times}
                          initialTime={currentDate.timeEnd}
                          handleChange={handleChange}
                          name="timeEnd"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Modifier
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

export default AdminEditCalendar;
