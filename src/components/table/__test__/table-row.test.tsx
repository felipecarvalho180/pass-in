import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TableRow } from "../table-row";

describe("Table Row", () => {
  it("should render a <tr> element with the provided props and className", () => {
    const props = { prop1: "value1", prop2: "value2" };
    const className = "custom-class";

    render(<TableRow {...props} className={className} />);

    expect(screen.getByRole("row").getAttribute("prop1")).toBe("value1");
    expect(screen.getByRole("row").getAttribute("prop2")).toBe("value2");
    expect(screen.getByRole("row").className).toContain("custom-class");
  });

  it("should render a <tr> element without prop1 when prop1 is not provided", () => {
    const props = { prop2: "value2" };

    // @ts-ignore
    render(<TableRow {...props} />);

    expect(screen.getByRole("row").getAttribute("prop1")).not.toBe("value1");
    expect(screen.getByRole("row").getAttribute("prop2")).toBe("value2");
  });
});
