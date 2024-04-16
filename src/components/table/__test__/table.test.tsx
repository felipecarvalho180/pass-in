import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Table } from "../table";

describe("Table", () => {
  it("should render a div element with the specified class name", () => {
    render(<Table />);
    const divElement = screen.getByTestId("table-div");

    expect(divElement).toBeTruthy();
    expect(divElement.className).toStrictEqual(
      "border border-white/10 rounded-lg"
    );
  });
  it("should render a table element with the specified class name", () => {
    render(<Table />);
    const tableElement = screen.getByRole("table");

    expect(tableElement).toBeTruthy();
    expect(tableElement.className).toStrictEqual("w-full");
  });
});
