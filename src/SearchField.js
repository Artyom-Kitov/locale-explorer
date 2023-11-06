import {Button, TextField} from "@mui/material";
import React, {createRef} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ExploreIcon from '@mui/icons-material/Explore';
import axios from 'axios';
import {GRAPHHOPPER_API_KEY} from "./env";

class SearchField extends React.Component {
  constructor(props) {
    super(props);
    this.location = createRef();
  }

  clearLocation() {
    this.location.current.value = "";
    this.props.handleLocations([]);
  }

  sendRequest() {
    const location = this.location.current.value;
    const url = `https://graphhopper.com/api/1/geocode?q=${location}&key=${GRAPHHOPPER_API_KEY}`;
    axios.get(url)
      .then(response => {
        this.props.handleLocations(response.data.hits.map((e) => {
          return {
            name: e.name,
            lat: e.point.lat,
            lon: e.point.lng,
            country: e.country,
            countrycode: e.countrycode,
            city: e.city,
            state: e.state,
            street: e.street,
            postcode: e.postcode
          }
        }));
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div className="SearchField">
        <TextField
          inputProps={{
            style: {
              width: "400px",
              height: "20px",
            }
          }}
          style={{
            color: "red",
            backgroundColor: "white"
          }}
          inputRef={this.location}
          size="small"
          className="textfield"
          label="Enter the location"
          variant="filled"
          color="secondary"
        />
        <Button
          sx={{marginY: "2px", marginLeft: "10px"}}
          id="SearchButton"
          variant="contained"
          size="large"
          color="secondary"
          startIcon={<ExploreIcon/>}
          onClick={() => this.sendRequest()}
        >
          Search
        </Button>
        <Button
          sx={{marginLeft: "10px"}}
          id="ClearButton"
          variant="contained"
          size="large"
          color="secondary"
          startIcon={<DeleteIcon/>}
          onClick={() => this.clearLocation()}
        >
          Clear
        </Button>
      </div>
    );
  }
}

export default SearchField;
