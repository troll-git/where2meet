import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getPlaceCoords } from "./API";
import { matchSorter } from "match-sorter";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getIsoline } from "./API";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const TravelTime = (props) => {
  const classes = useStyles();
  const [TravelPolygon, setTravelPolygon] = useState(null);
  const [time, setTime] = useState(300);
  const [loading, setLoading] = useState(false);

  const setTravelPoly = (data) => {
    console.log(data);
    let polyg = [];
    for (let e of data.response.isoline[0].component[0].shape) {
      let lat, lon;
      [lat, lon] = e.split(",");
      polyg.push([lat, lon]);
    }
    props.update(polyg);
  };

  const fetchIsoline = () => {
    console.log("getting isoline");
    setLoading(true);
    setTimeout(() => {
      getIsoline(props.coords.geometry.coordinates, time, setTravelPoly);
      setLoading(false);
    }, 1000);
    console.log(TravelPolygon);
  };

  return (
    <React.Fragment>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Czas podrozy</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        >
          {timeList.map((timeItem) => (
            <MenuItem value={timeItem.valueSec}>{timeItem.timeText}</MenuItem>
          ))}
        </Select>
        <Button variant="contained" color="secondary" onClick={fetchIsoline}>
          LICZ!{" "}
          {loading ? (
            <CircularProgress
              style={{
                color: "green",
              }}
              size={25}
              thickness={8}
            />
          ) : null}
        </Button>
      </FormControl>
    </React.Fragment>
  );
};

export default TravelTime;

const timeListPl = [
  { timeText: "5 min", valueSec: 300 },
  { timeText: "5 min", valueSec: 600 },
  { timeText: "15 min", valueSec: 900 },
  { timeText: "30 min", valueSec: 1800 },
  { timeText: "45 min", valueSec: 2700 },
  { timeText: "1 godzina", valueSec: 3600 },
  { timeText: "1,5 godziny", valueSec: 5400 },
  { timeText: "2 godziny", valueSec: 7200 },
  { timeText: "3 godziny", valueSec: 10800 },
  { timeText: "4 godziny", valueSec: 14400 },
  { timeText: "5 godzin", valueSec: 18000 },
  { timeText: "6 godzin", valueSec: 21600 },
  { timeText: "7 godzin", valueSec: 25200 },
  { timeText: "8 godzin", valueSec: 28800 },
  { timeText: "9 godzin", valueSec: 32400 },
];

const timeList = [
  { timeText: "5 min", valueSec: 300 },
  { timeText: "5 min", valueSec: 600 },
  { timeText: "15 min", valueSec: 900 },
  { timeText: "30 min", valueSec: 1800 },
  { timeText: "45 min", valueSec: 2700 },
  { timeText: "1 hr", valueSec: 3600 },
  { timeText: "1,5 hr", valueSec: 5400 },
  { timeText: "2 hrs", valueSec: 7200 },
  { timeText: "3 hrs", valueSec: 10800 },
  { timeText: "4 hrs", valueSec: 14400 },
  { timeText: "5 hrs", valueSec: 18000 },
  { timeText: "6 hrs", valueSec: 21600 },
  { timeText: "7 hrs", valueSec: 25200 },
  { timeText: "8 hrs", valueSec: 28800 },
  { timeText: "9 hrs", valueSec: 32400 },
];
