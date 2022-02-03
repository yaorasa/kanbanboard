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
      <DisplayBox items={items} setItems={setItems} />
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
      <form className="creatingItemClass" onSubmit={handleSubmit}>
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
  const { items, setItems } = props;

  const handleChange = (evt: any) => {
    evt.preventDefault();
    const newItems = items.map((item) => {
      if (item.name === evt.target.name) {
        return { name: String(evt.target.name), status: evt.target.value };
      }
      return item;
    });
    setItems(newItems);
  };
  return (
    <>
      {items.map((item, index) => {
        const itemName = item.name;
        return (
          <div className="looseItem" key={`${item.name}${index}`}>
            <form>
              {itemName !== "" ? (
                <div>
                  <label style={{minWidth: '150px'}} htmlFor={itemName}>item: {itemName} </label>
                  <select name={itemName} onChange={handleChange}>
                    <option value="backlog">Backlog</option>
                    <option value="todo">To do</option>
                    <option value="blocked">Blocked</option>
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

const DisplayBox = (props: {
  items: itemsType;
  setItems: (i: itemsType) => void;
}) => {
  const { items, setItems } = props;
  return (
    <div className="DisplayBox">
      <StatusBox items={items} setItems={setItems} />
    </div>
  );
};

const StatusBox = (props: {
  items: itemsType;
  setItems: (i: itemsType) => void;
}) => {
  const { items, setItems } = props;
  return (
    <>
      {allStatus.map((status) => (
        <div className="statusBox" key={status.key}>
          <h1>{status.value}</h1>
          <Item items={items} setItems={setItems} status={status.key} />
        </div>
      ))}
    </>
  );
};

const allStatus = [
  { key: "backlog", value: "Backlog" },
  { key: "todo", value: "To do" },
  { key: "blocked", value: "Blocked" },
  { key: "inprogress", value: "In Progress" },
  { key: "test", value: "Test/Review" },
  { key: "done", value: "Done" },
];
// const allStatus = [
//    'backlog',
//   'todo',
//    'blocked',
//    'inprogress',
//    'test',
//    'done'
// ];

const Item = (props: {
  items: itemsType;
  setItems: (i: itemsType) => void;
  status: string;
}) => {
  const { items, setItems, status } = props;
  return (
    <div>
      {items
        .filter((item) => item.name !== "")
        .filter((item) => item.status === status)
        .map((item, index) => (
          <div className="item" key={`${item.name}${index}`}>
            {item.name}
          </div>
        ))}
    </div>
  );
};
