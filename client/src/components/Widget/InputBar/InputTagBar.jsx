import React from "react";
import { useState, useEffect } from "react";
import { getRecommendTags } from "../../../api";

import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";

const InputTagBar = ({
  tags,
  onTagsChange,
  where = "group",
  width = 900,
  borderRadius = "100px",
  height = "default",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  const handleTagChange = (e, tags) => {
    onTagsChange(tags);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const onClose = (e) => {
    setInputValue("");
  };
  useEffect(() => {
    const updateOptions = async () => {
      try {
        const res = await getRecommendTags(inputValue, where);
        if ((res.status = 200)) {
          tags = res.data.result;
          if (tags.length === 0) {
            setOptions([inputValue]);
          } else {
            setOptions(tags);
          }
        } else if ((res.status = 500)) {
          console.log("internal server error");
        } else {
          console.log("Unknown error, try again");
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (inputValue) {
      updateOptions();
    }
  }, [inputValue]);

  return (
    <div>
      <Autocomplete
        multiple
        id="tags-standard"
        onClose={onClose}
        options={options}
        getOptionLabel={(option) => option}
        value={tags} // 设置 Autocomplete 的值为输入值
        onChange={handleTagChange} // 处理输入值变化的函数
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="your tags*"
            value={inputValue} // 设置 TextField 的值为输入值
            onChange={handleInputChange}
          />
        )}
        sx={{
          backgroundColor: "white",
          borderRadius: { borderRadius },
          width: { width },
          boxShadow: "0 5px 5px rgba(0, 0, 0, 0.1)",
          height: { height },
          overflow: "auto",
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      />
    </div>
  );
};

export default InputTagBar;
