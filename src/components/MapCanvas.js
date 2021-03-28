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
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Hidden } from "@material-ui/core";
import { TimelineSeparator } from "@material-ui/lab";
import L from "leaflet";
import bbox from "@turf/bbox";
import { lineString } from "@turf/helpers";

let icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
});

const DEFAULT_VIEWPORT = {
  center: [50.06143, 19.93658],
  zoom: 13,
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
      center: [19.93658, 50.06143],
      bbox: swapBbox([19.7922355, 49.9676668, 20.2173455, 50.1261338]),
      poly: null,
      poly2: null,
    };
  }
  componentDidUpdate(prevProps, prevState) {
    //console.log(this.props.addr1);
    if (this.props.addr1) {
      if (prevState.center !== this.props.addr1.geometry.coordinates) {
        this.setState({ center: this.props.addr1.geometry.coordinates });

        this.setState({ bbox: swapBbox(this.props.addr1.bbox) });

        console.log(this.state.center);
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
  }
  /*componentDidUpdate(prevProps, prevState) {
    //console.log(this.props.addr1);

    if(this.props.polyline){
      console.log("ello")
      /*if (prevState.poly !== this.props.polyline) {
        this.setState({ poly:this.props.polyline});
        console.log(this.state.poly);

      }
    }
  }*/
  render() {
    return (
      <React.Fragment>
        <MapContainer
          id="map"
          center={this.state.center}
          zoom={DEFAULT_VIEWPORT.zoom}
          style={{ height: "100vh" }}
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
                />
              </LayersControl.BaseLayer>
            </LayersControl>
          </LayerGroup>
          <CircleMarker
            center={[this.state.center[1], this.state.center[0]]}
            pathOptions={{ color: "red" }}
            radius={20}
          >
            <Popup>{"pacjent1"}</Popup>
          </CircleMarker>
          {this.state.poly ? <Polygon positions={this.state.poly} /> : null}
          {this.state.poly2 ? (
            <Polygon
              pathOptions={{ color: "yellow" }}
              positions={this.state.poly2}
            />
          ) : null}
          <SetViewOnClick
            center={[this.state.center[1], this.state.center[0]]}
            bbox={this.state.bbox}
          />
        </MapContainer>
      </React.Fragment>
    );
  }
}

export default MapCanvas;
