import React, { useState } from "react";
import Lottie from "react-lottie";
import animationData from "./confetti-cannons.json";
import "./App.css";

//todo: RANDOM PICKER
//* box container
//* input + button
//* list of items
//* buttom

//todo: FUNCTIONALITIES
//* input -> save to state
//* button (ADD) -> add to list
//* button (bottom) -> trigger the randomizer
//* Double click -> remove item.
//* localStorage

const defaultItems = JSON.parse(localStorage.getItem("items")) || [];

const storeToLocal = (items) => {
  localStorage.setItem("items", JSON.stringify(items));
};

const App = () => {
  const [items, setItems] = useState(defaultItems);
  const [inputValue, setInputValue] = useState("");
  const [isStopped, setIsStopped] = useState(true);

  const updateItems = (newItems) => {
    //store to localStorage
    storeToLocal(newItems);
    setItems(newItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      text: inputValue,
      selected: false,
    };
    const newItems = [...items, newItem];
    updateItems(newItems);
    setInputValue("");
  };

  const displayLottie = () => {
    setTimeout(() => {
      setIsStopped(false);
    }, 1890);
  };

  const hideLottie = () => {
    setTimeout(() => {
      setIsStopped(true);
    }, 6000);
  };

  const randomizer = () => {
    for (let i = 0; i < 20; i++) {
      setTimeout(pickRandomItem, 100 * i);
    }
    displayLottie();
    hideLottie();
  };

  const pickRandomItem = () => {
    const randomItem = items[Math.floor(Math.random() * items.length)];
    const newItems = items.map((item) =>
      item === randomItem
        ? { ...item, selected: true }
        : { ...item, selected: false }
    );
    updateItems(newItems);
  };

  const removeItem = (i) => {
    const newItems = items.filter((_, id) => id !== i);
    updateItems(newItems);
  };

  const keyPressHandler = (e) => {
    if (inputValue === "" && e.keyCode === 13) {
      return false;
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <h1 className="text-5xl font-extrabold">Randomizer.</h1>
      <div className="container mx-auto mt-10 shadow-xl w-11/12 md:w-2/4 xl:w-4/12 h-auto p-5 bg-white">
        <form
          onSubmit={handleSubmit}
          onKeyPress={keyPressHandler}
          className="flex justify-between"
        >
          <input
            className="md:w-3/4 w-2/3 py-2 px-4 bg-gray-100 focus:outline-none placeholder-gray-400 shadow-inner rounded-md"
            type="text"
            placeholder="Add new project"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <button
            className={`${
              inputValue === ""
                ? "pointer-events-none bg-transparent border border-blue-300 text-gray-500"
                : "bg-blue-500"
            } py-2 px-6 w-3/12 md:w-1/5 text-white  hover:opacity-80 hover:text-white transition-all duration-200 ease-in rounded-md`}
          >
            Add
          </button>
        </form>

        <div className="my-8 relative">
          <div className="absolute mx-28">
            {!isStopped && (
              <Lottie options={defaultOptions} height={200} width={200} />
            )}
          </div>
          <ul>
            {items.length <= 0 ? (
              <h1 className="text-center font-medium  text-gray-300">
                No Project Found.
              </h1>
            ) : (
              items.map((item, index) => {
                return (
                  <li
                    key={index}
                    onDoubleClick={() => {
                      removeItem(index);
                    }}
                    className={`my-4 py-2 px-4 rounded select-none shadow cursor-pointer ${
                      item.selected ? "bg-yellow-300" : ""
                    }`}
                  >
                    {item.text}
                  </li>
                );
              })
            )}
          </ul>
        </div>
        <div className="">
          {items.length === 0 ? (
            <button className="w-full py-2 px-6 bg-gray-200 text-black transition-all duration-100 ease-linear rounded-md pointer-events-none">
              Randomize
            </button>
          ) : (
            <button
              className="w-full py-2 px-6 bg-blue-400 text-white hover:bg-opacity-90 transition-all duration-100 ease-linear rounded-md focus:outline-none"
              onClick={randomizer}
            >
              Randomize
            </button>
          )}
          <small className="text-gray-500 inline-block mt-2">
            * Double click to remove an item.
          </small>
        </div>
      </div>
    </>
  );
};

export default App;
