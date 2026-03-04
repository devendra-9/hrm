import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  IconButton,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { useEmployees } from "../../hooks/employes";
import { useToast } from "../../components/toast/toast";

const fields = [
  {
    name: "firstName",
    label: "First Name",
    icon: <PersonOutlineIcon />,
    xs: 12,
  },
  { name: "lastName", label: "Last Name", icon: <PersonOutlineIcon />, xs: 12 },
  {
    name: "email",
    label: "Email Address",
    icon: <EmailOutlinedIcon />,
    xs: 12,
    type: "email",
  },
  { name: "phone", label: "Phone Number", icon: <PhoneOutlinedIcon />, xs: 12 },
  {
    name: "department",
    label: "Department",
    icon: <BusinessOutlinedIcon />,
    xs: 12,
  },
  { name: "position", label: "Position", icon: <WorkOutlineIcon />, xs: 12 },
];

const AddEmployee = ({ setModal, createEmployee }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    position: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    position: "",
  });
  const [focused, setFocused] = useState("");
  // const { createEmployee } = useEmployees();

  // const handleChange = (e) =>
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow only numbers for phone
    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "");
      setFormData({ ...formData, phone: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setErrors({ ...errors, [name]: "" });
  };

  const handleClose = () => setModal(false);

  const { showToast } = useToast();

const handleSubmit = async () => {
  let newErrors = {};

  // Required field validation
  if (!formData.firstName.trim()) {
    newErrors.firstName = "First name is required";
  }

  if (!formData.lastName.trim()) {
    newErrors.lastName = "Last name is required";
  }

  if (!formData.email.trim()) {
    newErrors.email = "Email is required";
  }

  if (!formData.phone.trim()) {
    newErrors.phone = "Phone number is required";
  }

  if (!formData.department.trim()) {
    newErrors.department = "Department is required";
  }

  if (!formData.position.trim()) {
    newErrors.position = "Position is required";
  }

  // Email format validation (only if email exists)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (formData.email && !emailRegex.test(formData.email)) {
    newErrors.email = "Please enter a valid email address";
  }

  // Phone validation (only if phone exists)
  if (formData.phone && formData.phone.length !== 10) {
    newErrors.phone = "Phone number must be exactly 10 digits";
  }

  // Stop if there are errors
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  // If everything valid
  const payload = {
    first_name: formData.firstName,
    last_name: formData.lastName,
    email: formData.email,
    phone_number: Number(formData.phone),
    department: formData.department,
    position: formData.position,
  };

  await createEmployee(payload);

  showToast("Employee created successfully 🎉", "success");
  setModal(false);
};

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes backdropFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalRise {
          from { opacity: 0; transform: translateY(24px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fieldFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes lineGrow {
          from { width: 0; opacity: 0; }
          to { width: 56px; opacity: 1; }
        }
        @keyframes shimmerSlide {
          0% { background-position: -300% center; }
          100% { background-position: 300% center; }
        }

        .modal-paper {
          animation: modalRise 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .field-animate { animation: fieldFadeIn 0.4s ease both; }
        .f1 { animation-delay: 0.08s; }
        .f2 { animation-delay: 0.13s; }
        .f3 { animation-delay: 0.18s; }
        .f4 { animation-delay: 0.23s; }
        .f5 { animation-delay: 0.28s; }
        .f6 { animation-delay: 0.33s; }

        .accent-bar { animation: lineGrow 0.6s 0.2s cubic-bezier(0.16,1,0.3,1) both; }

        .submit-btn {
          background: linear-gradient(120deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #1a1a2e 100%);
          background-size: 250% auto;
          transition: background-position 0.7s ease, transform 0.2s ease, box-shadow 0.3s ease !important;
        }
        .submit-btn:hover {
          background-position: right center;
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(15,52,96,0.3) !important;
        }
        .submit-btn:active { transform: translateY(0); }

        .cancel-btn {
          transition: all 0.25s ease !important;
        }
        .cancel-btn:hover {
          background: #f5f5f7 !important;
          transform: translateY(-1px);
        }

        .close-icon-btn {
          transition: all 0.25s ease !important;
        }
        .close-icon-btn:hover {
          background: #f0f0f0 !important;
          transform: rotate(90deg) scale(1.1);
        }

        .premium-input .MuiOutlinedInput-root {
          border-radius: 12px !important;
          background: #fafafa !important;
          font-family: 'DM Sans', sans-serif !important;
          font-size: 0.95rem !important;
          color: #1a1a2e !important;
          transition: all 0.25s ease !important;
        }
        .premium-input .MuiOutlinedInput-root fieldset {
          border-color: #e8e8ef !important;
          border-width: 1.5px !important;
          transition: all 0.25s ease !important;
        }
        .premium-input .MuiOutlinedInput-root:hover fieldset {
          border-color: #c0c0d8 !important;
        }
        .premium-input .MuiOutlinedInput-root.Mui-focused {
          background: #fff !important;
          box-shadow: 0 0 0 4px rgba(15,52,96,0.07) !important;
        }
        .premium-input .MuiOutlinedInput-root.Mui-focused fieldset {
          border-color: #0f3460 !important;
          border-width: 2px !important;
        }
        .premium-input .MuiInputLabel-root {
          font-family: 'DM Sans', sans-serif !important;
          font-size: 0.88rem !important;
          color: #9999b0 !important;
          letter-spacing: 0.02em !important;
        }
        .premium-input .MuiInputLabel-root.Mui-focused {
          color: #0f3460 !important;
        }
        .premium-input .MuiInputAdornment-root svg {
          font-size: 1rem !important;
          color: #b0b0c8 !important;
          transition: color 0.25s ease !important;
        }
        .premium-input .MuiOutlinedInput-root.Mui-focused .MuiInputAdornment-root svg {
          color: #0f3460 !important;
        }
      `}</style>

      <Dialog
        open={true}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          className: "modal-paper",
          sx: {
            background: "#ffffff",
            borderRadius: "24px",
            boxShadow:
              "0 24px 80px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.06)",
            overflow: "hidden",
            border: "1px solid rgba(0,0,0,0.06)",
            m: 2,
          },
        }}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "rgba(10,10,20,0.45)",
              backdropFilter: "blur(6px)",
              animation: "backdropFade 0.3s ease",
            },
          },
        }}
      >
        {/* Top accent strip */}
        <Box
          sx={{
            height: "4px",
            background:
              "linear-gradient(90deg, #1a1a2e, #0f3460, #533483, #0f3460, #1a1a2e)",
            backgroundSize: "200% auto",
          }}
        />

        <DialogContent sx={{ p: 0 }}>
          {/* Header */}
          <Box
            sx={{
              px: 4.5,
              pt: 4,
              pb: 3.5,
              borderBottom: "1px solid #f0f0f5",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.8 }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #0f3460, #533483)",
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.7rem",
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    color: "#0f3460",
                    textTransform: "uppercase",
                    opacity: 0.75,
                  }}
                >
                  Team Directory
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "2rem",
                  fontWeight: 500,
                  color: "#0d0d1a",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                }}
              >
                Add New Employee
              </Typography>

              <Box
                className="accent-bar"
                sx={{
                  mt: 1.5,
                  height: "3px",
                  borderRadius: "4px",
                  background: "linear-gradient(90deg, #0f3460, #533483)",
                }}
              />
            </Box>

            <IconButton
              className="close-icon-btn"
              onClick={handleClose}
              sx={{
                color: "#888",
                width: 38,
                height: 38,
                background: "#f5f5f7",
                borderRadius: "12px",
                mt: 0.5,
              }}
            >
              <CloseIcon sx={{ fontSize: "1.1rem" }} />
            </IconButton>
          </Box>

          {/* Form Body */}
          <Box sx={{ px: 4.5, pt: 3.5, pb: 4.5 }}>
            <Grid container spacing={1.5} sx={{ width: "100%", margin: 0 }}>
              {fields.map((field, i) => (
                <Grid
                  item
                  xs={12}
                  key={field.name}
                  className={`field-animate f${i + 1}`}
                  sx={{
                    width: "100%",
                    paddingLeft: "0 !important",
                    paddingTop: "5px",
                  }}
                >
                  <TextField
                    // label={field.label}
                    // name={field.name}
                    // value={formData[field.name]}
                    // onChange={handleChange}
                    // onFocus={() => setFocused(field.name)}
                    // onBlur={() => setFocused("")}
                    // fullWidth
                    // size="medium"
                    // type={field.type || "text"}
                    // className="premium-input"
                    label={field.label}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    fullWidth
                    size="medium"
                    type={field.type || "text"}
                    className="premium-input"
                    error={Boolean(errors[field.name])}
                    helperText={errors[field.name] || ""}
                    InputProps={{
                      startAdornment: (
                        <Box
                          sx={{ mr: 1, display: "flex", alignItems: "center" }}
                        >
                          {React.cloneElement(field.icon, {
                            fontSize: "small",
                          })}
                        </Box>
                      ),
                    }}
                    sx={{ width: "100%" }}
                  />
                </Grid>
              ))}
            </Grid>

            {/* Info note */}
            <Box
              sx={{
                mt: 3.5,
                px: 2.5,
                py: 1.8,
                borderRadius: "12px",
                background: "linear-gradient(135deg, #f8f9ff, #f0f2ff)",
                border: "1px solid #e8eaf6",
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  flexShrink: 0,
                  background: "#0f3460",
                }}
              />
              <Typography
                sx={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.78rem",
                  color: "#5a5a7a",
                  lineHeight: 1.5,
                }}
              >
                New employee will receive an onboarding email upon registration.
              </Typography>
            </Box>

            {/* Divider */}
            <Box
              sx={{
                mt: 4,
                mb: 3,
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, #e8e8f0, transparent)",
              }}
            />

            {/* Actions */}
            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button
                className="cancel-btn"
                onClick={handleClose}
                sx={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  color: "#555",
                  background: "#f5f5f7",
                  border: "none",
                  borderRadius: "12px",
                  px: 3.5,
                  py: 1.4,
                  textTransform: "none",
                  boxShadow: "none",
                  "&:hover": { boxShadow: "none" },
                }}
              >
                Cancel
              </Button>

              <Button
                className="submit-btn"
                onClick={handleSubmit}
                variant="contained"
                disableElevation
                sx={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  color: "#fff",
                  borderRadius: "12px",
                  px: 4,
                  py: 1.4,
                  textTransform: "none",
                  boxShadow: "0 4px 16px rgba(15,52,96,0.2)",
                }}
              >
                Add Employee →
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddEmployee;
