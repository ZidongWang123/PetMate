import {
  Paper,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Button } from "@mui/material";
/* import { makeStyles } from "@mui/styles"; */
import "./Filter.css";
import React, { useState } from "react";
/* import { useNavigate } from "react-router-dom"; */

/* const useStyles = makeStyles({
  paper: {
    marginBottom: "1rem",
    padding: "13px",
  },
  filters: {
    padding: "0 1.5rem",
  },
}); */

export const Filter = ({ activity, onSortingChange }) => {
  /*   const classes = useStyles(); */
  const [sorting, setSorting] = useState("");
  /*   const handleSortChange = (e) => {
    if (e.target.value === "ascending") {
      setSorting("price");
      console.log(sorting);
      onSortingChange(sorting);
    } else if (e.target.value === "descending") {
      setSorting("-price");
      onSortingChange(sorting);
    } else if (e.target.value === "recent") {
      setSorting("recent");
      onSortingChange(sorting);
    } else if (e.target.value === "active") {
      setSorting("active");
      onSortingChange(sorting);
    } else if (e.target.value === "latest") {
      setSorting("latest");
      onSortingChange(sorting);
    } else if (e.target.value === "maximum") {
      setSorting("maxAmount");
      onSortingChange(sorting);
    }
  }; */
  const handleSortChange = (e) => {
    const sortingValue = e.target.value;
    onSortingChange(sortingValue); // 将 sorting 的值传递给父组件
  };
  /*   const navigate = useNavigate(); */
  const clearAllFilters = () => {
    setSorting("");
    onSortingChange("");
  };

  return (
    <>
      {activity === "service" && (
        <div className="paper">
          <Paper sx={{ padding: "13px", display: "flex" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              Sort By:
              <Button size="small" color="primary" onClick={clearAllFilters}>
                Clear All
              </Button>
            </div>
            <div style={{ display: "flex" }}>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="price-order"
                  name="price-order"
                  row
                  onChange={handleSortChange}
                  /* value={priceOrder} */
                  /* onChange={handleSortChange} */
                >
                  <FormControlLabel
                    value="latest"
                    /*  disabled={loading} */
                    control={<Radio color="secondary" />}
                    label="lastest posted"
                  />
                  <FormControlLabel
                    value="active"
                    /*  disabled={loading} */
                    control={<Radio color="secondary" />}
                    label="Status: active"
                  />
                  <FormControlLabel
                    value="descending"
                    /*   disabled={loading} */
                    control={<Radio color="secondary" />}
                    label="Price: Highest"
                  />

                  <FormControlLabel
                    value="ascending"
                    /*  disabled={loading} */
                    control={<Radio color="secondary" />}
                    label="Price: Lowest "
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </Paper>
        </div>
      )}
      {activity === "event" && (
        <div className="paper">
          <Paper sx={{ padding: "13px", display: "flex" }}>
            <div>
              <Typography>
                Sort By:
                <Button size="small" color="primary" onClick={clearAllFilters}>
                  Clear All
                </Button>
              </Typography>
            </div>
            <div>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="price-order"
                  name="price-order"
                  row
                  onChange={handleSortChange}
                  /* value={priceOrder} */
                  /* onChange={handleSortChange} */
                >
                  <FormControlLabel
                    value="latest"
                    /*  disabled={loading} */
                    control={<Radio color="secondary" />}
                    label="lastest posted"
                  />
                  <FormControlLabel
                    value="recent"
                    /*  disabled={loading} */
                    control={<Radio color="secondary" />}
                    label="recent events"
                  />
                  <FormControlLabel
                    value="maximum"
                    /*   disabled={loading} */
                    control={<Radio color="secondary" />}
                    label="Max participants"
                  />

                  <FormControlLabel
                    value="active"
                    /*  disabled={loading} */
                    control={<Radio color="secondary" />}
                    label="Status:active"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </Paper>
        </div>
      )}
    </>
  );
};
