import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Row, Col } from "reactstrap";

const Items = ({ currentItems }) => {
  return (
    <div>
      {currentItems &&
        currentItems.length > 0 &&
        currentItems.map((item, i) => {
          const {
            flightNumber,
            airlinesName,
            source_iata_code,
            destination_iata_code,
            depatureTime,
            arrivalTime,
            stops,
            duraion,
            price,
          } = item;
          return (
            <Row className="results" key={i}>
              <Col md={2}>
                <label>Flight Number</label>
                <p>{flightNumber}</p>
              </Col>
              <Col md={2}>
                <label>Airlines Number</label>
                <p>{airlinesName}</p>
              </Col>
              <Col md={2}>
                <label>Depature Time</label>
                <p>{`${source_iata_code} ${depatureTime}`}</p>
              </Col>
              <Col md={2}>
                <label>Duration & Stops</label>
                <p>{`${duraion} - ${stops} Stops`}</p>
              </Col>
              <Col md={2}>
                <label>Arrival Time</label>
                <p>{`${destination_iata_code} ${arrivalTime}`}</p>
              </Col>
              <Col md={2}>
                <label>Price</label>
                <p>{price}</p>
              </Col>
            </Row>
          );
        })}
    </div>
  );
};

function AvailableFlights({ itemsPerPage, flightList }) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(
    () => {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(flightList.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(flightList.length / itemsPerPage));
    },
    [flightList, itemOffset, itemsPerPage]
  );

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % flightList.length;
    setItemOffset(newOffset);
  };
  return (
    <React.Fragment>
      <Items currentItems={currentItems} />
      <ReactPaginate
        containerClassName="pagination"
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </React.Fragment>
  );
}
export default AvailableFlights;
