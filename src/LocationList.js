import React from "react";
import Location from "./Location";

class LocationList extends React.Component {
  render() {
    return (
      <ul style={{display: "grid", justifyContent: "center"}}>
        {this.props.locations.map(
          (e) => {
            return (<Location
              name={e.name}
              lat={e.lat}
              lon={e.lon}
              country={e.country}
              countrycode={e.countrycode}
              city={e.city}
              state={e.state}
              street={e.street}
              postcode={e.postcode}
            />)
          }
        )}
      </ul>
    );
  }
}

export default LocationList;
