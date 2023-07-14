import React from "react";
import "./PageHeader.css";
import {
  TextField,
  Button,
  Chip,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { darkGray } from "../../../../constant/actionTypes";
import { Filter } from "./Filter";

const PageHeader = ({
  showSearchBar,
  onContinue,
  activity,
  onSortingChange,
}) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  /*    const [tags, setTags] = React.useState([]);

    const handleAddChip = (tag) => {
        setTags([...tags, tag]);
    };

    const handleDeleteChip = (tagToDelete) => {
        setTags(tags.filter((tag) => tag !== tagToDelete));
    };

    const handleKeyPressTags = (e) => {
        if (e.key === 'Enter' && e.target.value !== '') {
            handleAddChip(e.target.value);
            e.target.value = '';
        }
    }; */

  const handleFindMore = () => {
    onContinue();
  };

  /* 
    const handleSearch = () => {
        console.log('search');
    } */

  return (
    <>
      {showSearchBar ? (
        <div className="page-header">
          <div className="search-header">
            {/*  <div className="sort-selection">
              <form action="#">
                <label htmlFor="sort"></label>
                <select name="sort" id="sort" className="sort-selection-style">
                  <option value="lowest">Price(lowest)</option>
                  <option value="#" disabled></option>
                  <option value="lowest">Price(highest)</option>
                  <option value="#" disabled></option>
                  <option value="lowest">latest</option>
                  <option value="#" disabled></option>
                  <option value="lowest">Price(highest)</option>
                </select>
              </form>
            </div> */}
            <Filter activity={activity} onSortingChange={onSortingChange} />
            {/*   <TextField
                                variant="outlined"
                                onKeyPress={handleKeyPressTags}
                                fullWidth
                                InputProps={{
                                    placeholder: 'Type and press enter to add a tags',
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleSearch}>
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                sx={{
                                    fontFamily: 'Cosmic Sans MS',
                                    marginTop: '20px',
                                    borderRadius: '50px',
                                    backgroundColor: 'white',
                                    border: '1px solid black',
                                    width: "100%",
                                    minWidth: 300,
                                }}
                            /> */}
            {!user ? (
              <Typography
                variant="h6"
                align="center"
                sx={{
                  marginLeft: "20px",
                  marginTop: "20px",
                  whiteSpace: "nowrap",
                  alignSelf: "center",
                }}
              >
                Login for more privileges!
              </Typography>
            ) : (
              <Button
                onClick={handleFindMore}
                sx={{
                  marginLeft: "20px",
                  color: darkGray,
                  border: "1px solid black",
                  backgroundColor: "inherit",
                  width: "200px",
                  height: "80%"
                }}
              >
                More privileges!
              </Button>
            )}
          </div>
          {/*    <div className="chips-header">
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => handleDeleteChip(tag)}
                sx={{
                  fontFamily: "Cosmic Sans MS",
                }}
                inputprops={{ fontFamily: "Cosmic Sans MS" }}
              />
            ))}
          </div> */}
          <hr className="line"></hr>
        </div>
      ) : null}
    </>
  );
};

export default PageHeader;
