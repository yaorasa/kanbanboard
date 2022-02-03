import React, { useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([{ name: "", status: "backlog" }]);
  return (
    <div className="App">
      <header className="App-header">
        <p>Kanbanboard</p>
      </header>
      <CreateItemForm items={items} setItems={setItems} />
      <LooseItemsBox items={items} setItems={setItems} />
    </div>
  );
}

export default App;

type itemsType = { name: string; status: string }[];
interface createItemProps {
  items: itemsType;
  setItems: (i: itemsType) => void;
}
const CreateItemForm = (props: createItemProps) => {
  const { items, setItems } = props;
  const [itemName, setItemName] = React.useState("");

  const handleSubmit = (evt: any) => {
    evt.preventDefault();
    setItems([...items, { name: itemName, status: "backlog" }]);
    setItemName("");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Item:
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </label>
        <button type="submit" value="Create">
          Create
        </button>
      </form>
    </>
  );
};

const LooseItemsBox = (props: {
  items: itemsType;
  setItems: (i: itemsType) => void;
}) => {
  const [itemStatus, setItemStatus] = React.useState("backlog");

  const { items, setItems } = props;

  const handleChange = (evt: any) => {
    evt.preventDefault();
    setItemStatus(evt.target.value);
    let itemStatusChanged = items.find((item) => item.name === evt.target.name);
    if (itemStatusChanged !== undefined) itemStatusChanged.status = itemStatus;
    setItems(items);
    setItemStatus("backlog");
  };
  return (
    <>
      {items.map((item, index) => {
        const itemName = item.name;
        return (
          <div key={`${item.name}${index}`}>
            <form>
              {itemName !== "" ? (
                <div>
                  <label htmlFor={itemName}>item: {itemName} </label>
                  <select name={itemName} onChange={handleChange}>
                    <option value="backlog">Backlog</option>
                    <option value="todo">To do</option>
                    <option value="block">Blocked</option>
                    <option value="inprogress">In progress</option>
                    <option value="test">Test/Review</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              ) : null}
            </form>
          </div>
        );
      })}
    </>
  );
};
