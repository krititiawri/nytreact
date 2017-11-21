
import React from "react";
import "./SaveBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const SaveBtn = props => (
  <button className="save-btn" {...props}>
    <i className="fa fa-floppy-o" aria-hidden="true"></i>

  </button>
);

export default SaveBtn;