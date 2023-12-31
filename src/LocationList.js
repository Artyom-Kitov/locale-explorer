import React from "react";
import Location from "./Location";
import InfoWindow from "./InfoWindow";
import axios from "axios";
import {OPENTRIPMAP_API_KEY, OPENWEATHER_API_KEY} from "./env";

class LocationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: null,
      places: null,
      isInfoShown: false
    };
  }

  setWeatherInfo(data) {
    this.setState({
      isInfoShown: true,
      weather: {
        main: data.weather[0].description,
        temp: data.main.temp - 273.15,
        feelsLike: data.main.feels_like - 273.15,
      }
    });
  }

  getPlaceDescription(places, index) {
    const url = `https://api.opentripmap.com/0.1/en/places/xid/` +
      `${places[index].xid}?apikey=${OPENTRIPMAP_API_KEY}`;
    axios.get(url)
      .then(response => {
        if (response.status !== 200) {
          return;
        }
        const info = response.data.wikipedia_extracts ? response.data.wikipedia_extracts.text
          : response.data.info.descr;
        const newPlaces = [...this.state.places];
        newPlaces[index]["desc"] = info;
        newPlaces[index]["image"] = response.data.preview;
        this.setState({
          places: newPlaces
        });
      })
      .catch(err => {
        const newPlaces = [...this.state.places];
        newPlaces[index]["desc"] = undefined;
        console.log(err);
      });
  }

  getPlacesDescriptions(places) {
    for (let i = 0; i < places.length; i++) {
      this.getPlaceDescription(places, i);
    }
  }

  getPlacesList(lat, lon) {
    const url = `https://api.opentripmap.com/0.1/en/places/radius` +
      `?apikey=${OPENTRIPMAP_API_KEY}&radius=2000&limit=5&offset=0&lat=${lat}&lon=${lon}&rate=2`;
    axios.get(url)
      .then(response => {
        if (response.status !== 200) {
          return;
        }
        const places = response.data.features.map(e => {
          return {
            id: e.id,
            xid: e.properties.xid,
            name: e.properties.name,
            dist: e.properties.dist,
            desc: null
          };
        });
        this.setState({
          places: places
        });
        this.getPlacesDescriptions(places);
      })
      .catch(err => {
        this.setState({
          places: undefined
        });
        console.log(err);
      });
  }

  getLocationInfo(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather` +
      `?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`;
    axios.get(url)
      .then(response => {
        if (response.status !== 200) {
          return;
        }
        this.setWeatherInfo(response.data);
      })
      .catch(err => {
        this.setState({
          weather: undefined
        });
        console.error(err);
      });
    this.setState({
      isInfoShown: true
    });
    this.getPlacesList(lat, lon);
  }

  clearLocationInfo() {
    this.setState({
      isInfoShown: false,
      weather: null,
      places: null
    });
  }

  render() {
    return (
      <div>
        <ul style={{display: "grid", justifyContent: "center"}}>
          {this.props.locations.map(loc =>
              <Location
                key={"" + loc.lat + loc.lon}
                onClick={(lat, lon) => this.getLocationInfo(lat, lon)}
                name={loc.name}
                lat={loc.lat}
                lon={loc.lon}
                country={loc.country}
                countrycode={loc.countrycode}
                city={loc.city}
                state={loc.state}
                street={loc.street}
                postcode={loc.postcode}
              />
          )}
        </ul>
        <InfoWindow
          open={this.state.isInfoShown}
          onClose={() => this.clearLocationInfo()}
          weather={this.state.weather}
          places={this.state.places}
        />
      </div>
    );
  }
}

export default LocationList;
