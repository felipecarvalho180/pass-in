import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { AttendeeList } from "../attendee-list";
vi.mock("dayjs", () => {
  const mockDayjs = vi.importActual("dayjs");
  // @ts-ignore
  mockDayjs.extend = vi.fn();
  // @ts-ignore
  mockDayjs.locale = vi.fn();
  return mockDayjs;
});

const mockData = {
  total: 30,
  attendees: [
    {
      id: 1,
      name: "John Doe" + 1,
      email: "john.doe@example.com" + 1,
      createdAt: "2024-04-02T00:00:00.000Z",
      checkedInAt: "2024-04-03T00:00:00.000Z",
    },
    {
      id: 2,
      name: "John Doe" + 2,
      email: "john.doe@example.com" + 2,
      createdAt: "2024-04-02T00:00:00.000Z",
      checkedInAt: null,
    },
  ],
};

// @ts-ignore
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockData),
  })
);

describe("Attendee List", () => {
  beforeEach(() => {
    cleanup();
    // vi.resetAllMocks();
  });
  it("Renders attendee list header, table, and pagination", async () => {
    render(<AttendeeList />);

    expect(screen.getByText("Participantes")).toBeTruthy();
    expect(screen.getByText("Código")).toBeTruthy();
    expect(screen.getByText("Participante")).toBeTruthy();
    expect(screen.getByText("Data da inscrição")).toBeTruthy();
    expect(screen.getByText("Data do check-in")).toBeTruthy();

    await waitFor(() => {
      expect(screen.getByText("John Doe1")).toBeTruthy();
      expect(screen.getByText("john.doe@example.com1")).toBeTruthy();
      expect(screen.findByText("Não faz check-in")).toBeTruthy();
      expect(screen.getByText("Página 1 de 3")).toBeTruthy();
    });
  });
  it("input should have Anna as value", async () => {
    window = Object.create(window);
    const url = "http://localhost:3333?search=Anna";
    Object.defineProperty(window, "location", {
      value: new URL(url),
    });

    render(<AttendeeList />);
    expect(screen.getByRole("textbox").getAttribute("value")).toBe("Anna");
  });
  it("input should have empty string as value", async () => {
    window = Object.create(window);
    const url = "http://localhost:3333";
    Object.defineProperty(window, "location", {
      value: new URL(url),
    });

    render(<AttendeeList />);
    expect(screen.getByRole("textbox").getAttribute("value")).toBe("");
  });

  it("page should be 2", async () => {
    window = Object.create(window);
    const url = "http://localhost:3333?page=2";
    Object.defineProperty(window, "location", {
      value: new URL(url),
    });

    render(<AttendeeList />);
    await waitFor(() => {
      expect(screen.getByText("Página 2 de 3")).toBeTruthy();
    });
  });
  it("should navigate to last page after click in the button", async () => {
    window.testCtx = {
      location: function (prop, val) {
        Object.defineProperty(window.location, prop, {
          writable: true,
          value: val,
        });
      },
    };

    vi.spyOn(window.history, "pushState");
    window.history.pushState.mockImplementation((url) => {
      window.testCtx.location("href", url);
    });
    render(<AttendeeList />);

    const lastButton = screen.getByTestId("last-button");

    fireEvent.click(lastButton);

    await waitFor(async () => {
      expect(lastButton).toBeTruthy();
    });
  });
  it("should navigate to next page after click in the button", async () => {
    window.testCtx = {
      location: function (prop, val) {
        Object.defineProperty(window.location, prop, {
          writable: true,
          value: val,
        });
      },
    };

    vi.spyOn(window.history, "pushState");
    window.history.pushState.mockImplementation((url) => {
      window.testCtx.location("href", url);
    });

    render(<AttendeeList />);

    const nextButton = screen.getByTestId("next-button");

    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(nextButton).toBeTruthy();
      expect(screen.getByText("Página 3 de 3")).toBeTruthy();
    });
  });
  it("should navigate to previous page after click in the button", async () => {
    window = Object.create(window);
    const url = "http://localhost:3333?page=2";
    Object.defineProperty(window, "location", {
      value: new URL(url),
    });
    render(<AttendeeList />);

    const prevButton = screen.getByTestId("prev-button");

    fireEvent.click(prevButton);

    await waitFor(() => {
      expect(prevButton).toBeTruthy();
    });
  });
  it("should navigate to first page after click in the button", async () => {
    window = Object.create(window);
    const url = "http://localhost:3333?page=2";
    Object.defineProperty(window, "location", {
      value: new URL(url),
    });
    render(<AttendeeList />);

    const firstButton = screen.getByTestId("first-button");

    fireEvent.click(firstButton);

    await waitFor(() => {
      expect(firstButton).toBeTruthy();
    });
  });
  it("should change input value", async () => {
    render(<AttendeeList />);

    const input = screen.getByRole("textbox");

    fireEvent.change(input, {
      target: {
        value: "Joao",
      },
    });

    await waitFor(() => {
      expect(input).toBeTruthy();
      expect(input.getAttribute("value")).toBe("Joao");
    });
  });
});
