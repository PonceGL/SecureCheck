import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";

import App from "../../src/App";

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
    // Verificamos que el componente se renderiza sin errores
    expect(document.body).toBeTruthy();
  });

  it("renders the main navigation", () => {
    render(<App />);
    // Verificamos que el componente principal está presente
    expect(document.querySelector("main")).toBeTruthy();
  });
});
