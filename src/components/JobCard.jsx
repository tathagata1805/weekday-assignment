import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Fade,
  Modal,
  Backdrop,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function JobCard({ jobData }) {
  const getInitials = (name) => name.charAt(0).toUpperCase();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const capitalizeFirstLetter = (string) => {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
  };

  const gradientTextStyle = {
    background:
      "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    height: "6.0em",
    lineHeight: "1.2em",
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: "16px",
        boxShadow: "0 3px 5px 2px rgba(0, 0, 0, 0.12)",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          boxShadow: "0 8px 16px 2px rgba(0,0,0,0.3)",
          transform: "scale(1.05)",
        },
        mb: 2,
        ml: 2,
      }}
    >
      <CardContent>
        <Card
          sx={{
            display: "flex",
            alignItems: "left",
            maxWidth: 150,
            borderRadius: "12px",
            boxShadow: "0 1px 1px 1px rgba(0, 0, 0, 0.12)",
            mb: 2,
            ml: 2,
            p: 0.5,
          }}
        >
          <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
          <Typography variant="body2" color="text.secondary">
            Posted 6 days ago
          </Typography>
        </Card>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Box
            sx={{
              width: 40,
              height: 60,
              bgcolor: "primary.main",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "0%",
            }}
          >
            {getInitials(jobData.jobRole)}
          </Box>
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {capitalizeFirstLetter(jobData.companyName) || "Company Name"}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: "medium" }}>
              {capitalizeFirstLetter(jobData.jobRole) || "Job Title"}
            </Typography>
            <Typography color="text.secondary">
              {capitalizeFirstLetter(jobData.location) || "Location"}
            </Typography>
          </Box>
        </Box>
        <Typography sx={{ mb: 2 }}>
          Estimated Salary:{" "}
          {jobData.minJdSalary
            ? `₹${jobData.minJdSalary} - ₹${jobData.maxJdSalary} LPA`
            : "x"}
        </Typography>
        <Typography sx={{ fontWeight: "bold", mb: 2 }}>
          About Company:
        </Typography>
        <Typography variant="body2" style={gradientTextStyle}>
          {jobData.jobDetailsFromCompany.substring(0, 300)}
        </Typography>
        <Button
          variant="text"
          color="primary"
          sx={{
            mt: 1,
            width: "100%",
            justifyContent: "center",
            textTransform: "none",
          }}
          onClick={handleOpen}
        >
          Show more
        </Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={modalStyle}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                align="center"
              >
                Job Description
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                {jobData.jobDetailsFromCompany}
              </Typography>
            </Box>
          </Fade>
        </Modal>
        <Typography sx={{ mb: 2 }}>
          Minimum Experience: {jobData.minExp || "x"} years
        </Typography>
        <Button
          variant="contained"
          fullWidth
          sx={{
            mb: 1,
            textTransform: "none",
            backgroundColor: "#4CAF50",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#45A045",
            },
          }}
        >
          Easy Apply
        </Button>
        <Button
          variant="contained"
          fullWidth
          sx={{
            textTransform: "none",
            backgroundColor: "#191970",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#00008B",
            },
          }}
        >
          Unlock Referral Asks
        </Button>
      </CardContent>
    </Card>
  );
}

export default JobCard;
