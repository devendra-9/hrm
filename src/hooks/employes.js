import { useState, useEffect } from "react";

// const BASE_URL = "http://localhost:8000/employees";
const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/employees`;
const ATTENDANCE_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/attendance`;

export const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [attendanceMap, setAttendanceMap] = useState({});
  const [attendanceSummary, setAttendanceSummary] = useState(null);

  // =========================
  //  EMPLOYEE APIs
  // =========================

  // ✅ GET ALL
  const getAllEmployees = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/allUser`);
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ GET BY ID
  const getEmployeeById = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`);
      return await res.json();
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ CREATE
  const createEmployee = async (payload) => {
    try {
      const res = await fetch(`${BASE_URL}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      await getAllEmployees();
      return data;
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ UPDATE
  const updateEmployee = async (id, payload) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      await getAllEmployees(); // refresh list
      return data;
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ DELETE
  const deleteEmployee = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/delete/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      await getAllEmployees(); // refresh list
      return data;
    } catch (err) {
      setError(err.message);
    }
  };

  // =========================
  // ✅ ATTENDANCE APIs
  // =========================

  const markAttendance = async (payload) => {
    try {
      setLoading(true);
      const res = await fetch(`${ATTENDANCE_BASE_URL}/mark`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      return await res.json();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getDailySummary = async (attendanceDate) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${ATTENDANCE_BASE_URL}/summary/${attendanceDate}`,
      );

      const data = await res.json();
      setAttendanceSummary(data);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getAttendanceByDate = async (attendanceDate) => {
  try {
    setLoading(true);

    const res = await fetch(
      `${ATTENDANCE_BASE_URL}/by-date/${attendanceDate}`
    );

    const data = await res.json();

    setAttendanceMap(data);

    return data;
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    getAllEmployees();
    getDailySummary(today);
    getAttendanceByDate(today)
  }, []);

  return {
    employees,
    loading,
    error,
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    markAttendance,
    getDailySummary,
    attendanceSummary,
    getAttendanceByDate,
    attendanceMap          
  };
};
