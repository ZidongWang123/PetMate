import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Box, TextField } from "@mui/material";

import "./ConfirmDialog.css";

import { darkPurple, orange, brightGreen } from "../../../constant/actionTypes";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function Warning({
  text,
  pic,

  isOpen,
  onConfirm,
  onCancel,
  initialText,
  handleInputChange,
}) {
  const [inputText, setInputText] = React.useState(initialText);
  const handleChange = (event) => {
    setInputText(event.target.value);
    handleInputChange(event.target.value);
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <ErrorOutlineIcon sx={{ color: brightGreen, fontSize: 48 }} />
            <DialogContentText
              id="alert-dialog-description"
              sx={{
                fontFamily: "Comic Sans MS",
                textTransform: "none",
                fontSize: "30px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {text}
            </DialogContentText>
            <img src={pic} alt="Image" className="warning-image" />
            {initialText && (
              <TextField value={inputText} onChange={handleChange} />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onCancel}
            sx={{
              fontWeight: "bold",
              textTransform: "none",
              fontSize: "25px",
              color: darkPurple,
              borderRadius: "10px",
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={onConfirm}
            autoFocus
            sx={{
              fontWeight: "bold",
              textTransform: "none",
              fontSize: "25px",
              color: orange,
              borderRadius: "10px",
            }}
          >
            Sure
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
