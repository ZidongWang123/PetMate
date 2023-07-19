import { TextField } from "@mui/material";
import { darkGray } from "../../../constant/actionTypes";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

const InputTextArea = ({ initialValue, onInputChange, onEmojiClick }) => {
  const handleChange = (event) => {
    const newValue = event.target.value;

    onInputChange(newValue);
  };
  const handleEmojiButtonClick = (emoji) => {
    onEmojiClick(emoji);
  };

  return (
    <TextField
      id="outlined-multiline-static"
      multiline
      rows={10}
      value={initialValue}
      onChange={handleChange}
      placeholder="your intro"
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
          fontFamily: "'Ubuntu', sans-serif",
          fontSize: "20px",
          fontWeight: "bold",
          color: darkGray,
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
                justifyContent: "flex-start",
                marginRight: "-450px",
              }}
            >
              <IconButton
                variant="outlined"
                color="neutral"
                onClick={() => handleEmojiButtonClick("👍")}
              >
                👍
              </IconButton>
              <IconButton
                variant="outlined"
                color="neutral"
                onClick={() => handleEmojiButtonClick("🤭")}
              >
                🤭
              </IconButton>
              <IconButton
                variant="outlined"
                color="neutral"
                onClick={() => handleEmojiButtonClick("🐇")}
              >
                🐇
              </IconButton>
              <IconButton
                variant="outlined"
                color="neutral"
                onClick={() => handleEmojiButtonClick("🐈")}
              >
                🐈
              </IconButton>
              <IconButton
                variant="outlined"
                color="neutral"
                onClick={() => handleEmojiButtonClick("🦮")}
              >
                🦮
              </IconButton>
              <IconButton
                variant="outlined"
                color="neutral"
                onClick={() => handleEmojiButtonClick("🌓")}
              >
                🌓
              </IconButton>
              <IconButton
                variant="outlined"
                color="neutral"
                onClick={() => handleEmojiButtonClick("🐕‍🦺")}
              >
                🐕‍🦺
              </IconButton>
              <IconButton
                variant="outlined"
                color="neutral"
                onClick={() => handleEmojiButtonClick("🥳")}
              >
                🥳
              </IconButton>
              <IconButton
                variant="outlined"
                color="neutral"
                onClick={() => handleEmojiButtonClick("🤩")}
              >
                🤩
              </IconButton>
              <IconButton
                variant="outlined"
                color="neutral"
                onClick={() => handleEmojiButtonClick("🛒")}
              >
                🛒
              </IconButton>
              <IconButton
                variant="outlined"
                color="neutral"
                onClick={() => handleEmojiButtonClick("😇")}
              >
                😇
              </IconButton>
              <IconButton
                variant="outlined"
                color="neutral"
                onClick={() => handleEmojiButtonClick("😎")}
              >
                😎
              </IconButton>
              <IconButton
                variant="outlined"
                color="neutral"
                onClick={() => handleEmojiButtonClick("🫶")}
              >
                🫶
              </IconButton>
              <IconButton
                variant="outlined"
                color="neutral"
                onClick={() => handleEmojiButtonClick("🌞‍")}
              >
                🌞
              </IconButton>
              <IconButton
                variant="outlined"
                color="neutral"
                onClick={() => handleEmojiButtonClick("💥‍")}
              >
                💥
              </IconButton>
              <IconButton
                variant="outlined"
                color="neutral"
                onClick={() => handleEmojiButtonClick("🦔‍")}
              >
                🦔
              </IconButton>
            </Box>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default InputTextArea;
