import React from "react";
import { useState, useEffect } from "react";
/* import useAutocomplete from "@mui/base/useAutocomplete";
import CheckIcon from "@mui/icons-material/Check";

import {
  InputWrapper,
  StyledTag,
  Listbox,
  Label,
  Root,
} from "./inputTagBarStyle"; */

import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";

const InputTagBar = ({ initialValue, onInputChange = () => {} }) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [inputValue, setInputValue] = useState(initialValue);

  useEffect(() => {
    setInputValue(selectedValues.join(", "));
  }, [selectedValues, onInputChange]);

  const handleChange = (event, values) => {
    setSelectedValues(values);
    onInputChange(values);
    console.log(inputValue);
  };

  return (
    <div>
      <Autocomplete
        multiple
        id="tags-standard"
        options={possibleOptions}
        getOptionLabel={(option) => option}
        defaultValue={[]}
        value={initialValue} // 设置 Autocomplete 的值为输入值
        onChange={handleChange} // 处理输入值变化的函数
        renderInput={(params) => (
          <TextField
            {...params}
            /* label="Multiple values" */
            placeholder="your tags"
            value={initialValue} // 设置 TextField 的值为输入值
            onChange={(event) => setInputValue(event.target.value)}
          />
        )}
        sx={{
          backgroundColor: "white",
          borderRadius: "100px",
          minWidth: 800,
          maxWidth: 900,
          boxShadow: "0 5px 5px rgba(0, 0, 0, 0.1)",
        }}
      />
    </div>
  );
};
const possibleOptions = [
  "Munich",
  "LargeDog",
  "Bogenhausen",
  "Marienplatz",
  "DogFood",
  "CatFood",
  "CatLitter",
  "adopting",
  "lovelyfamily",
];
/* const possibleOptions = [
  { title: "Munich", id: 1 },
  { title: "LargeDog", id: 2 },
  { title: "Bogenhausen", id: 3 },
  { title: "Marienplatz", id: 4 },
  { title: "DogFood", id: 5 },
  { title: "CatFood", id: 6 },
  { title: "CatLitter", id: 7 },
  { title: "adopting", id: 8 },
  { title: "lovelyfamily", id: 9 },
]; */
export default InputTagBar;
