import {
  Paper,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Button } from "@mui/material";
import "./Filter.css";
import React, { useState } from "react";

export const Filter = ({ activity, onSortingChange }) => {
  const [sorting, setSorting] = useState("");
  const handleSortChange = (e) => {
    const sortingValue = e.target.value;
    onSortingChange(sortingValue);
  };

  const clearAllFilters = () => {
    setSorting("");
    onSortingChange("");
  };

  return (
    <>
      {activity === "service" && (
        <div className="paper">
          <Paper sx={{ padding: "13px", display: "flex", alignItems:"center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "10px",
              }}
            >
              Sort By:
              {/* <Button size="small" color="primary" onClick={clearAllFilters}>
                Clear All
              </Button> */}
            </div>
            <div style={{ display: "flex" }}>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="price-order"
                  name="price-order"
                  row
                  onChange={handleSortChange}
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
          <div
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "10px",
              }}
            >
              <Typography>
                Sort By:
                {/* <Button size="small" color="primary" onClick={clearAllFilters}>
                  Clear All
                </Button> */}
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
