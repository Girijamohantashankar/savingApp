import React from "react";
import "./Alllist.css";
import Select from "react-select";
import { Link } from "react-router-dom";
function Alllist() {
  const options = [
    { value: "today", label: "Today All" },
    { value: "january", label: "January" },
    { value: "february", label: "February" },
    { value: "march", label: "March" },
    { value: "april", label: "April" },
    { value: "may", label: "May" },
    { value: "june", label: "June" },
    { value: "july", label: "July" },
    { value: "august", label: "August" },
    { value: "september", label: "September" },
    { value: "october", label: "October" },
    { value: "november", label: "November" },
    { value: "december", label: "December" },
  ];

  return (
    <div className="view_all">
      <div className="title">
      <p>
        <Link className="link" to="/home">
     
          {" "}
          <i class="fa-solid fa-arrow-left"></i>
        </Link></p>
        <h1>View All Transactions</h1>
      </div>

      <div className="btn_viewall">
        <div className="dropdown">
          <Select options={options} />
        </div>
        <div className="export_pdf">
          <button>Export Pdf</button>
        </div>
      </div>
      <div className="main_list">
        <div className="item_list_title">
          <p>Products</p>
          <p>Date and Time</p>
          <p>Amount</p>
        </div>
        <div className="transaction_details_lists">
          <ul>
            <li>
              <sapn>Groceries</sapn>
              <sapn>04-May-2024</sapn>
              <sapn className="red_span" >- 100</sapn>
            </li>
            <li>
              <sapn>Groceries</sapn>
              <sapn>04-May-2024</sapn>
              <sapn className="red_span" >- 100</sapn>
            </li>
            <li>
              <sapn>Groceries</sapn>
              <sapn>04-May-2024</sapn>
              <sapn className="red_span" >- 100</sapn>
            </li>
            <li>
              <sapn>Groceries</sapn>
              <sapn>04-May-2024</sapn>
              <sapn className="red_span" >- 100</sapn>
            </li>
            <li>
              <sapn>Groceries</sapn>
              <sapn>04-May-2024</sapn>
              <sapn className="red_span" >- 100</sapn>
            </li>
            <li>
              <sapn>Groceries</sapn>
              <sapn>04-May-2024</sapn>
              <sapn className="red_span" >- 100</sapn>
            </li>
            <li>
              <sapn>Groceries</sapn>
              <sapn>04-May-2024</sapn>
              <sapn className="red_span" >- 100</sapn>
            </li>
            <li>
              <sapn>Groceries</sapn>
              <sapn>04-May-2024</sapn>
              <sapn className="red_span" >- 100</sapn>
            </li>
            <li>
              <sapn>Groceries</sapn>
              <sapn>04-May-2024</sapn>
              <sapn className="red_span" >- 100</sapn>
            </li>
            <li>
              <sapn>Groceries</sapn>
              <sapn>04-May-2024</sapn>
              <sapn className="red_span" >- 100</sapn>
            </li>
            <li>
              <sapn>Groceries</sapn>
              <sapn>04-May-2024</sapn>
              <sapn className="red_span" >- 100</sapn>
            </li>
            <li>
              <sapn>Groceries</sapn>
              <sapn>04-May-2024</sapn>
              <sapn className="red_span" >- 100</sapn>
            </li>
            <li>
              <sapn>Groceries</sapn>
              <sapn>04-May-2024</sapn>
              <sapn className="red_span" >- 100</sapn>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Alllist;
