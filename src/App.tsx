import React, { useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([{name: ''}]);
  return (
    <div className="App">
      <header className="App-header">
        <p>Kanbanboard</p>
      </header>
      <CreateItemForm items={items} setItems ={setItems}/>
      {/* <LooseItemsBox items={items} setItems ={setItems}/> */}
    </div>
  );
}

export default App;

type itemsType = {name: string}[]
interface createItemProps  {
  items:itemsType; 
  setItems: (i:itemsType)=>void ;
}
const CreateItemForm = ((props:createItemProps) => {
  const {items,setItems} = props;
 const [itemName,setItemName] = React.useState('');
  
  const handleSubmit = (evt:any) => {
      evt.preventDefault();
      items.push({name: itemName});
      console.log(items);
      setItems(items);
      setItemName('');   
  }
  return (
    <>
    <form onSubmit={handleSubmit}>
      <label>
        Item: 
        <input
          type="text"
          value={itemName}
          onChange={e =>(setItemName(e.target.value))}
        />
      </label>
      <button type="submit" value="Create" >Create</button>
    </form>
    {/* <span>{itemName}</span> */}
    {items.map((item, index)=>{
      return(
      <div>
       { `item ${index} : ${item.name}`}
      </div>
      )
    })}
    </>
  );
});

const LooseItemsBox = ((props:{
  items:itemsType; 
  setItems: (i:itemsType)=>void ;
})=> {
  const {items,setItems} = props;
  return (
    <>
    {items.map((item)=>{
      <div>
        {item.name}
      </div>
    })}
  </>
  );
});
