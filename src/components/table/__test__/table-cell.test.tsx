import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TableCell } from "../table-cell";

describe("Table Cell", () => {
  it("should render a <td> element with the provided props and className", () => {
    const props = { prop1: "value1", prop2: "value2" };
    const className = "custom-class";

    render(<TableCell {...props} className={className} />);

    expect(screen.getByRole("cell").getAttribute("prop1")).toBe("value1");
    expect(screen.getByRole("cell").getAttribute("prop2")).toBe("value2");
    expect(screen.getByRole("cell").className).toContain("custom-class");
  });

  it("should render a <td> element without prop1 when prop1 is not provided", () => {
    const props = { prop2: "value2" };

    // @ts-ignore
    render(<TableCell {...props} />);

    expect(screen.getByRole("cell").getAttribute("prop1")).not.toBe("value1");
    expect(screen.getByRole("cell").getAttribute("prop2")).toBe("value2");
  });
});
