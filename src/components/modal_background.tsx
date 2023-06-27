import Modal from "@material-ui/core/Modal";
import Box from "@mui/material/Box";
import React from "react";

const CustomModal = ({ modalOpen, handleCloseModal, logo_abera }) => {
  return (
    <Modal
      open={modalOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className="modal-p"
    >
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            display: "flex",
          }}
        >
          <img className="img-modal" src={logo_abera} alt="Logo" />
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;
