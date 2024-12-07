import React from "react";
import { Snackbar, Alert as MuiAlert } from "@mui/material";

const CustomAlert = ({ open, message, type, onClose }) => {
  // Map severity types to RGBA colors with reduced opacity
  const backgroundColors = {
    success: "rgba(76, 175, 80, 0.5)", // Green with opacity
    error: "rgba(244, 67, 54, 0.5)", // Red with opacity
    warning: "rgba(255, 152, 0, 0.5)", // Orange with opacity
    info: "rgba(33, 150, 243, 0.5)", // Blue with opacity
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000} // Automatically hide after 3 seconds
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }} // Center the alert
    >
      <MuiAlert
        onClose={onClose}
        severity={type}
        sx={{
          width: "100%",
          maxWidth: "600px", // Set a max width for larger alerts
          fontSize: "1rem", // Increase font size
          marginTop: "15px",
          paddingRight: "155px", // Add more padding
          paddingLeft: "155px", // Add more padding
          backgroundColor: backgroundColors[type] || "rgba(255, 255, 255, 0.9)", // Dynamic background color
          "& .MuiAlert-icon": {
            fontSize: "1.5rem", // Increase the size of the icon
          },
        }}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default CustomAlert;
