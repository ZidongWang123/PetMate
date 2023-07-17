import * as React from "react";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";

export default function SearchBar({ results=[], searchPost }) {
  const [value, setValue] = React.useState(null);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost(value);
    }
  };

  const handleSearch = () => {
    searchPost(value);
  };

  return (
    <div
      className="searchBar"
      style={{ display: "flex", alignItems: "center" }}
    >
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setValue(newValue);
          } else {
            setValue(newValue);
          }
        }}
        clearOnBlur //帮助用户输入新值。
        options={results}
        getOptionLabel={(option) => {
          return option;
        }}
        sx={{
          // 向右移动
          marginLeft: 5,
          marginTop: 3,
          backgroundColor: "white",
          borderRadius: "100px",
          minWidth: 800,
          maxWidth: 900,
          boxShadow: "0 5px 5px rgba(0, 0, 0, 0.1)",
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            value={value}
            onKeyDown={handleKeyPress}
            onChange={(e) => setValue(e.target.value)}
            InputProps={{
              ...params.InputProps, //显示下拉框
              placeholder: "Search everything!",
              startAdornment: (
                <>
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                  {params.InputProps.startAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </div>
  );
}
