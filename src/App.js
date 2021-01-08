import React, { useState } from "react";
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

const App = () => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      text: inputValue,
      selected: false,
    };
    const newItems = [...items, newItem];
    setInputValue("");
    setItems(newItems);
  };

  const randomizer = () => {
    clearSelected();
    for (let i = 0; i < 20; i++) {
      setTimeout(pickRandomItem, 100 * i);
    }
  };

  const clearSelected = () => {
    const newItems = items.map((item) => ({ ...item, selected: false }));
    setItems(newItems);
  };

  const pickRandomItem = () => {
    const randomItem = items[Math.floor(Math.random() * items.length)];
    const newItems = items.map((item) =>
      item === randomItem ? { ...item, selected: true } : item
    );
    setItems(newItems);
  };

  const removeItem = (i) => {
    const newItems = items.filter((_, id) => id !== i);
    setItems(newItems);
  };

  return (
    <div className="container mx-auto shadow-xl w-11/12 md:w-2/4 xl:w-4/12 h-auto p-5 bg-white">
      <form onSubmit={handleSubmit} className="flex justify-between">
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
          } py-2 px-6 w-3/12 md:w-1/5 text-white  hover:opacity-80 hover:text-white transition-all duration-300 ease-in rounded-md`}
        >
          Add
        </button>
      </form>

      <div className="my-8">
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
                  className={`my-4 py-2 px-4 rounded shadow cursor-pointer ${
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
  );
};

export default App;
