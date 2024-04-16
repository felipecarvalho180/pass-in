import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TableHeader } from "../table-header";

describe("Table Cell", () => {
  it("should render a <th> element with the provided props and className", () => {
    const props = { prop1: "value1", prop2: "value2" };
    const className = "custom-class";

    render(<TableHeader {...props} className={className} />);

    expect(screen.getByRole("columnheader").getAttribute("prop1")).toBe(
      "value1"
    );
    expect(screen.getByRole("columnheader").getAttribute("prop2")).toBe(
      "value2"
    );
    expect(screen.getByRole("columnheader").className).toContain(
      "custom-class"
    );
  });

  it("should render a <th> element without prop1 when prop1 is not provided", () => {
    const props = { prop2: "value2" };

    // @ts-ignore
    render(<TableHeader {...props} />);

    expect(screen.getByRole("columnheader").getAttribute("prop1")).not.toBe(
      "value1"
    );
    expect(screen.getByRole("columnheader").getAttribute("prop2")).toBe(
      "value2"
    );
  });
});
