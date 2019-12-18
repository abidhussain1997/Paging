import React from "react";

export default class Paging extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 3,
      totalPage: 11
    };
  }

  setCurrentPage = idx => {
    this.setState({
      currentPage: idx
    });
  };

  setTotalPage = e => {
    const { currentPage } = this.state;
    let page = Math.floor(e.target.value);
    if (page < currentPage) {
      this.setState({
        totalPage: page,
        currentPage: page
      });
    } else {
      this.setState({
        totalPage: page
      });
    }
  };

  createPaging = () => {
    let { currentPage, totalPage } = this.state;
    let paging = [];

    const pushToArray = (i) => {
      paging.push(
        i === currentPage ? (
          <div key={i} className="current-page">
            {i}
          </div>
        ) : (
          <div key={i} onClick={() => this.setCurrentPage(i)}>{i}</div>
        )
      );
    }

    if (currentPage <= 5) {
      if (totalPage < 10) {
        for (let i = 1; i <= totalPage; i++) {
          pushToArray(i)
        }
      } else {
        for (let i = 1; i <= 10; i++) {
          pushToArray(i)
        }
      }
    }

    if (currentPage > 5) {
      if (totalPage >= currentPage + 4) {
        for (let i = currentPage - 5; i <= currentPage + 4; i++) {
          pushToArray(i)
        }
      } else {
        let startIdx = currentPage - 9 + (totalPage - currentPage);
        if (startIdx < 1) startIdx = 1;
        for (let i = startIdx; i <= totalPage; i++) {
          pushToArray(i)
        }
      }
    }
    return paging;
  };

  render() {
    return (
      <div>
        <div className="paging-container ">{this.createPaging()}</div>
        <div>
          <div>
            Total Pages:{" "}
            <input
              onChange={this.setTotalPage}
              className="totalpage-input"
              type="number"
              min="1"
              value={this.state.totalPage}
            />
          </div>
        </div>
      </div>
    );
  }
}
