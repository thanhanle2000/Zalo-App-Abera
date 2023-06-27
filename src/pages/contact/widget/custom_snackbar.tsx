import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const CustomSnackbar = ({ open, handleClose, title }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MuiAlert
        onClose={handleClose}
        severity="success"
        elevation={6}
        variant="filled"
      >
        {title}
      </MuiAlert>
    </Snackbar>
  );
};

export default CustomSnackbar;
