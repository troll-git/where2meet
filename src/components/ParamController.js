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
import { getIsoline,getIsolineDist } from "./API";
import SwitchRouting from "./SwitchRouting";
import AddressSearch from "./AddressSearch";


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    //backgroundColor:"grey"
  },
}));

const ParamController = (props) => {
  const classes = useStyles();
  const [coords, setCoords] = useState([21.634827, 49.561642]);
  const [TravelPolygon, setTravelPolygon] = useState(null);
  const [time, setTime] = useState(300);
  const [distance, setDistance] = useState(1);
  const [timeTravel,setTimeTravel]=useState(false)
  const [vehicle,setVehicle]=useState("car")
  const [loading, setLoading] = useState(false);


  const updateCoords = (datafromChild) => {
    if(datafromChild){
      console.log(datafromChild)
      setCoords(datafromChild.geometry.coordinates);
      props.updateUpCoords(datafromChild.geometry.coordinates)
    }

  };

  const updateVehicle = (datafromChild) => {
    setVehicle(datafromChild);
  };
  const updateTimeTravel = (datafromChild) => {
    setTimeTravel(datafromChild);
  };
  const handlePosition=(pos)=>{
    if(coords!==[pos.coords.longitude,pos.coords.latitude]&&coords){
      props.updateUpCoords([pos.coords.longitude,pos.coords.latitude])
      setCoords([pos.coords.longitude,pos.coords.latitude])
    }
    
    //this.setState({bbox:swapBbox([pos.coords.longitude-0.5,pos.coords.latitude-0.5,pos.coords.longitude+0.5,pos.coords.latitude+0.5])})
  }
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(handlePosition)
    console.log(coords)
  },[])
  const setTravelPoly = (data) => {
    console.log(data);
    let polyg = [];
    for (let e of data.response.isoline[0].component[0].shape) {
      let lat, lon;
      [lat, lon] = e.split(",");
      polyg.push([lat, lon]);
    }
    props.updateIsoline(polyg);
  };

  const fetchIsoline = () => {
    console.log("getting isoline");
    setLoading(true);
    setTimeout(() => {
      !timeTravel?
      getIsoline(coords, time, setTravelPoly):getIsolineDist(
        coords,
        distance,
        setTravelPoly
      );
      setLoading(false);
    }, 1000);
    console.log(TravelPolygon);
  };
//Insert below to activate vehicle switch"SwitchRouting param="vehicle" update={updateVehicle}"
  return (
    <React.Fragment>
      <h1>{props.name}</h1>
      <AddressSearch update={updateCoords} />
      <SwitchRouting param="travel" update={updateTimeTravel} />
     
      {!timeTravel?<FormControl className={classes.formControl}>
      
      <InputLabel id="demo-simple-select-label">Travel time</InputLabel>
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
      
    </FormControl>:<FormControl className={classes.formControl}>
        <TextField
          id="standard-helperText"
          label="Długosc podrozy (km)"
          defaultValue="1"
          //helperText="Some important text"
          onChange={(e) =>e.target.value>=800?e.target.style.color='red':setDistance(e.target.value)}
        />
      </FormControl>}
      
      
      <Button variant="contained" color="secondary" onClick={fetchIsoline}>
          GO!{" "}
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

export default ParamController;

const timeList = [
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
