import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { SecurityAnalyzer } from "../../../../src/components/SecurityAnalyzer";
import { useUrlValidation } from "../../../../src/hooks/useUrlValidation";
import { useAnalysisProgress } from "../../../../src/hooks/useAnalysisProgress";
import { useSecurityAnalysis } from "../../../../src/hooks/useSecurityAnalysis";
import { SecurityReport as SecurityReportType } from "../../../../src/types/security";
import { ToastProvider } from "../../../../src/components/ui/toast";

vi.mock("../../../../src/hooks/useUrlValidation");
vi.mock("../../../../src/hooks/useAnalysisProgress");
vi.mock("../../../../src/hooks/useSecurityAnalysis");
vi.mock("../../../../src/lib/analytics", () => ({
  trackEvent: vi.fn(),
}));

type MockedHook<T> = {
  mockReturnValue: (value: T) => void;
};

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ToastProvider>{ui}</ToastProvider>);
};

describe("SecurityAnalyzer", () => {
  const mockValidateUrl = vi.fn();
  const mockStartProgress = vi.fn();
  const mockCompleteProgress = vi.fn();
  const mockResetProgress = vi.fn();
  const mockAnalyzeUrl = vi.fn();
  const mockSetReport = vi.fn();
  const mockResetAnalysis = vi.fn();

  beforeEach(() => {
    (
      useUrlValidation as unknown as MockedHook<{
        validateUrl: typeof mockValidateUrl;
      }>
    ).mockReturnValue({
      validateUrl: mockValidateUrl,
    });

    (
      useAnalysisProgress as unknown as MockedHook<{
        progress: number;
        isAnalyzing: boolean;
        startProgress: typeof mockStartProgress;
        completeProgress: typeof mockCompleteProgress;
        resetProgress: typeof mockResetProgress;
      }>
    ).mockReturnValue({
      progress: 0,
      isAnalyzing: false,
      startProgress: mockStartProgress,
      completeProgress: mockCompleteProgress,
      resetProgress: mockResetProgress,
    });

    (
      useSecurityAnalysis as unknown as MockedHook<{
        report: SecurityReportType | null;
        setReport: typeof mockSetReport;
        analyzeUrl: typeof mockAnalyzeUrl;
        resetAnalysis: typeof mockResetAnalysis;
      }>
    ).mockReturnValue({
      report: null,
      setReport: mockSetReport,
      analyzeUrl: mockAnalyzeUrl,
      resetAnalysis: mockResetAnalysis,
    });
    vi.clearAllMocks();
  });

  it("should render the initial state correctly", () => {
    renderWithProviders(<SecurityAnalyzer />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should show SecurityFeatures when there is no report", () => {
    renderWithProviders(<SecurityAnalyzer />);
    expect(screen.getByTestId("security-features")).toBeInTheDocument();
  });

  it("should not validate invalid URLs", async () => {
    mockValidateUrl.mockReturnValue(false);
    renderWithProviders(<SecurityAnalyzer />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    await act(async () => {
      fireEvent.change(input, { target: { value: "invalid-url" } });
      fireEvent.click(button);
    });

    expect(mockAnalyzeUrl).not.toHaveBeenCalled();
  });

  it("should start analysis for valid URLs", async () => {
    const mockCleanup = vi.fn();
    mockValidateUrl.mockReturnValue(true);
    mockAnalyzeUrl.mockResolvedValue({
      url: "https://example.com",
      overallScore: 85,
      riskLevel: "LOW",
      isSecure: true,
      threats: {
        malware: { detected: false },
        phishing: { detected: false },
        dataTheft: { detected: false },
        maliciousCookies: { detected: false },
        unsafeDownloads: { detected: false },
      },
      ssl: {
        enabled: true,
        valid: true,
        grade: "A",
      },
      privacy: {
        trackers: 0,
        cookieCount: 0,
        dataCollection: [],
      },
      details: [],
    });
    mockStartProgress.mockReturnValue(mockCleanup);

    renderWithProviders(<SecurityAnalyzer />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    await act(async () => {
      fireEvent.change(input, { target: { value: "https://example.com" } });
      fireEvent.click(button);
    });

    // Esperar a que se complete el análisis
    await act(async () => {
      await Promise.resolve();
    });

    expect(mockStartProgress).toHaveBeenCalled();
    expect(mockAnalyzeUrl).toHaveBeenCalledWith("https://example.com");
    expect(mockSetReport).toHaveBeenCalled();
    expect(mockCompleteProgress).toHaveBeenCalled();
    expect(mockCleanup).toHaveBeenCalled();
  });

  it("should show SecurityReport when analysis is complete", async () => {
    const mockReport: SecurityReportType = {
      url: "https://example.com",
      overallScore: 85,
      riskLevel: "LOW",
      isSecure: true,
      threats: {
        malware: { detected: false },
        phishing: { detected: false },
        dataTheft: { detected: false },
        maliciousCookies: { detected: false },
        unsafeDownloads: { detected: false },
      },
      ssl: {
        enabled: true,
        valid: true,
        grade: "A",
      },
      privacy: {
        trackers: 0,
        cookieCount: 0,
        dataCollection: [],
      },
      details: [],
    };

    (
      useSecurityAnalysis as unknown as MockedHook<{
        report: SecurityReportType;
        setReport: typeof mockSetReport;
        analyzeUrl: typeof mockAnalyzeUrl;
        resetAnalysis: typeof mockResetAnalysis;
      }>
    ).mockReturnValue({
      report: mockReport,
      setReport: mockSetReport,
      analyzeUrl: mockAnalyzeUrl,
      resetAnalysis: mockResetAnalysis,
    });

    renderWithProviders(<SecurityAnalyzer />);
    expect(screen.getByTestId("security-report")).toBeInTheDocument();
  });

  it("should reset analysis when clicking analyze new", async () => {
    const mockReport: SecurityReportType = {
      url: "https://example.com",
      overallScore: 85,
      riskLevel: "LOW",
      isSecure: true,
      threats: {
        malware: { detected: false },
        phishing: { detected: false },
        dataTheft: { detected: false },
        maliciousCookies: { detected: false },
        unsafeDownloads: { detected: false },
      },
      ssl: {
        enabled: true,
        valid: true,
        grade: "A",
      },
      privacy: {
        trackers: 0,
        cookieCount: 0,
        dataCollection: [],
      },
      details: [],
    };

    (
      useSecurityAnalysis as unknown as MockedHook<{
        report: SecurityReportType;
        setReport: typeof mockSetReport;
        analyzeUrl: typeof mockAnalyzeUrl;
        resetAnalysis: typeof mockResetAnalysis;
      }>
    ).mockReturnValue({
      report: mockReport,
      setReport: mockSetReport,
      analyzeUrl: mockAnalyzeUrl,
      resetAnalysis: mockResetAnalysis,
    });

    renderWithProviders(<SecurityAnalyzer />);
    const resetButton = screen.getByText("Analyze New URL");

    await act(async () => {
      fireEvent.click(resetButton);
    });

    expect(mockResetAnalysis).toHaveBeenCalled();
    expect(mockResetProgress).toHaveBeenCalled();
  });
});
