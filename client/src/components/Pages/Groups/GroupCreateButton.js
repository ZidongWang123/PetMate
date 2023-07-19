import * as React from "react";
import Button from "@mui/material/Button";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import { orange } from "../../../constant/actionTypes";

export default function GroupCreateButton({ onClick }) {
  return (
    <div className="GroupCreateButton">
      <Button
        variant="contained"
        endIcon={<Diversity1Icon />}
        onClick={onClick}
        sx={{
          marginTop: 3,
          marginLeft: 2,

          paddingLeft: 2,
          paddingRight: 4,
          borderRadius: "200px",
          color: "white",
          backgroundColor: "transparent",
          border: orange,
          backgroundColor: orange,
          width: "200px",
        }}
      >
        Create your group!
      </Button>
    </div>
  );
}
