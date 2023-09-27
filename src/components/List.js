import React from "react";

function FruitList({ listName, list, handleBasketListButtonClick }) {
  return (
    <div className="list">
      <p>{listName}</p>
      <ul>
        {list.map((item, index) => (
          <li key={index}>
            <button onClick={() => handleBasketListButtonClick(item)}>
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FruitList;
