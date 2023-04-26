import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
//fetching the data
function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [onchange, setonchange] = useState();
  const [items, setItems] = useState([]);

  //creating  new items

  useEffect(() => {
    fetch(" http://localhost:4000/items")
      .then((res) => res.json())
      .then((items) => setItems(items));
  }, [onchange]);

  function handleAddItem(newItem) {
    setonchange(newItem);
    console.log("In ShoppingList:", newItem);
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
