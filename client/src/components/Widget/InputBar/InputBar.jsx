import React, { useState } from "react";
import { TextField, Grid } from "@mui/material";
import { darkGray } from "../../../constant/actionTypes";

const InputBar = ({ initialValue, onInputChange }) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    onInputChange(newValue);
  };

  return (
    <Grid
      item
      xs={12}
      sx={{
        borderRadius: "100px",
        backgroundColor: "white",
        boxShadow: "0 2px 2px rgba(0, 0, 0, 0.1)",
        width: "100%",
        minWidth: 300,
        marginTop: "10px",
      }}
    >
      <TextField
        required
        fullWidth
        value={value}
        onChange={handleChange}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "100px",
            "& fieldset": {
              border: "none",
            },
          },
        }}
        InputProps={{
          sx: {
            fontSize: "20px",
            fontWeight: "bold",
            color: darkGray,
          },
        }}
      />
    </Grid>
  );
};

export default InputBar;
