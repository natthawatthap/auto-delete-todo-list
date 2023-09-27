import React from "react";

function BasketButtonList({ basketList, handleBasketButtonListClick }) {
  return (
    <div className="BasketButtonList">
      <div>
        {basketList.map((item, index) => (
          <button key={index} onClick={() => handleBasketButtonListClick(item)}>
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default BasketButtonList;
