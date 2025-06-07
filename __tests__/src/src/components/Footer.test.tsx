import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { Footer } from "../../../../src/components/Footer";
import { useLanguage } from "../../../../src/hooks/useLanguage";
import { translations } from "../../../../src/constants/translations";

vi.mock("../../../../src/hooks/useLanguage");

describe("Footer", () => {
  const mockT = vi.fn(
    (key) => translations.es[key as keyof typeof translations.es]
  );

  beforeEach(() => {
    (useLanguage as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      t: mockT,
    });
  });

  it("should render the footer component", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("should display the SecureCheck title and logo", () => {
    render(<Footer />);
    expect(screen.getByText("SecureCheck")).toBeInTheDocument();
    expect(screen.getByTestId("shield-icon")).toBeInTheDocument();
  });

  it("should display the threat detection section", () => {
    render(<Footer />);
    expect(screen.getByText("Detección de Amenazas")).toBeInTheDocument();
    expect(screen.getByText(/•\s*Detección de Malware/)).toBeInTheDocument();
    expect(screen.getByText(/•\s*Intento de Phishing/)).toBeInTheDocument();
    expect(screen.getByText(/•\s*Análisis de Privacidad/)).toBeInTheDocument();
    expect(screen.getByText(/•\s*Verificación SSL\/TLS/)).toBeInTheDocument();
    expect(screen.getByText(/•\s*Inspección de Cookies/)).toBeInTheDocument();
  });

  it("should display the about section", () => {
    render(<Footer />);
    expect(screen.getByText("Acerca de SecureCheck")).toBeInTheDocument();
    expect(
      screen.getAllByText(
        /SecureCheck es un analizador avanzado de seguridad de URL/
      )[0]
    ).toBeInTheDocument();
  });

  it("should display the copyright notice", () => {
    render(<Footer />);
    const copyrightText = screen.getByText(/© 2024/);
    expect(copyrightText).toBeInTheDocument();
    expect(copyrightText).toHaveTextContent("SecureCheck");
  });

  it("should use translations for all text content", () => {
    render(<Footer />);

    expect(mockT).toHaveBeenCalledWith("secureCheckTitle");
    expect(mockT).toHaveBeenCalledWith("secureCheckDescription");
    expect(mockT).toHaveBeenCalledWith("threatDetection");
    expect(mockT).toHaveBeenCalledWith("malwareDetection");
    expect(mockT).toHaveBeenCalledWith("phishingAttempt");
    expect(mockT).toHaveBeenCalledWith("privacyAnalysis");
    expect(mockT).toHaveBeenCalledWith("sslTlsCheck");
    expect(mockT).toHaveBeenCalledWith("cookieInspection");
    expect(mockT).toHaveBeenCalledWith("aboutSecureCheck");
  });
});
