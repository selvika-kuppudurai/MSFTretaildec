import React, { Component } from 'react';

import Pagination from "react-js-pagination";
import MultiSelect from '../MultiSelect';
// import Arrow from "../../../assets/images/icons/down-chevron.png"
export class TableWrapper extends Component {

  constructor(props) {
    super(props)

    this.state = {
      activePage: 1,
      showDrpdwn: false
    }
    this.detectOutside = this.detectOutside.bind(this);
  }



  handlePagination = (direction) => {

    let { page = 1 } = this.props.pageMeta || {}

    let { queryHandler } = this.props;

    let pageNumber;

    if (direction === "previous") {

      pageNumber = page - 1;

    } else if (direction === "next") {

      pageNumber = page + 1;

    }

    if (queryHandler) {

      queryHandler({ page: pageNumber })

    }

  }

  handlePageChange = (pageNumber) => {

    const { queryHandler } = this.props;

    queryHandler && queryHandler({ page: pageNumber })

    this.setState({ activePage: pageNumber });

  }

  toggleDropdown = () => {

    if (!this.state.showDropdown) {

      document.addEventListener("click", this.handleOutsideClick, false);

    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }


    this.setState({
      showDrpdwn: !this.state.showDrpdwn
    });



  };

  handleOutsideClick = (e) => {

    if (this.node != null) {

      if (this.node.contains(e.target)) {
        return;
      }
    }
    this.toggleDropdown(e);

  };

  detectOutside = (node) => {
    this.detectOutside = node;
  }

  render() {
    const { headerDetails = [], pageMeta = {}, options = [], chooseOptions, tablePage } = this.props;



    const {
      size = 10,
      page = 0,
      total = 0,
      totalPages = 0,
    } = pageMeta;

    const upperPages = [];

    const lowerPages = [];

    for (let i = page; i <= totalPages; i++) {

      if (i < page + 3) {

        upperPages.push(i);

        i = i === page + 2 && totalPages > page + 4 ? totalPages - 3 : i;

      } else {

        if (totalPages > 6) {

          lowerPages.push(i)

        }

      }

    }

    return (

      <>
        <div className="table-responsive">
          <table className="table mb-0">
            <thead>
              <tr>
                {headerDetails.map(({ label, className, divClass = '', width = false, tableDrpdwn = false, colIndex }, index) => {

                  return (
                    <th className={className} key={index} style={{ width }}  >
                      <div className={`d-flex align-items-center cursor-pointer ${divClass} ${tableDrpdwn} ? position-relative : ""`} onClick={() => this.setState({ showDrpdwn: !this.state.showDrpdwn })} >
                        {label}
                        {/* {colIndex === index && <img src={Arrow} alt="arrow" className={this.state.showDrpdwn ? "table-drp-arrow" : "table-drp-arrow-false"} />} */}
                      </div>
                      {this.state.showDrpdwn && colIndex === index && options.length > 0 && <MultiSelect options={options ? options : []} showSearch={false} className="table-drpdwn" chooseValues={chooseOptions} />}
                    </th>
                  )
                }
                )}

              </tr>

            </thead>

            <>
              <tbody>
                {this.props.children}
              </tbody>
            </>
          </table>
        </div>
        {total > 0 ?
          <div className="ce-pagination w-100">
            {total > Number(size) ?
              <Pagination
                innerClass="pagination py-4"
                activePage={page}
                itemsCountPerPage={size}
                totalItemsCount={total}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange}
                prevPageText="Previous"
                nextPageText="Next"
                itemClassFirst="first-page"
                itemClassLast="last-page"
                itemClassPrev="ml-auto"
              />
              : ''}
          </div>
          : ''}

        {tablePage > 0 ?
          <div className="ce-pagination w-100">
            {tablePage > Number(10) ?
              <Pagination
                innerClass="pagination py-4"
                activePage={page}
                itemsCountPerPage={10}
                totalItemsCount={tablePage}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange}
                prevPageText="Previous"
                nextPageText="Next"
                itemClassFirst="first-page"
                itemClassLast="last-page"
                itemClassPrev="ml-auto"
              />
              : ''}
          </div>
          : ''}
      </>
    )
  }
}

