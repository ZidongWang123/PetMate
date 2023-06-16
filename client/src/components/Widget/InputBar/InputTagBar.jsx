import * as React from "react";

import useAutocomplete from "@mui/base/useAutocomplete";
import CheckIcon from "@mui/icons-material/Check";

import {
  InputWrapper,
  StyledTag,
  Listbox,
  Tag,
  Label,
  Root,
} from "./inputTagBarStyle";

import { useState, useEffect } from "react";

const InputTagBar = ({ onChange }) => {
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: "customized-hook-demo",

    multiple: true,
    options: possibleOptions,
    getOptionLabel: (option) => option.title,
  });

  /*   const [selectedTags, setSelectedTags] = useState(currentValue); */

  /*   const handleTagsChange = (tags) => {
    onChange(tags);
  }; */
  // 在selectedTags变化时调用onChange回调函数
  /*   React.useEffect(() => {
    onChange(selectedTags);
  }, [selectedTags, onChange]); */
  return (
    <div>
      <Root>
        <div {...getRootProps()}>
          <Label {...getInputLabelProps()}></Label>
          <InputWrapper
            ref={setAnchorEl}
            className={focused ? "focused" : ""}
            sx={{ boxShadow: "0 2px 2px rgba(0, 0, 0, 0.1)" }}
          >
            {value.map((option, index) => (
              <StyledTag label={option.title} {...getTagProps({ index })} /> //getTagProps:用来删掉
            ))}
            <input {...getInputProps()} />
          </InputWrapper>
        </div>
        {groupedOptions.length > 0 ? (
          <Listbox {...getListboxProps()}>
            {groupedOptions.map((option, index) => (
              <li {...getOptionProps({ option, index })}>
                <span>{option.title}</span>
                <CheckIcon fontSize="small" />
              </li>
            ))}
          </Listbox> //下拉框的一些变化
        ) : null}
      </Root>
      <div>
        <h2>Selected Tags:</h2>
        {value.map((option) => (
          <p key={option.index}>{option.title}</p>
        ))}
      </div>
    </div>
  );
};
const possibleOptions = [
  { title: "Munich", id: 1 },
  { title: "LargeDog", id: 2 },
  { title: "Bogenhausen", id: 3 },
  { title: "Marienplatz", id: 4 },
  { title: "DogFood", id: 5 },
  { title: "CatFood", id: 6 },
  { title: "CatLitter", id: 7 },
  { title: "adopting", id: 8 },
  { title: "lovelyfamily", id: 9 },
];
export default InputTagBar;
