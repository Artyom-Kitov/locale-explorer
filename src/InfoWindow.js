import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";

class InfoWindow extends React.Component {
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={() => this.props.onClose()}
      >
        <DialogTitle>
          Location info
        </DialogTitle>
        <DialogContent>
          Weather: {this.props.weather ?
          <ul>
            <li>{this.props.weather.main.charAt(0).toUpperCase() + this.props.weather.main.slice(1)}</li>
            <li>Temperature: {this.props.weather.temp.toFixed(2)}°C</li>
            <li>Feels like: {this.props.weather.feelsLike.toFixed(2)}°C</li>
          </ul> : <p>loading...</p>}
          <br/>
          Interesting places: {this.props.places ?
          <ul>
            {this.props.places.map(place => {
              return (
              <li key={place.id}>
                {place.name}, {place.dist.toFixed(1)}m
                <p>{place.desc ?? "loading info..."}</p>
              </li>
            );
            })}
          </ul> : <p>loading...</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.props.onClose()} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default InfoWindow
