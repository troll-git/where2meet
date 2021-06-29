import React, { useState } from "react";
import Switch from "@material-ui/core/Switch";
import ScheduleIcon from "@material-ui/icons/Schedule";
import DriveEtaRoundedIcon from "@material-ui/icons/DriveEtaRounded";
import DirectionsBikeRoundedIcon from "@material-ui/icons/DirectionsBikeRounded";
import Grid from "@material-ui/core/Grid";

const SwitchRouting = (props) => {
  const [iconColor, setIconColor] = useState(false);
  const toggleSwitch=(e)=>{
    setIconColor(e.target.checked)
    console.log(e.target.checked)
  }
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
              onChange={(e) => toggleSwitch(e)}
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
          {iconColor ? (
            <DriveEtaRoundedIcon fontSize="large" style={{ color: "gray" }} />
          ) : (
            <DriveEtaRoundedIcon fontSize="large" style={{ color: "red" }} />
          )}
        </Grid>
        <Grid item xs={2}>
          <Switch
            color="default"
            inputProps={{ "aria-label": "checkbox with default color" }}
            onChange={(e) => toggleSwitch(e)}
          />
        </Grid>
        <Grid item xs={2}>
          {iconColor ? (
            < DirectionsBikeRoundedIcon fontSize="large" style={{ color: "red" }} />
          ) : (
            < DirectionsBikeRoundedIcon fontSize="large" style={{ color: "gray" }} />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
    );
  }
};

export default SwitchRouting;
