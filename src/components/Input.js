

import React from "react";

function InputText({ inputText, handleInputChange, handleEnter }) {
  return (
    <div className="inputText">
      <input
        type="text"
        placeholder="Enter text"
        value={inputText}
        onChange={handleInputChange}
      />
      <button onClick={handleEnter}>Enter</button>
    </div>
  );
}

export default InputText;
