import React from "react";
import "./PageHeader.css";
import {
  Button,
  Typography,
} from "@mui/material";
import { orange } from "../../../../constant/actionTypes";
import { Filter } from "./Filter";

const PageHeader = ({
  showSearchBar,
  onContinue,
  activity,
  onSortingChange,
}) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleFindMore = () => {
    onContinue();
  };

  return (
    <>
      {showSearchBar ? (
        <div className="page-header">
          <div className="search-header">
            <Filter activity={activity} onSortingChange={onSortingChange} />
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
                  color: 'white',
                  border: "1px solid gray",
                  backgroundColor: orange,
                  width: "200px",
                  fontSize: "16px",
                  height: "80%"
                }}
              >
                More privileges!
              </Button>
            )}
          </div>
          <hr className="line"></hr>
        </div>
      ) : null}
    </>
  );
};

export default PageHeader;
