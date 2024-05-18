import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import GildedRoseComponent from "../src/components/GildedRose";

describe("GildedRoseComponent", () => {
    test("renders the initial items", () => {
        render(<GildedRoseComponent />);

        expect(screen.getByText("Gilded Rose Inventory")).toBeInTheDocument();
        expect(screen.getByText("Aged Brie")).toBeInTheDocument();
        expect(screen.getByText("Conjured Mana Cake")).toBeInTheDocument();
        expect(screen.getByText("Sulfuras, Hand of Ragnaros")).toBeInTheDocument();
        expect(screen.getByText("Backstage passes to a TAFKAL80ETC concert")).toBeInTheDocument();
    });

    test("updates item qualities when 'Update Quality' button is clicked", () => {
        render(<GildedRoseComponent />);

        fireEvent.click(screen.getByRole("button", { name: /update inventory quality/i }));

        const agedBrieElement = screen.getByText("Aged Brie").closest("li");
        expect(agedBrieElement).toHaveTextContent("1 days");
        expect(agedBrieElement).toHaveTextContent("Quality: 1");

        const conjuredManaCakeElement = screen.getByText("Conjured Mana Cake").closest("li");
        expect(conjuredManaCakeElement).toHaveTextContent("2 days");
        expect(conjuredManaCakeElement).toHaveTextContent("Quality: 4");

        const sulfurasElement = screen.getByText("Sulfuras, Hand of Ragnaros").closest("li");
        expect(sulfurasElement).toHaveTextContent("0 days");
        expect(sulfurasElement).toHaveTextContent("Quality: 80");

        const backstagePassesElement = screen.getByText("Backstage passes to a TAFKAL80ETC concert").closest("li");
        expect(backstagePassesElement).toHaveTextContent("14 days");
        expect(backstagePassesElement).toHaveTextContent("Quality: 21");
    });
});
