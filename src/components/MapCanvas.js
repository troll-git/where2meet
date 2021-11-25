import React, { useRef } from "react";
import {
  MapContainer,
  TileLayer,
  WMSTileLayer,
  LayerGroup,
  LayersControl,
  ZoomControl,
  useMap,
  Marker,
  CircleMarker,
  Popup,
  Polygon,
  GeoJSON
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Hidden } from "@material-ui/core";
import { TimelineSeparator } from "@material-ui/lab";
import L from "leaflet";
import bbox from "@turf/bbox";
import { lineString } from "@turf/helpers";
import "proj4leaflet"


let icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
});
var crs84 = new L.Proj.CRS('EPSG:4326','+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs',{
  origin: [-180,90],
  /*resolutions: [
    140000.0000000000,
     70000.0000000000,
     35000.0000000000,
     17500.0000000000
 ]*/
  resolutions: [2000,1000,500,200,100,50,20,10],
})


const DEFAULT_VIEWPORT = {
  center: [50.06143,19.93658],
  zoom: 5,
};

function swapBbox(bbox) {
  return [bbox[1], bbox[0], bbox[3], bbox[2]];
}

function SetViewOnClick({ center, bbox }) {
  const map = useMap();
  map.fitBounds([
    [bbox[0], bbox[1]],
    [bbox[2], bbox[3]],
  ]);
  //map.setView(center, map.getZoom());
  //map.setMaxBounds(bbox)

  return null;
}

class MapCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      dane: "",
      zoom: "",
      center: '',//[19.93658, 50.06143],
      center2: '',//[19.93658, 50.10143],
      bbox: swapBbox([19.7922355, 49.9676668, 20.2173455, 50.1261338]),
      bbox2: swapBbox([19.7922355, 49.9676668, 20.2173455, 50.1261338]),
      poly: null,
      poly2: null,
      intersection:null,
    };
  }
  handlePosition=(pos)=>{
    console.log([pos.coords.longitude,pos.coords.latitude])
    //this.setState({center:[20.6342105, 49.5616605]})
    this.setState({center:[pos.coords.longitude,pos.coords.latitude]})
    this.setState({bbox:swapBbox([pos.coords.longitude-0.5,pos.coords.latitude-0.5,pos.coords.longitude+0.5,pos.coords.latitude+0.5])})
  }
  
  componentDidMount(){
    let position=navigator.geolocation.getCurrentPosition(this.handlePosition)
    console.log(position)
    
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("dy")
    console.log(this.props);
    if (this.props.addr1) {
      if (prevState.center !== this.props.addr1) {
        this.setState({ center: this.props.addr1 });
        this.setState({bbox:swapBbox([this.props.addr1[0]-0.01,this.props.addr1[1]-0.01,this.props.addr1[0]+0.01,this.props.addr1[1]+0.01])})
        //this.setState({ bbox: swapBbox(this.props.addr1.bbox) });

        console.log(this.state.center);
      }
    }
    if (this.props.addr2) {
      if (prevState.center2 !== this.props.addr2) {
        this.setState({ center2: this.props.addr2 });
        this.setState({bbox:swapBbox([this.props.addr2[0]-0.01,this.props.addr2[1]-0.01,this.props.addr2[0]+0.01,this.props.addr2[1]+0.01])})
        //this.setState({ bbox: swapBbox(this.props.addr2.bbox) });
        console.log(this.state.center2);
      }
    }
    if (this.props.polygon) {
      if (prevState.poly !== this.props.polygon) {
        this.setState({ poly: this.props.polygon });
        console.log(this.props.polygon);
        let line = lineString(this.props.polygon);
        //console.log(line)
        let bboxp = bbox(line);
        console.log(bboxp);
        this.setState({ bbox: bboxp });
      }
    }
    if (this.props.polygon2) {
      if (prevState.poly2 !== this.props.polygon2) {
        this.setState({ poly2: this.props.polygon2 });
        console.log(this.props.polygon2);
        let line = lineString(this.props.polygon2);
        //console.log(line)
        let bboxp = bbox(line);
        console.log(bboxp);
        this.setState({ bbox: bboxp });
      }
    }
    if (this.props.intersection) {
      if (prevState.intersection !== this.props.intersection) {
        this.setState({ intersection: this.props.intersection });
        console.log("Intersection")
        console.log(this.props.intersection);
        let line = lineString(this.props.intersection);
        //console.log(line)
        let bboxp = bbox(line);
        console.log(bboxp);
        //this.setState({ bbox: bboxp });
      }
    }
  }

 
  
  render() {
    return (
      <React.Fragment>
        <MapContainer
          id="map"
          center={DEFAULT_VIEWPORT.center}//{this.state.center}
          zoom={DEFAULT_VIEWPORT.zoom}
          style={{ height: "100vh" }}
          placeholder={<p>Mapa srapa</p>}
          //crs={crs84}
          //maxZoom={19}
          //animate="true"
          //ref={this.mapRef}
          //zoomControl={false}
        >
          <LayerGroup>
            <LayersControl position="topright">
              <LayersControl.BaseLayer name="osm" checked={true}>
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  //url="http://globalheat.strava.com/tiles/cycling/color7/color7/{z}/{x}/{y}.png"
                   //url="https://mapant.no/tiles/{z}/{y}/{x}.png"
                />
              </LayersControl.BaseLayer>
            </LayersControl>
          </LayerGroup>
          {this.state.center?<div><CircleMarker
            center={[this.state.center[1], this.state.center[0]]}
            pathOptions={{ color: "red" }}
            radius={20}
          ></CircleMarker><SetViewOnClick
          center={[this.state.center[1], this.state.center[0]]}
          bbox={this.state.bbox}
        /></div>:<div/>}
        {this.state.center2?<div><CircleMarker
            center={[this.state.center2[1], this.state.center2[0]]}
            pathOptions={{ color: "orange" }}
            radius={20}
          ></CircleMarker><SetViewOnClick
          center={[this.state.center2[1], this.state.center2[0]]}
          bbox={this.state.bbox}
        /></div>:<div/>}
          

          {this.state.poly ? <Polygon positions={this.state.poly} /> : null}
          {this.state.poly2 ? (
            <Polygon
              pathOptions={{ color: "yellow" }}
              positions={this.state.poly2}
            />
          ) : null}
           {this.state.intersection ? (
             <Polygon
              pathOptions={{ color: "magenta" }}
              positions={[...this.state.intersection.geometry.coordinates]}
              />
            
          ) : null}
         
        </MapContainer>
        <p
          style={{
            zIndex: 999,
            position: "relative",
            left: "50px",
            top: "-500px",
            color: "rebeccapurple",
          }}
        >
          
        </p>
      </React.Fragment>
    );
  }
}

export default MapCanvas;
