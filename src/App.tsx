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
      <LooseItemsBox items={items}/>
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
      setItems([...items,({name: itemName})]);
      console.log(items);
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
    <span>{itemName}</span>
    </>
  );
});

const LooseItemsBox = ((props:{
  items:itemsType; 
})=> {
  const {items} = props;
  return (
    <>
    {items.map((item,index)=>{
      return(
      <div key={`${item.name}${index}`}>
       { `item : ${item.name}`}
      </div>
      )
    })}
  </>
  );
});
