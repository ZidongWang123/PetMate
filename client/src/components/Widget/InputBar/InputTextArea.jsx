import React, { useState } from "react";
import { TextField, Grid } from "@mui/material";
import { darkPurple } from "../../../constant/actionTypes";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
/* import { Box as JoyBox } from "@mui/joy";
import Textarea from "@mui/joy/Textarea";
import { IconButton as JoyIconButton } from "@mui/joy";
import { Typography as JoyTypography } from "@mui/joy";
 */
const InputTextArea = ({ initialValue, onInputChange }) => {
  const [value, setValue] = useState(initialValue);
  const addEmoji = (emoji) => () => {
    setValue((prevValue) => prevValue + emoji);
  };

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    onInputChange(newValue);
  };

  return (
    /*     <Grid
      item
      xs={12}
      sx={{
        borderRadius: "100px",
        backgroundColor: "transparent",
        boxShadow: "0 2px 2px rgba(0, 0, 0, 0.1)",
        width: "100%",
        minWidth: 300,
        marginTop: "10px",
      }}
    > */

    <TextField
      id="outlined-multiline-static"
      multiline
      rows={10}
      defaultValue={initialValue}
      value={value}
      onChange={handleChange}
      sx={{
        borderRadius: "35px",

        backgroundColor: "white",
        boxShadow: "0 2px 2px rgba(0, 0, 0, 0.1)",
        width: "100%",
        minWidth: 300,
        marginTop: "10px",
      }}
      InputProps={{
        sx: {
          fontFamily: "Comic Sans MS",
          fontSize: "16px",
          fontWeight: "bold",
          color: darkPurple,
        },
        endAdornment: (
          <InputAdornment position="end">
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 0.5,
                width: "80%",
                justifyContent: "flex-end",
                marginRight: "-300px",
              }}
            >
              <IconButton
                variant="outlined"
                color="neutral"
                onClick={addEmoji("👍")}
              >
                👍
              </IconButton>
              <IconButton
                variant="outlined"
                color="neutral"
                onClick={addEmoji("🤭")}
              >
                🤭
              </IconButton>
              <IconButton
                variant="outlined"
                color="neutral"
                onClick={addEmoji("🐇")}
              >
                🐇
              </IconButton>
              <IconButton
                variant="outlined"
                color="neutral"
                onClick={addEmoji("🐈")}
              >
                🐈
              </IconButton>
              <IconButton
                variant="outlined"
                color="neutral"
                onClick={addEmoji("🦮")}
              >
                🦮
              </IconButton>
              <IconButton
                variant="outlined"
                color="neutral"
                onClick={addEmoji("🏞")}
              >
                🏞
              </IconButton>
              <IconButton
                variant="outlined"
                color="neutral"
                onClick={addEmoji("🐕‍🦺")}
              >
                🐕‍🦺
              </IconButton>
              <IconButton
                variant="outlined"
                color="neutral"
                onClick={addEmoji("🥳")}
              >
                🥳
              </IconButton>
              <IconButton
                variant="outlined"
                color="neutral"
                onClick={addEmoji("🤩")}
              >
                🤩
              </IconButton>
              <IconButton
                variant="outlined"
                color="neutral"
                onClick={addEmoji("🛒")}
              >
                🛒
              </IconButton>
            </Box>
          </InputAdornment>
        ),
      }}
    />
    /*     <Box sx={{ p: 2 }}>
      <Textarea
        placeholder="Type in here…"
        defaultValue="Try to put text longer than 4 lines."
        minRows={2}
        maxRows={4}
      />
    </Box> */

    /* <Textarea
      placeholder="Type in here…"
      value="default value"
      onChange={handleChange}
      minRows={2}
      maxRows={4}
      startDecorator={
        <JoyBox sx={{ display: "flex", gap: 0.5 }}>
          <JoyIconButton
            variant="outlined"
            color="neutral"
            onClick={addEmoji("👍")}
          >
            👍
          </JoyIconButton>
          <JoyIconButton
            variant="outlined"
            color="neutral"
            onClick={addEmoji("🏖")}
          >
            🏖
          </JoyIconButton>
          <JoyIconButton
            variant="outlined"
            color="neutral"
            onClick={addEmoji("😍")}
          >
            😍
          </JoyIconButton>
        </JoyBox>
      }
      endDecorator={
        <JoyTypography level="body3" sx={{ ml: "auto" }}>
          {/* {value.length} character(s) 
        </JoyTypography>
      }
      sx={{ minWidth: 300 }}
    /> */
  );
};

export default InputTextArea;
