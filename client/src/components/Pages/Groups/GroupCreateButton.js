import * as React from "react";
import Button from "@mui/material/Button";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import { darkPurple, orange } from "../../../constant/actionTypes";

export default function GroupCreateButton() {
  return (
    <div className="GroupCreateButton">
      <Button
        variant="contained"
        endIcon={<Diversity1Icon />}
        sx={{
          marginTop: 5,
          marginLeft: 2,
          padding: 2,
          paddingLeft: 2,
          paddingRight: 4,
          borderRadius: "200px",
          color: darkPurple,
          backgroundColor: "transparent",
          border: orange,

          ":hover": {
            backgroundColor: orange,
            color: "white",
          },
        }}
      >
        Create your group!
      </Button>
    </div>
  );
}
