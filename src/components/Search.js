import React, { useState } from "react";
import TextInput from "./InputBox";
import { Field } from "redux-form";
import { Row, Col } from "reactstrap";
import Dropdown from "./Dropdown";
import PropTypes from "prop-types";

const Search = (props) => {
  const { airportsList, travelMinDate, returnMinDate, returnDateReset } = props;
  const [sourceCity, setSourceCity] = useState();
  const [destinationCity, setDestinationCity] = useState();

  const cityHandler = (selectedCity, isSourceCity) => {
    if (isSourceCity) {
      setSourceCity(selectedCity);
    } else {
      setDestinationCity(selectedCity);
    }
  };
  return (
    <React.Fragment>
      <Row>
        <Col sm={3}>
          <Field
            id="Source City"
            name="sourceCity"
            component={Dropdown}
            menuItems={airportsList}
            type="text"
            placeholder="Select"
            label="Source City"
            onChangeHandler={(value) => cityHandler(value, true)}
            value={sourceCity}
          />
        </Col>
        <Col sm={3}>
          <Field
            id="Destination City"
            name="destinationCity"
            component={Dropdown}
            menuItems={airportsList}
            type="text"
            placeholder="Select"
            label="Destination City"
            value={destinationCity}
            onChangeHandler={(value) => cityHandler(value, false)}
          />
        </Col>
        <Col sm={3}>
          <Field
            id="Travel Date"
            name="travelDate"
            component={TextInput}
            type="date"
            label="Travel Date"
            min={travelMinDate}
            onChange={returnDateReset}
          />
        </Col>
        <Col sm={3}>
          <Field
            id="Return Date"
            name="returnDate"
            component={TextInput}
            type="date"
            label="Return Date"
            min={returnMinDate}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

Search.propTypes = {
  airportsList: PropTypes.object,
  travelMinDate: PropTypes.string,
  returnMinDate: PropTypes.string,
  returnDateReset: PropTypes.func
};

export default Search;
