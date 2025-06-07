import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "../../../../src/components/Header";

describe("Header", () => {
  it("should render the header component", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("should display the SecureCheck title", () => {
    render(<Header />);
    expect(screen.getByText("SecureCheck")).toBeInTheDocument();
  });

  it("should display the URL Security Analyzer subtitle", () => {
    render(<Header />);
    expect(screen.getByText("URL Security Analyzer")).toBeInTheDocument();
  });

  it("should contain a link to the home page", () => {
    render(<Header />);
    const homeLink = screen.getByRole("link");
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("should render the Shield icon", () => {
    render(<Header />);
    const shieldIcon = screen.getByTestId("shield-icon");
    expect(shieldIcon).toBeInTheDocument();
  });
});
