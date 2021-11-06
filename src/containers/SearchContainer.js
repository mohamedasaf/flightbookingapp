import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getAirports, getAvailableFlights } from "../actionCreators/Search";
import Search from "../components/Search";
import { Container, Row, Col, Button } from "reactstrap";
import { reduxForm, change } from "redux-form";
import FlightDetails from "../components/FlightDetails";
import { formatDate } from "../utils/utils";

const validate = (values) => {
  const errors = {};
  const errMsg = "Required";
  if (!values.sourceCity) {
    errors.sourceCity = errMsg;
  }
  if (!values.destinationCity) {
    errors.destinationCity = errMsg;
  }
  if (!values.travelDate) {
    errors.travelDate = errMsg;
  }
  return errors;
};

class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowNoResult: false,
    };
  }
  componentDidMount() {
    this.props.getAirports();
  }
  searchHandler = () => {
    const { handleSubmit } = this.props;
    const submitter = handleSubmit(this.getResult);
    submitter();
    this.setState({ isShowNoResult: true });
  };

  getResult = () => {
    const { values } = this.props;
    const searchDetails = { ...values };
    this.props.getAvailableFlights(searchDetails);
  };

  returnDateResetHandler = () => {
    this.props.changeFormState('searchForm', 'returnDate', '')
  }

  flightsList = () => {
    const {flightList} = this.props
    return (
      flightList && flightList.length > 0 && (
        <section className="result-section">
          <FlightDetails flightList={flightList} />
        </section>
    )
    )
  }

  render() {
    const { handleSubmit, airportsList, flightList, values, isLoading } = this.props;
    const { travelDate } = values;
    const { isShowNoResult } = this.state;
    return (
      <Container>
        <h1> Search your flight here...</h1>
        <form name="searchForm" onSubmit={handleSubmit(this.searchHandler)}>
          <Search
            airportsList={airportsList}
            searchCallback={this.searchHandler}
            travelMinDate={formatDate(new Date())}
            returnMinDate={travelDate}
            returnDateReset={this.returnDateResetHandler}
          />
          <Row className="search-button text-center">
            <Col md={12}>
              <Button type="submit" color="primary">
                SEARCH
              </Button>
            </Col>
          </Row>
          {isShowNoResult && (flightList && flightList.length > 0 ?  <p>{`${flightList && flightList.length} results found`}</p>: !isLoading && <p>No Result found...</p>)}
          {isLoading ? <p>Searching....</p> : flightList && flightList.length > 0 && (
              <section className="result-section">
                <FlightDetails flightList={flightList} />
              </section>
          )}
        </form>
      </Container>
    );
  }
}
function mapStateToProps(state) {
  const { form } = state;
  const { searchForm } = form;
  const { values, airportsList, flightList, isLoading } = searchForm;
  return {
    values,
    airportsList,
    flightList,
    isLoading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAirports: bindActionCreators(getAirports, dispatch),
    getAvailableFlights: bindActionCreators(getAvailableFlights, dispatch),
    changeFormState: bindActionCreators(change, dispatch),
  };
}

SearchContainer.propTypes = {
  handleSubmit: PropTypes.func,
  airportsList: PropTypes.object,
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

const Component = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SearchContainer));

export default reduxForm({
  formCustomizer: (form) => form,
  form: "searchForm",
  touchOnBlur: false,
  validate,
})(Component);
