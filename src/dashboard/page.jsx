import React from "react";
import Header from "../components/header";
import EmployeeList from "../pages/EmployeeList";
import { useEmployees } from "../hooks/employes";

const Dashboard = () => {
  const employeeApi = useEmployees();

  return (
    <div>
      <Header createEmployee={employeeApi.createEmployee} />
      <EmployeeList
        employees={employeeApi.employees}
        deleteEmployee={employeeApi.deleteEmployee}
        updateEmployee={employeeApi.updateEmployee}
        markAttendance={employeeApi.markAttendance}
        getDailySummary={employeeApi.getDailySummary}
        attendanceSummary={employeeApi.attendanceSummary}
        getAttendanceByDate={employeeApi.getAttendanceByDate}
        attendanceMap={employeeApi.attendanceMap}
      />
    </div>
  );
};

export default Dashboard;
