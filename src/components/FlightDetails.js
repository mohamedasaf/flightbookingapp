import React from "react";
import { Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import AvailableFlights from "./AvailableFlightsList";

const headers = [
  "Flight Number",
  "Airline Name",
  "Depature",
  "Duration & No.Of Stops",
  "Arrival",
  "Price",
];

const FlightDetails = (props) => {
  const { flightList } = props;
  return (
    <div className="result-section">
      <Row className="result-header">
        {headers &&
          headers.length &&
          headers.map((item, i) => {
            return (
              <React.Fragment key={i}>
                <Col md={2}>
                  <h6>{item}</h6>
                </Col>
              </React.Fragment>
            );
          })}
      </Row>
      <AvailableFlights itemsPerPage={4} flightList={flightList} />
    </div>
  );
};

FlightDetails.propTypes = {
  flightList: PropTypes.arrayOf(
    PropTypes.shape({
      flightNumber: PropTypes.string,
      airlinesName: PropTypes.string,
      source_iata_code: PropTypes.string,
      destination_iata_code: PropTypes.string,
      depatureTime: PropTypes.string,
      arrivalTime: PropTypes.string,
      stops: PropTypes.number,
      duraion: PropTypes.string,
      price: PropTypes.string,
    })
  ),
};

export default FlightDetails;
