import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "../header";

describe("Header test", () => {
  it("should render nav links and logo", () => {
    render(<Header />);

    const eventLink = screen.getByText("Eventos");
    const usersLink = screen.getByText("Participantes");
    const logo = screen.getByAltText("logo");

    expect(logo).toBeTruthy();
    expect(eventLink).toBeTruthy();
    expect(usersLink).toBeTruthy();
  });
});
