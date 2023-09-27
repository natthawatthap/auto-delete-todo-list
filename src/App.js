import React, { useState, useEffect } from "react";
import "./App.css";
import basket from "./constant/basket";
import InputText from "./components/Input";
import List from "./components/List";
import BasketButtonList from "./components/BasketButtonList";

function App() {
  const [inputText, setInputText] = useState("");
  const [fruitList, setFruitList] = useState([]);
  const [vegetableList, setVegetableList] = useState([]);
  const [basketList, setBasketList] = useState(basket);
  const [countdown, setCountdown] = useState(0);
  const [selectedList, setSelectedList] = useState([]);

  useEffect(() => {
    // Start a countdown timer when inputText changes
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      // Clear the timer when the countdown reaches 0
      if (countdown === 0) {
        clearInterval(timer);
      }

      return () => clearInterval(timer); // Cleanup on unmount or when countdown changes
    }
  }, [countdown]);

  if (countdown === 0 && selectedList.length > 0) {
    const lastSelectedList = selectedList[selectedList.length - 1];

    if (lastSelectedList.type === "Fruit") {
      const updatedFruitList = fruitList.filter(
        (item) => item.name !== lastSelectedList.name
      );
      setFruitList(updatedFruitList);
      setBasketList([...basketList, lastSelectedList]);
      const updatedSelectedList = selectedList.slice(0, -1);
      setSelectedList(updatedSelectedList);
    } else {
      const updatedVegetableList = vegetableList.filter(
        (item) => item.name !== lastSelectedList.name
      );
      setVegetableList(updatedVegetableList);
      setBasketList([...basketList, lastSelectedList]);
      const updatedSelectedList = selectedList.slice(0, -1);
      setSelectedList(updatedSelectedList);
    }

    setCountdown(5);
  }

  const handleBasketListButtonClick = (item) => {
    setInputText(item.name);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleEnter = () => {
    if (inputText.trim() !== "") {
      // Check if the entered name is in the basket list
      const isNameInBasketList = basketList.some(
        (item) => item.name === inputText
      );

      if (isNameInBasketList) {
        // If the name is in the basket list, remove it from the basket list
        const updatedBasketList = basketList.filter(
          (item) => item.name !== inputText
        );
        setBasketList(updatedBasketList);

        // Find the item in the basket list
        const newItem = basketList.find((item) => item.name === inputText);

        // Depending on the type of the item, add it to the corresponding list
        if (newItem.type === "Fruit") {
          setFruitList([...fruitList, newItem]);
          setSelectedList([...selectedList, newItem]);
          setCountdown(5);
        } else {
          setVegetableList([...vegetableList, newItem]);
          setSelectedList([...selectedList, newItem]);
          setCountdown(5);
        }
      } else {
        // Check if the entered name is in the fruit list
        const isNameInFruitList = fruitList.some(
          (item) => item.name === inputText
        );

        // If the name is not in the basket list
        if (isNameInFruitList) {
          // Find the item in the fruit list
          const newItem = fruitList.find((item) => item.name === inputText);

          // Remove the item from the fruit list
          const updatedFruitList = fruitList.filter(
            (item) => item.name !== inputText
          );
          setFruitList(updatedFruitList);

          // Add the item to the basket list
          setBasketList([...basketList, newItem]);
        } else {
          // Find the item in the vegetable list
          const newItem = vegetableList.find((item) => item.name === inputText);

          // Remove the item from the vegetable list
          const updatedVegetableList = vegetableList.filter(
            (item) => item.name !== inputText
          );
          setVegetableList(updatedVegetableList);

          // Add the item to the basket list
          setBasketList([...basketList, newItem]);
        }
        const updatedsSelectedList = selectedList.filter(
          (item) => item.name !== inputText
        );
        setSelectedList(updatedsSelectedList);
      }
    }
  };

  return (
    <div className="App">
      <div className="Column-10">
        <BasketButtonList
          basketList={basketList}
          handleBasketButtonListClick={handleBasketListButtonClick}
        />
      </div>

      <div className="Column-90">
        <p>Select product</p>
        {/* <p> {countdown > 0 && <span>({countdown} seconds remaining)</span>}</p> */}

        <InputText
          inputText={inputText}
          handleInputChange={handleInputChange}
          handleEnter={handleEnter}
        />
        <div className="List-container">
          <List
            listName={"Fruit"}
            list={fruitList}
            handleBasketListButtonClick={handleBasketListButtonClick}
          />

          <List
            listName={"Vegetable"}
            list={vegetableList}
            handleBasketListButtonClick={handleBasketListButtonClick}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
