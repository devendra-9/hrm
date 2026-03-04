import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import AddEmployee from "../../pages/addEmployee";

const Header = ({ createEmployee }) => {
  const [modal, setModal] = useState(false);
  const handleAddEmployee = () => {
    setModal(true);
  };
  return (
    <>
      <AppBar position="sticky" elevation={3}>
        <Toolbar>
          {/* Left Side - Site Name */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            HRMS Lite
          </Typography>

          {/* Right Side - Add Employee Button */}
          <Box>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
              onClick={handleAddEmployee}
            >
              Add New Employee
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {modal && (
        <AddEmployee setModal={setModal} createEmployee={createEmployee} />
      )}
    </>
  );
};

export default Header;
