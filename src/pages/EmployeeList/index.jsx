import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Chip,
  Dialog,
  DialogContent,
  TextField,
  Button,
  Grid,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Fade,
  Tabs,
  Tab,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// import PhoneOutlinedIcon from "@mui/icons-form/PhoneOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PhoneOutlinedIconMUI from "@mui/icons-material/PhoneOutlined";
import { useEmployees } from "../../hooks/employes";

// const DUMMY_EMPLOYEES = [
//   {
//     _id: 1,
//     first_name: "Arjun",
//     last_name: "Sharma",
//     email: "arjun@company.com",
//     phone: "9876543210",
//     department: "Engineering",
//     position: "Frontend Dev",
//     avatar: "AS",
//   },
//   {
//     _id: 2,
//     first_name: "Priya",
//     last_name: "Mehta",
//     email: "priya@company.com",
//     phone: "9123456789",
//     department: "Design",
//     position: "UI/UX Lead",
//     avatar: "PM",
//   },
//   {
//     _id: 3,
//     first_name: "Rohan",
//     last_name: "Verma",
//     email: "rohan@company.com",
//     phone: "9988776655",
//     department: "Marketing",
//     position: "Growth Manager",
//     avatar: "RV",
//   },
//   {
//     _id: 4,
//     first_name: "Sneha",
//     last_name: "Patel",
//     email: "sneha@company.com",
//     phone: "9871234560",
//     department: "HR",
//     position: "HR Executive",
//     avatar: "SP",
//   },
//   {
//     _id: 5,
//     first_name: "Karan",
//     last_name: "Singh",
//     email: "karan@company.com",
//     phone: "9001234567",
//     department: "Engineering",
//     position: "Backend Dev",
//     avatar: "KS",
//   },
// ];

const DEPT_COLORS = {
  Engineering: { bg: "#eff6ff", text: "#1d4ed8", dot: "#3b82f6" },
  Design: { bg: "#fdf4ff", text: "#7e22ce", dot: "#a855f7" },
  Marketing: { bg: "#fff7ed", text: "#c2410c", dot: "#f97316" },
  HR: { bg: "#f0fdf4", text: "#15803d", dot: "#22c55e" },
  default: { bg: "#f8fafc", text: "#475569", dot: "#94a3b8" },
};

const avatarColors = ["#0f3460", "#533483", "#c2410c", "#15803d", "#1d4ed8"];

const fieldStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    background: "#fafafa",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.92rem",
    "& fieldset": { borderColor: "#e8e8ef", borderWidth: "1.5px" },
    "&:hover fieldset": { borderColor: "#c0c0d8" },
    "&.Mui-focused fieldset": { borderColor: "#0f3460", borderWidth: "2px" },
    "&.Mui-focused": {
      background: "#fff",
      boxShadow: "0 0 0 4px rgba(15,52,96,0.07)",
    },
  },
  "& .MuiInputLabel-root": {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.88rem",
    color: "#9999b0",
    "&.Mui-focused": { color: "#0f3460" },
  },
};

// ── Shared employee row for list display ──────────────────────
const EmpRow = ({ emp, i, actions }) => {
  const dept = DEPT_COLORS[emp.department] || DEPT_COLORS.default;
  const color = avatarColors[emp.id % avatarColors.length];
  return (
    <TableRow
      className="emp-row"
      sx={{
        animationDelay: `${i * 0.05}s`,
        borderBottom: "1px solid #f0f0f8",
        transition: "background 0.2s ease",
      }}
    >
      <TableCell sx={{ border: "none", py: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.8 }}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              background: color,
              fontFamily: "'DM Sans',sans-serif",
              fontWeight: 600,
              fontSize: "0.85rem",
            }}
          >
            {emp.first_name[0].toUpperCase() + emp.last_name[0].toUpperCase()}
          </Avatar>
          <Box>
            <Typography
              sx={{
                fontFamily: "'DM Sans',sans-serif",
                fontWeight: 600,
                fontSize: "0.9rem",
                color: "#1a1a2e",
              }}
            >
              {emp.first_name} {emp.last_name}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell sx={{ border: "none" }}>
        <Typography
          sx={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: "0.82rem",
            color: "#555",
          }}
        >
          {emp.email}
        </Typography>
        <Typography
          sx={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: "0.78rem",
            color: "#aaa",
            mt: 0.2,
          }}
        >
          {emp.phone_number}
        </Typography>
      </TableCell>
      <TableCell sx={{ border: "none" }}>
        <Chip
          label={emp.department}
          size="small"
          sx={{
            background: dept.bg,
            color: dept.text,
            fontFamily: "'DM Sans',sans-serif",
            fontWeight: 600,
            fontSize: "0.75rem",
            border: `1px solid ${dept.dot}30`,
          }}
        />
      </TableCell>
      <TableCell sx={{ border: "none" }}>
        <Typography
          sx={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: "0.85rem",
            color: "#444",
          }}
        >
          {emp.position}
        </Typography>
      </TableCell>
      {actions && <TableCell sx={{ border: "none" }}>{actions}</TableCell>}
    </TableRow>
  );
};

// ── View Modal ────────────────────────────────────────────────
const ViewModal = ({ emp, onClose }) => {
  const color = avatarColors[emp.id % avatarColors.length];
  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 24px 60px rgba(0,0,0,0.12)",
        },
      }}
    >
      <Box
        sx={{
          height: "4px",
          background: "linear-gradient(90deg,#1a1a2e,#0f3460,#533483)",
        }}
      />
      <DialogContent sx={{ p: 0 }}>
        <Box
          sx={{
            px: 4,
            pt: 4,
            pb: 3,
            borderBottom: "1px solid #f0f0f5",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Avatar
              sx={{
                width: 56,
                height: 56,
                background: color,
                fontFamily: "'DM Sans',sans-serif",
                fontWeight: 600,
                fontSize: "1.1rem",
              }}
            >
              {emp.first_name[0].toUpperCase() + emp.last_name[0].toUpperCase()}
            </Avatar>
            <Box>
              <Typography
                sx={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "1.3rem",
                  fontWeight: 500,
                  color: "#0d0d1a",
                }}
              >
                {emp.first_name} {emp.last_name}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: "0.8rem",
                  color: "#888",
                  mt: 0.2,
                }}
              >
                {emp.position}
              </Typography>
            </Box>
          </Box>
          <IconButton
            onClick={onClose}
            sx={{
              background: "#f5f5f7",
              borderRadius: "10px",
              width: 34,
              height: 34,
            }}
          >
            <CloseIcon sx={{ fontSize: "1rem" }} />
          </IconButton>
        </Box>
        <Box
          sx={{
            px: 4,
            py: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {[
            { icon: <EmailOutlinedIcon />, label: "Email", val: emp.email },
            {
              icon: <PhoneOutlinedIconMUI />,
              label: "Phone",
              val: emp.phone_number,
            },
            {
              icon: <BusinessOutlinedIcon />,
              label: "Department",
              val: emp.department,
            },
            { icon: <WorkOutlineIcon />, label: "Position", val: emp.position },
          ].map((row) => (
            <Box
              key={row.label}
              sx={{ display: "flex", alignItems: "center", gap: 2 }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                  background: "#f0f2ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#0f3460",
                  flexShrink: 0,
                }}
              >
                {React.cloneElement(row.icon, { sx: { fontSize: "1rem" } })}
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: "0.7rem",
                    color: "#aaa",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {row.label}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: "0.9rem",
                    color: "#1a1a2e",
                    fontWeight: 500,
                  }}
                >
                  {row.val}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

// ── Edit Modal ────────────────────────────────────────────────
const EditModal = ({ emp, onClose, onSave }) => {
  const [form, setForm] = useState({ ...emp });
  const fields = [
    { name: "first_name", label: "First Name", icon: <PersonOutlineIcon /> },
    { name: "last_name", label: "Last Name", icon: <PersonOutlineIcon /> },
    {
      name: "email",
      label: "Email Address",
      icon: <EmailOutlinedIcon />,
      type: "email",
    },
    {
      name: "phone_number",
      label: "Phone Number",
      icon: <PhoneOutlinedIconMUI />,
    },
    { name: "department", label: "Department", icon: <BusinessOutlinedIcon /> },
    { name: "position", label: "Position", icon: <WorkOutlineIcon /> },
  ];
  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 24px 60px rgba(0,0,0,0.12)",
        },
      }}
    >
      <Box
        sx={{
          height: "4px",
          background: "linear-gradient(90deg,#1a1a2e,#0f3460,#533483)",
        }}
      />
      <DialogContent sx={{ p: 0 }}>
        <Box
          sx={{
            px: 4.5,
            pt: 4,
            pb: 3,
            borderBottom: "1px solid #f0f0f5",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "0.68rem",
                fontWeight: 500,
                letterSpacing: "0.18em",
                color: "#0f3460",
                textTransform: "uppercase",
                opacity: 0.75,
                mb: 0.5,
              }}
            >
              Edit Record
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "1.7rem",
                fontWeight: 500,
                color: "#0d0d1a",
              }}
            >
              Update Employee
            </Typography>
          </Box>
          <IconButton
            onClick={onClose}
            sx={{
              background: "#f5f5f7",
              borderRadius: "10px",
              width: 36,
              height: 36,
            }}
          >
            <CloseIcon sx={{ fontSize: "1rem" }} />
          </IconButton>
        </Box>
        <Box sx={{ px: 4.5, pt: 3, pb: 4 }}>
          <Grid container spacing={2}>
            {fields.map((f) => (
              <Grid item xs={12} key={f.name}>
                <TextField
                  label={f.label}
                  name={f.name}
                  value={form[f.name]}
                  onChange={(e) =>
                    setForm({ ...form, [e.target.name]: e.target.value })
                  }
                  fullWidth
                  size="medium"
                  type={f.type || "text"}
                  sx={fieldStyle}
                  InputProps={{
                    startAdornment: (
                      <Box sx={{ mr: 1, display: "flex", color: "#b0b0c8" }}>
                        {React.cloneElement(f.icon, {
                          sx: { fontSize: "1rem" },
                        })}
                      </Box>
                    ),
                  }}
                />
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              mt: 3.5,
              display: "flex",
              gap: 2,
              justifyContent: "flex-end",
            }}
          >
            <Button
              onClick={onClose}
              sx={{
                fontFamily: "'DM Sans',sans-serif",
                textTransform: "none",
                background: "#f5f5f7",
                color: "#555",
                borderRadius: "10px",
                px: 3,
                py: 1.3,
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onSave(form);
                onClose();
              }}
              variant="contained"
              disableElevation
              sx={{
                fontFamily: "'DM Sans',sans-serif",
                textTransform: "none",
                background: "linear-gradient(120deg,#1a1a2e,#0f3460)",
                borderRadius: "10px",
                px: 3.5,
                py: 1.3,
                boxShadow: "0 4px 16px rgba(15,52,96,0.2)",
              }}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

// ── Attendance Modal (with analytics) ────────────────────────
const AttendanceModal = ({ emp, attendance, onMark, onClose }) => {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const empAtt = attendance[emp._id] || {};
  const status = empAtt[selectedDate];

  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split("T")[0];
  }).reverse();

  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 24px 60px rgba(0,0,0,0.12)",
        },
      }}
    >
      <Box
        sx={{
          height: "4px",
          background: "linear-gradient(90deg,#15803d,#22c55e,#15803d)",
        }}
      />
      <DialogContent sx={{ p: 0 }}>
        <Box
          sx={{
            px: 4.5,
            pt: 4,
            pb: 3,
            borderBottom: "1px solid #f0f0f5",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "0.68rem",
                fontWeight: 500,
                letterSpacing: "0.18em",
                color: "#15803d",
                textTransform: "uppercase",
                opacity: 0.8,
                mb: 0.5,
              }}
            >
              Attendance
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "1.7rem",
                fontWeight: 500,
                color: "#0d0d1a",
              }}
            >
              {emp.first_name} {emp.last_name}
            </Typography>
          </Box>
          <IconButton
            onClick={onClose}
            sx={{
              background: "#f5f5f7",
              borderRadius: "10px",
              width: 36,
              height: 36,
            }}
          >
            <CloseIcon sx={{ fontSize: "1rem" }} />
          </IconButton>
        </Box>
        <Box sx={{ px: 4.5, pt: 3.5, pb: 4 }}>
          <Typography
            sx={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              color: "#888",
              textTransform: "uppercase",
              mb: 1.2,
            }}
          >
            Select Date
          </Typography>
          <TextField
            type="date"
            value={selectedDate}
            fullWidth
            size="small"
            onChange={(e) => setSelectedDate(e.target.value)}
            inputProps={{ max: today }}
            sx={{ ...fieldStyle, mb: 3 }}
          />

          <Typography
            sx={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              color: "#888",
              textTransform: "uppercase",
              mb: 1.5,
            }}
          >
            Mark Attendance
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mb: 3.5 }}>
            {["present", "absent"].map((s) => (
              <Button
                key={s}
                onClick={() => onMark(emp._id, selectedDate, s)}
                fullWidth
                startIcon={
                  s === "present" ? (
                    <CheckCircleOutlineIcon />
                  ) : (
                    <CancelOutlinedIcon />
                  )
                }
                sx={{
                  fontFamily: "'DM Sans',sans-serif",
                  textTransform: "none",
                  fontWeight: 500,
                  borderRadius: "12px",
                  py: 1.5,
                  fontSize: "0.9rem",
                  background:
                    status === s
                      ? s === "present"
                        ? "#f0fdf4"
                        : "#fff5f5"
                      : "#fafafa",
                  color:
                    status === s
                      ? s === "present"
                        ? "#15803d"
                        : "#dc2626"
                      : "#555",
                  border: `2px solid ${status === s ? (s === "present" ? "#22c55e" : "#f87171") : "#e8e8ef"}`,
                  "&:hover": {
                    background: s === "present" ? "#f0fdf4" : "#fff5f5",
                    borderColor: s === "present" ? "#22c55e" : "#f87171",
                    color: s === "present" ? "#15803d" : "#dc2626",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </Button>
            ))}
          </Box>

          <Typography
            sx={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              color: "#888",
              textTransform: "uppercase",
              mb: 1.5,
            }}
          >
            Last 7 Days
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {last7.map((d) => {
              const s = empAtt[d];
              const label = new Date(d + "T00:00:00").toLocaleDateString(
                "en-IN",
                { weekday: "short", day: "numeric" },
              );
              return (
                <Box
                  key={d}
                  onClick={() => setSelectedDate(d)}
                  sx={{
                    flex: 1,
                    minWidth: "60px",
                    textAlign: "center",
                    py: 1.2,
                    px: 0.5,
                    borderRadius: "10px",
                    cursor: "pointer",
                    background:
                      s === "present"
                        ? "#f0fdf4"
                        : s === "absent"
                          ? "#fff5f5"
                          : "#f8f8f8",
                    border: `1.5px solid ${s === "present" ? "#22c55e" : s === "absent" ? "#f87171" : "#e8e8ef"}`,
                    outline: selectedDate === d ? "2px solid #0f3460" : "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: "0.65rem",
                      color: "#aaa",
                      mb: 0.4,
                    }}
                  >
                    {label}
                  </Typography>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      mx: "auto",
                      background:
                        s === "present"
                          ? "#22c55e"
                          : s === "absent"
                            ? "#ef4444"
                            : "#d1d5db",
                    }}
                  />
                </Box>
              );
            })}
          </Box>

          {status && (
            <Fade in>
              <Box
                sx={{
                  mt: 3,
                  px: 3,
                  py: 1.8,
                  borderRadius: "12px",
                  textAlign: "center",
                  background: status === "present" ? "#f0fdf4" : "#fff5f5",
                  border: `1px solid ${status === "present" ? "#bbf7d0" : "#fecaca"}`,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontWeight: 600,
                    fontSize: "0.88rem",
                    color: status === "present" ? "#15803d" : "#dc2626",
                  }}
                >
                  {status === "present"
                    ? "✓ Marked Present"
                    : "✗ Marked Absent"}{" "}
                  on{" "}
                  {new Date(selectedDate + "T00:00:00").toLocaleDateString(
                    "en-IN",
                    { day: "numeric", month: "short", year: "numeric" },
                  )}
                </Typography>
              </Box>
            </Fade>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

// ── Attendance Analytics Panel ────────────────────────────────
const AttendanceAnalytics = ({
  employees = [],
  attendance = {},
  date,
  setDate
}) => {
 const today = new Date().toISOString().split("T")[0];
  const [filter, setFilter] = useState("all"); // all | present | absent | unmarked

  const getStatus = (empId) => attendance[empId];

  const presentList = employees.filter((e) => getStatus(e._id) === "present");
  const absentList = employees.filter((e) => getStatus(e._id) === "absent");
  const unmarkedList = employees.filter((e) => !getStatus(e._id));

  const displayList =
    filter === "present"
      ? presentList
      : filter === "absent"
        ? absentList
        : filter === "unmarked"
          ? unmarkedList
          : employees;

  const StatCard = ({ label, count, color, bg, border, onClick, active }) => (
    <Box
      onClick={onClick}
      sx={{
        flex: 1,
        borderRadius: "14px",
        px: 2.5,
        py: 2,
        cursor: "pointer",
        background: active ? bg : "#fff",
        border: `1.5px solid ${active ? border : "#ebebf5"}`,
        transition: "all 0.2s ease",
        boxShadow: active
          ? `0 4px 16px ${border}40`
          : "0 2px 8px rgba(0,0,0,0.04)",
        "&:hover": {
          background: bg,
          border: `1.5px solid ${border}`,
          boxShadow: `0 4px 16px ${border}40`,
          transform: "translateY(-2px)",
        },
      }}
    >
      <Typography
        sx={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: "0.68rem",
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: active ? color : "#aaa",
          mb: 0.5,
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontFamily: "'Playfair Display',serif",
          fontSize: "2rem",
          fontWeight: 500,
          color: active ? color : "#1a1a2e",
          lineHeight: 1,
        }}
      >
        {count}
      </Typography>
    </Box>
  );

  return (
    <Box>
      {/* Date selector + title */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              color: "#15803d",
              textTransform: "uppercase",
              mb: 0.4,
            }}
          >
            Attendance Overview
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "1.5rem",
              fontWeight: 500,
              color: "#0d0d1a",
            }}
          >
            {new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </Typography>
        </Box>
        <TextField
          type="date"
          value={date}
          size="small"
          onChange={(e) => {
            setDate(e.target.value);
            setFilter("all");
          }}
          inputProps={{ max: today }}
          sx={{
            ...fieldStyle,
            width: 180,
            "& .MuiOutlinedInput-root": {
              ...fieldStyle["& .MuiOutlinedInput-root"],
              background: "#fff",
            },
          }}
        />
      </Box>

      {/* Stat Cards */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <StatCard
          label="Total"
          count={employees.length}
          color="#0f3460"
          bg="#eff6ff"
          border="#3b82f6"
          onClick={() => setFilter("all")}
          active={filter === "all"}
        />
        <StatCard
          label="Present"
          count={presentList.length}
          color="#15803d"
          bg="#f0fdf4"
          border="#22c55e"
          onClick={() => setFilter(filter === "present" ? "all" : "present")}
          active={filter === "present"}
        />
        <StatCard
          label="Absent"
          count={absentList.length}
          color="#dc2626"
          bg="#fff5f5"
          border="#f87171"
          onClick={() => setFilter(filter === "absent" ? "all" : "absent")}
          active={filter === "absent"}
        />
        <StatCard
          label="Unmarked"
          count={unmarkedList.length}
          color="#92400e"
          bg="#fffbeb"
          border="#fbbf24"
          onClick={() => setFilter(filter === "unmarked" ? "all" : "unmarked")}
          active={filter === "unmarked"}
        />
      </Box>

      {/* Progress bar */}
      {employees.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", mb: 0.8 }}
          >
            <Typography
              sx={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "0.75rem",
                color: "#888",
              }}
            >
              Attendance Rate
            </Typography>
            <Typography
              sx={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#15803d",
              }}
            >
              {employees.length
                ? Math.round((presentList.length / employees.length) * 100)
                : 0}
              %
            </Typography>
          </Box>
          <Box
            sx={{
              height: 8,
              borderRadius: 4,
              background: "#f0f0f8",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                height: "100%",
                borderRadius: 4,
                background: "linear-gradient(90deg,#15803d,#22c55e)",
                width: `${employees.length ? (presentList.length / employees.length) * 100 : 0}%`,
                transition: "width 0.6s ease",
              }}
            />
          </Box>
        </Box>
      )}

      {/* Filter label */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1.5,
        }}
      >
        <Typography
          sx={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: "0.78rem",
            fontWeight: 600,
            color: "#555",
          }}
        >
          {filter === "all"
            ? "All Employees"
            : filter === "present"
              ? "✓ Present Employees"
              : filter === "absent"
                ? "✗ Absent Employees"
                : "⚬ Unmarked Employees"}
          <Box component="span" sx={{ ml: 1, fontWeight: 400, color: "#aaa" }}>
            ({displayList.length})
          </Box>
        </Typography>
        {filter !== "all" && (
          <Button
            size="small"
            onClick={() => setFilter("all")}
            startIcon={<ArrowBackIcon sx={{ fontSize: "0.8rem !important" }} />}
            sx={{
              fontFamily: "'DM Sans',sans-serif",
              textTransform: "none",
              fontSize: "0.75rem",
              color: "#888",
              "&:hover": { color: "#0f3460" },
            }}
          >
            Show All
          </Button>
        )}
      </Box>

      {/* Employee list for selected filter */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: "14px",
          border: "1px solid #ebebf5",
          overflow: "hidden",
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow
              sx={{
                background:
                  filter === "present"
                    ? "linear-gradient(135deg,#14532d,#15803d)"
                    : filter === "absent"
                      ? "linear-gradient(135deg,#7f1d1d,#dc2626)"
                      : "linear-gradient(135deg,#1a1a2e,#0f3460)",
              }}
            >
              {["Employee", "Department", "Position", "Status"].map((h) => (
                <TableCell
                  key={h}
                  sx={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontWeight: 600,
                    fontSize: "0.68rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.75)",
                    border: "none",
                    py: 1.5,
                  }}
                >
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayList.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  align="center"
                  sx={{
                    py: 4,
                    fontFamily: "'DM Sans',sans-serif",
                    color: "#bbb",
                    fontSize: "0.85rem",
                    border: "none",
                  }}
                >
                  No employees in this category for the selected date.
                </TableCell>
              </TableRow>
            ) : (
              displayList.map((emp, i) => {
                const dept = DEPT_COLORS[emp.department] || DEPT_COLORS.default;
                const color = avatarColors[emp.id % avatarColors.length];
                const s = getStatus(emp._id);
                return (
                  <TableRow
                    key={emp._id}
                    className="emp-row"
                    sx={{
                      animationDelay: `${i * 0.04}s`,
                      borderBottom: "1px solid #f5f5fb",
                      "&:hover": { background: "#fafbff" },
                    }}
                  >
                    <TableCell sx={{ border: "none", py: 1.5 }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                      >
                        <Avatar
                          sx={{
                            width: 34,
                            height: 34,
                            background: color,
                            fontFamily: "'DM Sans',sans-serif",
                            fontWeight: 600,
                            fontSize: "0.75rem",
                          }}
                        >
                          {emp.first_name[0].toUpperCase() +
                            emp.last_name[0].toUpperCase()}
                        </Avatar>
                        <Typography
                          sx={{
                            fontFamily: "'DM Sans',sans-serif",
                            fontWeight: 600,
                            fontSize: "0.85rem",
                            color: "#1a1a2e",
                          }}
                        >
                          {emp.first_name} {emp.last_name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>
                      <Chip
                        label={emp.department}
                        size="small"
                        sx={{
                          background: dept.bg,
                          color: dept.text,
                          fontFamily: "'DM Sans',sans-serif",
                          fontWeight: 600,
                          fontSize: "0.7rem",
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>
                      <Typography
                        sx={{
                          fontFamily: "'DM Sans',sans-serif",
                          fontSize: "0.82rem",
                          color: "#555",
                        }}
                      >
                        {emp.position}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>
                      <Chip
                        size="small"
                        label={
                          s === "present"
                            ? "Present"
                            : s === "absent"
                              ? "Absent"
                              : "Unmarked"
                        }
                        sx={{
                          fontFamily: "'DM Sans',sans-serif",
                          fontWeight: 600,
                          fontSize: "0.72rem",
                          background:
                            s === "present"
                              ? "#f0fdf4"
                              : s === "absent"
                                ? "#fff5f5"
                                : "#f8f8f8",
                          color:
                            s === "present"
                              ? "#15803d"
                              : s === "absent"
                                ? "#dc2626"
                                : "#aaa",
                          border: `1px solid ${s === "present" ? "#bbf7d0" : s === "absent" ? "#fecaca" : "#e5e7eb"}`,
                        }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

// ── Main EmployeeList ─────────────────────────────────────────
const EmployeeList = ({
  employees,
  deleteEmployee,
  updateEmployee,
  markAttendance,
  getDailySummary,
  attendanceSummary,
  attendanceMap,
  getAttendanceByDate,
}) => {
  // const [attendance, setAttendance] = useState({});
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [viewEmp, setViewEmp] = useState(null);
  const [editEmp, setEditEmp] = useState(null);
  const [attendEmp, setAttendEmp] = useState(null);
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);

  const filtered = employees.filter((e) =>
    `${e.first_name} ${e.last_name} ${e.department} ${e.position}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const handleDelete = async (id) => {
    await deleteEmployee(id);
  };

  const handleSave = async (updated) => {
    const payload = {
      first_name: updated.first_name,
      last_name: updated.last_name,
      email: updated.email,
      phone_number: Number(updated.phone_number),
      department: updated.department,
      position: updated.position,
    };

    await updateEmployee(updated._id, payload);
  };

  const handleMark = async (empId, date, status) => {
    await markAttendance({
      employee_id: empId,
      date,
      status,
    });

    await getDailySummary(date);
    await getAttendanceByDate(date);
  };

  useEffect(() => {
    if (activeTab === 1) {
      const today = new Date().toISOString().split("T")[0];
      getDailySummary(today);
    }
  }, [activeTab]);

  useEffect(() => {
    getAttendanceByDate(selectedDate);
  }, [selectedDate]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes rowFade { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .emp-row { animation: rowFade 0.35s ease both; }
        .action-btn { transition: all 0.2s ease !important; }
        .action-btn:hover { transform: translateY(-2px) scale(1.1) !important; }
      `}</style>

      <Box
        sx={{
          px: { xs: 2, md: 5 },
          py: 4,
          background: "#f7f8fc",
          minHeight: "100vh",
        }}
      >
        {/* Page Header */}
        <Box
          sx={{
            mb: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                color: "#0f3460",
                textTransform: "uppercase",
                mb: 0.5,
              }}
            >
              Team Directory
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "2rem",
                fontWeight: 500,
                color: "#0d0d1a",
                lineHeight: 1.1,
              }}
            >
              Employee Manager
            </Typography>
          </Box>
          <Chip
            label={`${employees.length} Members`}
            sx={{
              fontFamily: "'DM Sans',sans-serif",
              background: "#eff6ff",
              color: "#1d4ed8",
              fontWeight: 600,
              fontSize: "0.8rem",
              border: "1px solid #bfdbfe",
            }}
          />
        </Box>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          sx={{
            mb: 3,
            borderBottom: "1px solid #ebebf5",
            "& .MuiTab-root": {
              fontFamily: "'DM Sans',sans-serif",
              textTransform: "none",
              fontWeight: 500,
              fontSize: "0.88rem",
              color: "#888",
            },
            "& .Mui-selected": { color: "#0f3460 !important", fontWeight: 600 },
            "& .MuiTabs-indicator": {
              background: "#0f3460",
              borderRadius: "4px",
            },
          }}
        >
          <Tab label="👥  All Employees" />
          <Tab label="📅  Attendance Analytics" />
        </Tabs>

        {/* Tab 1 — Employee Table */}
        {activeTab === 0 && (
          <Fade in>
            <Box>
              <Box sx={{ mb: 3 }}>
                <TextField
                  placeholder="Search by name, department or position…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  size="small"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon
                          sx={{ color: "#b0b0c8", fontSize: "1.1rem" }}
                        />
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: "12px",
                      fontFamily: "'DM Sans',sans-serif",
                      background: "#fff",
                      fontSize: "0.9rem",
                    },
                  }}
                  sx={{
                    maxWidth: 420,
                    "& .MuiOutlinedInput-root fieldset": {
                      borderColor: "#e8e8ef",
                    },
                    "& .MuiOutlinedInput-root:hover fieldset": {
                      borderColor: "#c0c0d8",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                      borderColor: "#0f3460",
                    },
                  }}
                />
              </Box>

              <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                  borderRadius: "18px",
                  border: "1px solid #ebebf5",
                  overflow: "hidden",
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow
                      sx={{
                        background: "linear-gradient(135deg,#1a1a2e,#0f3460)",
                      }}
                    >
                      {[
                        "Employee",
                        "Contact",
                        "Department",
                        "Position",
                        "Actions",
                      ].map((h) => (
                        <TableCell
                          key={h}
                          sx={{
                            fontFamily: "'DM Sans',sans-serif",
                            fontWeight: 600,
                            fontSize: "0.72rem",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.75)",
                            border: "none",
                            py: 2,
                          }}
                        >
                          {h}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filtered.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          align="center"
                          sx={{
                            py: 6,
                            fontFamily: "'DM Sans',sans-serif",
                            color: "#aaa",
                            border: "none",
                          }}
                        >
                          No employees found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filtered.map((emp, i) => {
                        const dept =
                          DEPT_COLORS[emp.department] || DEPT_COLORS.default;
                        const color =
                          avatarColors[emp.id % avatarColors.length];
                        return (
                          <TableRow
                            key={emp._id}
                            className="emp-row"
                            sx={{
                              animationDelay: `${i * 0.05}s`,
                              borderBottom: "1px solid #f0f0f8",
                              transition: "background 0.2s ease",
                              "&:hover": { background: "#fafbff" },
                            }}
                          >
                            <TableCell sx={{ border: "none", py: 2 }}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1.8,
                                }}
                              >
                                <Avatar
                                  sx={{
                                    width: 40,
                                    height: 40,
                                    background: color,
                                    fontFamily: "'DM Sans',sans-serif",
                                    fontWeight: 600,
                                    fontSize: "0.85rem",
                                  }}
                                >
                                  {emp.first_name[0].toUpperCase() +
                                    emp.last_name[0].toUpperCase()}
                                </Avatar>
                                <Typography
                                  sx={{
                                    fontFamily: "'DM Sans',sans-serif",
                                    fontWeight: 600,
                                    fontSize: "0.9rem",
                                    color: "#1a1a2e",
                                  }}
                                >
                                  {emp.first_name} {emp.last_name}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell sx={{ border: "none" }}>
                              <Typography
                                sx={{
                                  fontFamily: "'DM Sans',sans-serif",
                                  fontSize: "0.82rem",
                                  color: "#555",
                                }}
                              >
                                {emp.email}
                              </Typography>
                              <Typography
                                sx={{
                                  fontFamily: "'DM Sans',sans-serif",
                                  fontSize: "0.78rem",
                                  color: "#aaa",
                                  mt: 0.2,
                                }}
                              >
                                {emp.phone_number}
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ border: "none" }}>
                              <Chip
                                label={emp.department}
                                size="small"
                                sx={{
                                  background: dept.bg,
                                  color: dept.text,
                                  fontFamily: "'DM Sans',sans-serif",
                                  fontWeight: 600,
                                  fontSize: "0.75rem",
                                  border: `1px solid ${dept.dot}30`,
                                }}
                              />
                            </TableCell>
                            <TableCell sx={{ border: "none" }}>
                              <Typography
                                sx={{
                                  fontFamily: "'DM Sans',sans-serif",
                                  fontSize: "0.85rem",
                                  color: "#444",
                                }}
                              >
                                {emp.position}
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ border: "none" }}>
                              <Box sx={{ display: "flex", gap: 0.8 }}>
                                <Tooltip title="View" arrow>
                                  <IconButton
                                    className="action-btn"
                                    onClick={() => setViewEmp(emp)}
                                    size="small"
                                    sx={{
                                      background: "#eff6ff",
                                      color: "#1d4ed8",
                                      borderRadius: "8px",
                                      width: 32,
                                      height: 32,
                                    }}
                                  >
                                    <VisibilityOutlinedIcon
                                      sx={{ fontSize: "0.95rem" }}
                                    />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Edit" arrow>
                                  <IconButton
                                    className="action-btn"
                                    onClick={() => setEditEmp(emp)}
                                    size="small"
                                    sx={{
                                      background: "#fdf4ff",
                                      color: "#7e22ce",
                                      borderRadius: "8px",
                                      width: 32,
                                      height: 32,
                                    }}
                                  >
                                    <EditOutlinedIcon
                                      sx={{ fontSize: "0.95rem" }}
                                    />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Attendance" arrow>
                                  <IconButton
                                    className="action-btn"
                                    onClick={() => setAttendEmp(emp)}
                                    size="small"
                                    sx={{
                                      background: "#f0fdf4",
                                      color: "#15803d",
                                      borderRadius: "8px",
                                      width: 32,
                                      height: 32,
                                    }}
                                  >
                                    <CalendarMonthOutlinedIcon
                                      sx={{ fontSize: "0.95rem" }}
                                    />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete" arrow>
                                  <IconButton
                                    className="action-btn"
                                    onClick={() => handleDelete(emp._id)}
                                    size="small"
                                    sx={{
                                      background: "#fff5f5",
                                      color: "#dc2626",
                                      borderRadius: "8px",
                                      width: 32,
                                      height: 32,
                                    }}
                                  >
                                    <DeleteOutlineIcon
                                      sx={{ fontSize: "0.95rem" }}
                                    />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Fade>
        )}

        {/* Tab 2 — Attendance Analytics */}
        {activeTab === 1 && (
          <Fade in>
            <Box>
              <AttendanceAnalytics
                employees={employees}
                attendance={attendanceMap}
                date={selectedDate}
                setDate={setSelectedDate}
              />
            </Box>
          </Fade>
        )}
      </Box>

      {viewEmp && <ViewModal emp={viewEmp} onClose={() => setViewEmp(null)} />}
      {editEmp && (
        <EditModal
          emp={editEmp}
          onClose={() => setEditEmp(null)}
          onSave={handleSave}
        />
      )}
      {attendEmp && (
        <AttendanceModal
          emp={attendEmp}
          attendance={attendanceMap}
          onMark={handleMark}
          onClose={() => setAttendEmp(null)}
        />
      )}
    </>
  );
};

export default EmployeeList;
