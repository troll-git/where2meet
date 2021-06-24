import React, { useState } from "react";
import Switch from "@material-ui/core/Switch";
import ScheduleIcon from "@material-ui/icons/Schedule";
import DriveEtaRoundedIcon from "@material-ui/icons/DriveEtaRounded";
import DirectionsBikeRoundedIcon from "@material-ui/icons/DirectionsBikeRounded";
import Grid from "@material-ui/core/Grid";

const SwitchRouting = (props) => {
  const [iconColor, setIconColor] = useState(false);
  if (props.param === "travel") {
    return (
      <React.Fragment>
        <Grid container>
          <Grid item xs={2}>
            {iconColor ? (
              <ScheduleIcon fontSize="large" style={{ color: "gray" }} />
            ) : (
              <ScheduleIcon fontSize="large" style={{ color: "red" }} />
            )}
          </Grid>
          <Grid item xs={2}>
            <Switch
              color="default"
              inputProps={{ "aria-label": "checkbox with default color" }}
              onChange={(e) => setIconColor(e.target.checked)}
            />
          </Grid>
          <Grid item xs={2}>
            {iconColor ? (
              <p style={{ color: "red" }}>KM</p>
            ) : (
              <p style={{ color: "gray" }}>KM</p>
            )}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  } else if (props.param === "vehicle") {
    return (
      <React.Fragment>
        <Grid container>
          <Grid item xs={2}>
            <DriveEtaRoundedIcon fontSize="large" />
          </Grid>
          <Grid item xs={2}>
            <Switch
              color="default"
              inputProps={{ "aria-label": "checkbox with default color" }}
              onChange={(e) => setIconColor(e.target.checked)}
            />
          </Grid>
          <Grid item xs={2}>
            <DirectionsBikeRoundedIcon />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
};

export default SwitchRouting;
