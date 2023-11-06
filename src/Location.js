import React from "react";
import Card from "@mui/material/Card";
import {CardContent, Typography} from "@mui/material";

class Location extends React.Component {
  render() {
    const props = this.props;
    return (
      <Card sx={{minWidth: 275}} style={{width: 200, height: 200, marginTop: "5px"}}>
        <CardContent>
          <Typography sx={{fontSize: 14}} color="text.secondary">
            Location
          </Typography>
          <Typography variant="h5" component="div">
            {this.props.name}
          </Typography>
          <Typography color="text.secondary">
            {this.props.lat} {this.props.lon}
          </Typography>
          <Typography>
            {props.country ?? ""} ({props.countrycode ?? ""}) {props.city ?? ""} {props.state ?? ""} {props.street ?? ""} {props.postcode ?? ""}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default Location;
