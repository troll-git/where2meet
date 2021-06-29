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

const ComputeButton = (props) => {
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
    </React.Fragment>
  );
};

export default ComputeButton;

