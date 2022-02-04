import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([{ name: "", status: "backlog" }]);
  return (
    <div className="App">
      <header className="App-header">
        <p>Kanbanboard</p>
      </header>
      <CreateItemForm items={items} setItems={setItems} />
      {/* <LooseItemsBox items={items} setItems={setItems} /> */}
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
                  <label style={{ minWidth: "150px" }} htmlFor={itemName}>
                    {" "}
                    {itemName}{" "}
                  </label>
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

const allStatus = [
  { key: "backlog", value: "Backlog" },
  { key: "todo", value: "To do" },
  { key: "blocked", value: "Blocked" },
  { key: "inprogress", value: "In Progress" },
  { key: "test", value: "Test/Review" },
  { key: "done", value: "Done" },
];

const StatusBox = (props: {
  items: itemsType;
  setItems: (i: itemsType) => void;
}) => {
  const { items, setItems } = props;
  const [dragging, setDragging] = useState(false);
  const dragItem: React.MutableRefObject<any> = useRef();
  const dragNode: React.MutableRefObject<any> = useRef();

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    item: { name: string; status: string }
  ) => {
    dragItem.current = item;
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnter = (
    e: React.DragEvent<HTMLDivElement>,
    sIndex: number
  ) => {
    const currentItem = dragItem.current;
    if (e.target !== dragNode.current) {
      const newItems = items.map((item) => {
        if (item.name === currentItem.name) {
          return { name: currentItem.name, status: allStatus[sIndex].key };
        }
        return item;
      });
      setItems(newItems);
    }
  };

  const handleDragEnd = () => {
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    setDragging(false);
    dragItem.current = null;
    dragNode.current = null;
  };
  const getStyles = (item: { name: string; status: string }) => {
    const currentItem = dragItem.current;
    if (currentItem.name === item.name && currentItem.status === item.status) {
      return "current item";
    }
    return "item";
  };

  let editable = true;

  return (
    <>
      {allStatus.map((status, sIndex) => (
        <div
          className="statusBox"
          key={status.key}
          onDragEnter={dragging ? (e) => handleDragEnter(e, sIndex) : undefined}
        >
          <h1>{status.value}</h1>
          <div>
            {items
              .filter((item) => item.name !== "")
              .filter((item) => item.status === status.key)
              .map((item, index) => (
                <div
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  onDragEnter={
                    dragging ? (e) => handleDragEnter(e, sIndex) : undefined
                  }
                  className={dragging ? getStyles(item) : "item"}
                  key={`${item.name}${index}`}
                  onDoubleClick={() => (editable = !editable)}
                  contentEditable={editable}
                >
                  {item.name}
                </div>
              ))}
          </div>
        </div>
      ))}
    </>
  );
};
