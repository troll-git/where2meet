import React, { useRef } from "react";
import {
  MapContainer,
  TileLayer,
  WMSTileLayer,
  LayerGroup,
  LayersControl,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import CircularProgress from "@material-ui/core/CircularProgress";

const DEFAULT_VIEWPORT = {
  center: [50.06143, 19.93658],
  zoom: 13,
};

class MapCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      dane: "",
      zoom: "",
      center: [50.06143, 19.93658],
    };
  }
  componentDidUpdate(prevProps, prevState) {
    //console.log(this.props.addr1);
    if (this.props.addr1) {
      if (prevState.center !== this.props.addr1.geometry.coordinates) {
        this.setState({ center: this.props.addr1.geometry.coordinates });
        console.log(this.state.center);
      }
    }
  }
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
        </MapContainer>
      </React.Fragment>
    );
  }
}

export default MapCanvas;
