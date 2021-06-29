import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import MapCanvas from "./MapCanvas";
import AddressSearch from "./AddressSearch";
import TravelTime from "./TravelTime";
import TravelDistance from "./TravelDistance";
import { useState, useEffect } from "react";
import { CircleMarker } from "leaflet";
import SwitchRouting from "./SwitchRouting";
import ParamController from "./ParamController"
import intersect from "@turf/intersect"
import {polygon} from "@turf/helpers"

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function Layout() {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [Isoline1, setIsoline1] = useState(null);
  const [Isoline2, setIsoline2] = useState(null);
  const [Intersection,setIntersection]=useState(null)
  const [IsolineDist1, setIsolineDist1] = useState(null);
  //const [start, setStart] = useState([50.06143, 19.93658]);
  const updateValue = (datafromChild) => {
    setValue(datafromChild);
  };
  const updateValue2 = (datafromChild) => {
    setValue2(datafromChild);
  };
  const updateIsoline1 = (datafromChild) => {
    setIsoline1(datafromChild);
    overlapPolygons(Isoline1,Isoline2)
  };
  const updateIsoline2 = (datafromChild) => {
    setIsoline2(datafromChild);
    overlapPolygons(Isoline1,Isoline2)
  };

  useEffect(()=>{
    setIntersection(overlapPolygons(Isoline1,Isoline2))
    },[Isoline1,Isoline2])

  const stringToNumberPolygon=(poly)=>{
    let polyFloat=[]
    for(let i of poly){
      polyFloat.push(i.map(Number))
    }
    return polyFloat
  }

  const overlapPolygons=(poly1,poly2)=>{
    if(poly1 && poly2){
     let poly1F=stringToNumberPolygon(poly1)
     let poly2F=stringToNumberPolygon(poly2)
      let polygon1=polygon([[...poly1F]])
      let polygon2=polygon([[...poly2F]])
      let intersection=intersect(polygon1,polygon2)
      //let poly3=polygon([["49.5689392", "20.5212593"],["49.5685959", "20.5221176"],["49.5679092", "20.5228043"],["49.5672226", "20.5248642"],["49.5624161", "20.5296707"],["49.5689392", "20.5212593"]])
      return intersection
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Map
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <ParamController name="Marek" updateIsoline={updateIsoline1} updateCoords={updateValue}/>
        <ParamController name="Maciek" updateIsoline={updateIsoline2} updateCoords={updateValue2}/>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <MapCanvas addr1={value} addr2={value2} polygon={Isoline1} polygon2={Isoline2} intersection={Intersection} />
      </main>
    </div>
  );
}
