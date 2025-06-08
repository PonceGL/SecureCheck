import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { AnalysisCard } from "../../../../../src/components/analysis/AnalysisCard";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/constants/translations";
import { useAnalysisForm } from "@/hooks/useAnalysisForm";
import {
  RiskLevel,
  Threats,
  Threat,
  Privacy,
  SecurityDetail,
} from "@/types/security";
import { ToastProvider } from "@/components/ui/toast";

// Mock de los hooks
vi.mock("@/hooks/useLanguage");
vi.mock("@/hooks/useAnalysisForm");

const renderWithToast = (ui: React.ReactElement) => {
  return render(<ToastProvider>{ui}</ToastProvider>);
};

describe("AnalysisCard", () => {
  const mockT = vi.fn(
    (key) => translations.es[key as keyof typeof translations.es]
  );
  const mockOnAnalyze = vi.fn();
  const mockOnAnalyzeNew = vi.fn();
  const mockRegister = vi.fn();
  const mockHandleSubmit = vi.fn((fn) => fn);
  const mockReset = vi.fn();
  const mockHandleClick = vi.fn();

  const defaultProps = {
    isAnalyzing: false,
    progress: 0,
    onAnalyze: mockOnAnalyze,
  };

  const mockReport = {
    url: "https://example.com",
    score: 85,
    timestamp: new Date().toISOString(),
    threats: {
      malware: { detected: false, details: {} } as Threat,
      phishing: { detected: false, details: {} } as Threat,
      dataTheft: { detected: false, details: {} } as Threat,
      maliciousCookies: { detected: false, details: {} } as Threat,
      unsafeDownloads: { detected: false, details: {} } as Threat,
    },
    privacy: {
      trackers: 0,
      cookieCount: 0,
      dataCollection: [],
    } as Privacy,
    ssl: {
      enabled: true,
      valid: true,
      grade: "A",
    },
    overallScore: 85,
    riskLevel: "LOW" as RiskLevel,
    isSecure: true,
    details: [
      {
        category: "threats",
        issue: "No threats detected",
        severity: "LOW" as RiskLevel,
        description: "No security threats were found",
        explanation: "The website appears to be secure",
        risks: [],
        targetedInfo: [],
        consequences: "None",
        dataCollected: [],
        impact: "None",
      },
    ] as SecurityDetail[],
  };

  beforeEach(() => {
    (useLanguage as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      t: mockT,
    });

    vi.mocked(useAnalysisForm).mockReturnValue({
      register: mockRegister,
      handleSubmit: mockHandleSubmit,
      reset: mockReset,
      errors: {},
      onSubmit: vi.fn(),
      handleClick: mockHandleClick,
    });
  });

  it("should render the analysis card", () => {
    renderWithToast(<AnalysisCard {...defaultProps} />);
    expect(
      screen.getByRole("heading", { name: /Análisis de Seguridad de URL/ })
    ).toBeInTheDocument();
  });

  it("should display the analysis form", () => {
    renderWithToast(<AnalysisCard {...defaultProps} />);
    expect(
      screen.getByPlaceholderText(/Ingrese URL para analizar/)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Analizar/ })
    ).toBeInTheDocument();
  });

  it("should show progress bar when analyzing", () => {
    renderWithToast(
      <AnalysisCard {...defaultProps} isAnalyzing={true} progress={50} />
    );
    expect(
      screen.getByText("Analizando amenazas de seguridad...")
    ).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should not show progress bar when not analyzing", () => {
    renderWithToast(<AnalysisCard {...defaultProps} />);
    expect(
      screen.queryByText("Analizando amenazas de seguridad...")
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });

  it("should show analysis actions when report is available", () => {
    renderWithToast(
      <AnalysisCard
        {...defaultProps}
        report={mockReport}
        onAnalyzeNew={mockOnAnalyzeNew}
      />
    );
    expect(screen.getByText("Analizar Nueva URL")).toBeInTheDocument();
    expect(screen.getByText("Compartir Resultado")).toBeInTheDocument();
  });

  it("should not show analysis actions when no report is available", () => {
    renderWithToast(<AnalysisCard {...defaultProps} />);
    expect(screen.queryByText("Analizar Nueva URL")).not.toBeInTheDocument();
    expect(screen.queryByText("Compartir Resultado")).not.toBeInTheDocument();
  });

  it("should call onAnalyzeNew when clicking analyze new button", () => {
    renderWithToast(
      <AnalysisCard
        {...defaultProps}
        report={mockReport}
        onAnalyzeNew={mockOnAnalyzeNew}
      />
    );

    fireEvent.click(screen.getByText("Analizar Nueva URL"));
    expect(mockReset).toHaveBeenCalled();
    expect(mockOnAnalyzeNew).toHaveBeenCalled();
  });

  it("should use translations for all text content", () => {
    renderWithToast(<AnalysisCard {...defaultProps} />);

    expect(mockT).toHaveBeenCalledWith("enterUrl");
    expect(mockT).toHaveBeenCalledWith("analyze");
    expect(mockT).toHaveBeenCalledWith("analyzingSecurityThreats");
  });
});
