import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { GildedRose, Item } from "../utils/GildedRose";

const initialItems: Item[] = [
  new Item("Aged Brie", 2, 0),
  new Item("Conjured Mana Cake", 3, 6),
  new Item("Sulfuras, Hand of Ragnaros", 0, 80),
  new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #f3f3f3 25%, #f9f9f9 100%);
  min-height: 100vh;
  font-family: "Arial", sans-serif;
`;

const Title = styled.h1`
  font-size: 2.5em;
  color: #333;
  margin-bottom: 20px;
`;

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 600px;
`;

const ItemEntry = styled.li`
  background: #fff;
  border: 1px solid #ddd;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2em;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: 3px solid #0056b3;
  }
`;

const GildedRoseComponent: React.FC = () => {
  const [items, setItems] = useState<Item[]>(initialItems);

  const updateItems = useCallback(() => {
    const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality();
    setItems([...updatedItems]);
  }, [items]);

  return (
    <Container>
      <Title>Gilded Rose Inventory</Title>
      <ItemList aria-label="Gilded Rose Inventory List">
        {items.map((item) => (
          <ItemEntry key={item.name}>
            <span>{item.name}</span>
            <span>{item.sellIn} days</span>
            <span>Quality: {item.quality}</span>
          </ItemEntry>
        ))}
      </ItemList>
      <Button onClick={updateItems} aria-label="Update inventory quality">
        Update Quality
      </Button>
    </Container>
  );
};

export default GildedRoseComponent;
