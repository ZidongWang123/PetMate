import * as React from "react";

import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import PetsTwoToneIcon from "@mui/icons-material/PetsTwoTone";
import TravelExploreTwoToneIcon from "@mui/icons-material/TravelExploreTwoTone";
import { darkPurple, orange } from "../../../../constant/actionTypes";

const filter = createFilterOptions();

export default function SearchBar() {
  const [value, setValue] = React.useState(null);

  return (
    <div
      className="searchBar"
      style={{ display: "flex", alignItems: "center" }}
    >
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setValue({
              tag: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setValue({
              tag: newValue.inputValue,
            });
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some(
            (option) => inputValue === option.tag
          );
          if (inputValue !== "" && !isExisting) {
            filtered.push({
              inputValue,
              tag: (
                <>
                  {`"${inputValue}"`}
                  {"                "}
                  <TravelExploreTwoToneIcon />
                </>
              ),
            });
          }

          return filtered;
        }}
        selectOnFocus //帮助用户清除选择的值。
        clearOnBlur //帮助用户输入新值。
        /* handleHomeEndKeys */
        id="free-solo-with-text-demo"
        options={recommendedTag}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.tag;
        }}
        renderOption={(props, option) => (
          <li {...props}>
            <div>
              <PetsTwoToneIcon />
              {"                "}
              {option.tag}
            </div>
          </li>
        )}
        sx={{
          // 向右移动
          marginLeft: 5,
          marginTop: 5,
          marginBottom:"5px",
          backgroundColor: "transparent",
          borderRadius: "100px",
          minWidth: 700,
          maxWidth: 800,
          boxShadow: "1px 1px 3px 3px rgba(0, 0, 0, 0.1)",
        }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Search everything!" />
        )}
      />

      <TravelExploreTwoToneIcon
        variant="contained"
        sx={{ marginTop: 5, marginLeft: 2, fontSize: 50, color: orange }}
      />
    </div>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const recommendedTag = [
  { tag: "MunichDog" },
  { tag: "petlovers" },
  { tag: "catlover" },
  { tag: "catsforlife" },
  { tag: "catslifestyle" },

  { tag: "dogselfie" },
  { tag: "catsuit" },
  { tag: "caturdaynight" },
  { tag: "catphotoshoot" },
  { tag: "catvibes" },
];
