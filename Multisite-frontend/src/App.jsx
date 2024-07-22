import "./styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import { Icon, divIcon, point } from "leaflet";
import { useEffect, useRef, useState } from "react";
import TopBar from "./TopBar";
import alertIcon from "./icons/alert.svg";
import checkRing from "./icons/Check_ring.svg";
import downSymbol from "./icons/Frame 27.svg";
import axios from "axios";

export default function App() {
  const [markers, setMarkers] = useState([]);
  const [totalAlerts, setTotalAlerts] = useState(0);

  const light = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const dark =
    "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png";
  const colorMode = "dark";

  // create custom icon
  const customIconRed = new Icon({
    // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconUrl: require("./icons/red-marker.png"),
    iconSize: [18, 18], // size of the icon
  });
  const customIconGreen = new Icon({
    // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconUrl: require("./icons/green-marker.png"),
    iconSize: [25, 25], // size of the icon
  });

  // custom cluster icon
  const createClusterCustomIcon = function (cluster) {
    return new divIcon({
      html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
      className: "custom-marker-cluster",
      iconSize: point(20, 20, true),
    });
  };


  async function getData() {
    try {
      const data = await axios.get('http://10.4.5.219:5000/getLocationData');
      setMarkers(data.data);
    } catch (error) {
      console.error('Error while polling:', error);
    }
  }
  useEffect(() => {
    getData();
    const interval = setInterval(() => {
      getData();
    }, 60000);
    return () => clearInterval(interval);
  }, []);
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.setUrl(colorMode === "light" ? light : dark);
    }
  }, [colorMode]);
  return (
    <div className="full-page">
      <TopBar />
      <MapContainer center={[39.0000, 10.0000]} zoom={2} scrollWheelZoom={true} maxZoom={7} minZoom={2.3}>
        {/* OPEN STREEN MAPS TILES */}
        <TileLayer
          ref={ref} url={colorMode === "light" ? light : dark}
          noWrap={false}
        />
        {/* WATERCOLOR CUSTOM TILES */}
        {/* <TileLayer
        attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
      /> */}
        {/* GOOGLE MAPS TILES */}
        {/* <TileLayer
        attribution="Google Maps"
        // url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" // regular
        // url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}" // satellite
        url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}" // terrain
        maxZoom={20}
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
        noWrap={false}
      /> */}
        {/* <MarkerClusterGroup */}
        {/* chunkedLoading iconCreateFunction={createClusterCustomIcon}> */}
        {/* Mapping through the markers */}
        {markers && markers?.map((marker, index) => (
          // <Marker position={marker.geocode} icon={marker.staus === 'active' ? customIconGreen : customIconRed} key={marker.id}>
          <div key={index}>
            <CircleMarker
              center={marker.geocode}
              pathOptions={{ color: `${marker.status === 'down' ? "red" : "green"}` }}
              radius={10}
              setPopupContent={marker.alertsCount}
              popupopen={true}
            ><Popup>
                <div>
                  <h3>{marker.popUp}</h3>
                  <p>Alerts: {marker.alertsCount}</p>
                  <p>Status: {marker.status}</p>
                </div>
              </Popup>
            </CircleMarker>
          </div>
          // {/* </Marker> */}
        ))}3
        {/* Hard coded markers */}
        {/* <Marker position={[51.505, -0.09]} icon={customIcon}>
          <Popup>This is popup 1</Popup>
        </Marker>
        <Marker position={[51.504, -0.1]} icon={customIcon}>
          <Popup>This is popup 2</Popup>
        </Marker>
        <Marker position={[51.5, -0.09]} icon={customIcon}>
          <Popup>This is popup 3</Popup>
        </Marker>
       */}
        {/* </MarkerClusterGroup> */}
      </MapContainer>
      <div class="status-container">
        <div class="status-box-left-container">
          <div class="status-box red">
            <img src={checkRing} alt="check" />
            <div class="status-text-red">
              <div>Anomoly Level Critical</div>
              <p>2 total critical anomolies, out of which 2 occurred in the last week</p>
            </div>
          </div>
          <div class="status-box green">
            <img src={alertIcon} alt="alert" />
            <div class="status-text-green">
              <div>Anomoly Level Healthy</div>
              <p>No advisories found</p>
            </div>
          </div>
        </div>
        <div class="status-indicators">
          <div class="indicator">
            <div class="icon">#Alerts</div>
            <div class="text">
              <span>{totalAlerts}</span>
            </div>
          </div>
          <div class="indicator">
            <div class="icon">Server Status</div>
            <div class="text" style={{ display: 'flex', justifyContent: 'center' }}>
              <span><img src={downSymbol} alt="downSymbol" /></span>
              <span class="down">Down</span>
            </div>
          </div>
          <div class="indicator">
            <div class="icon">Sites</div>
            <div class="text">
              <span>&#127760;</span>
              <span>15</span>
            </div>
          </div>
          <div class="indicator">
            <div class="icon">Endpoints</div>
            <div class="text">
              <span>&#128241;</span>
              <span>500</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconRenderer({ Icon }) {
  return (
    <div className=''>
      <Icon factor={0.8} />
    </div>
  );
}
