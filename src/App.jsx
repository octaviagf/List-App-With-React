import { useState } from "react";
import "./index.css";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  }

  return (
    <div>
      <Header />
      <Form onAddItems={handleAddItems} />
      <List
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <h1>
        <img src="notes.png" alt="Notes"></img>
      </h1>
    </div>
  );
}

function Form({ onAddItems }) {
  const [item, setItem] = useState("");

  function handleSubtmit(e) {
    e.preventDefault();

    if (!item) return;

    const newItem = { item, done: false, id: Date.now() };

    onAddItems(newItem);
    console.log(newItem);

    setItem("");
  }

  return (
    <div>
      <form onSubmit={handleSubtmit}>
        <input
          type="text"
          placeholder="Item"
          className="input"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        ></input>
        <button type="submit" className="btn">
          Add
        </button>
      </form>
    </div>
  );
}

function List({ items, onDeleteItem, onToggleItem }) {
  return (
    <div>
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <div>
      <li>
        <input
          type="checkbox"
          value={item.done}
          onChange={() => onToggleItem(item.id)}
        />
        <span style={item.done ? { textDecoration: "line-through" } : {}}>
          {item.item}
        </span>
        <button onClick={() => onDeleteItem(item.id)}>❌</button>
      </li>
    </div>
  );
}
