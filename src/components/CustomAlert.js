import React from "react";
import { Snackbar, Alert as MuiAlert } from "@mui/material";

const CustomAlert = ({ open, message, type, onClose }) => {
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
          fontSize: "1.2rem", // Increase font size
          padding: "16px", // Add more padding
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
