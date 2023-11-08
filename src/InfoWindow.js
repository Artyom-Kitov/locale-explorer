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
          Weather: {this.props.weather ? (
          <ul>
            <li>{this.props.weather.main.charAt(0).toUpperCase() + this.props.weather.main.slice(1)}</li>
            <li>Temperature: {this.props.weather.temp.toFixed(2)}°C</li>
            <li>Feels like: {this.props.weather.feelsLike.toFixed(2)}°C</li>
          </ul>
        ) : (
          <p>{this.props.weather === null ? "loading..." : "no data"}</p>
        )}
          Interesting places: {this.props.places ? (
          this.props.places.length === 0 ? <p>No interesting places found</p> : (
            <ul>
              {this.props.places.map(place => {
                return (
                  <li key={place.id}>
                    {place.name}, {place.dist.toFixed(1)}m
                    {place.image ? (
                      <img src={place.image.source} width={place.image.width} height={place.image.height} alt=""/>
                    ) : null}
                    <p>{place.desc == null ? "loading info..." : (place.desc ?? "no data")}</p>
                  </li>
                );
              })}
            </ul>
          )
        ) : (
          <p>{this.props.places === null ? "loading..." : "no data"}</p>
        )}
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

export default InfoWindow;