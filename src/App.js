import './App.css';
import SearchField from "./SearchField";
import React from "react";
import LocationList from "./LocationList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: []
    };
  }

  handleLocations(locations) {
    this.setState({
      locations: locations
    });
  }

  render() {
    return (
      <div className="App">
        <h1 color="white">
          LOCALE EXPLORER
        </h1>
        <SearchField
          handleLocations={locations => this.handleLocations(locations)}
        />
        <LocationList
          locations={this.state.locations}
        />
      </div>
    );
  }
}

export default App;
