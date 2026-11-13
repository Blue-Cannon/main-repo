// eas.tools.js
// Blue Cannon Statement Organization 1.0
// Connects your GitHub project to EAS Tools settings
// This file does NOT contain any secret key. Never put secret here.

const EAS_TOOLS_CONFIG = {
  orgName: "Blue-Cannon",
  version: "1.0",
  location: "Teachers Camp, Baguio City, Philippines",
  senderId: "GITHUB01", // Must be exactly 8 chars
  originator: "CIV", // Civil Authorities
  eventType: "CEM", // Civil Emergency Message
  eventName: "Civil Emergency Message",
  durationHours: 0,
  durationMinutes: 15,
  initialDelay: 3.0, // 3.0 for demo / practice, 0 for REAL
  attentionSignal: "Default Combined Frequency",
  attentionTone: "EBS / Dual Frequency Attention",
  attentionDurationSeconds: 10,
  audio: {
    voice: "Text-to-Speech",
    ttsEngine: "[WASM] WebAssembly (local)",
    volumeDb: 0,
    autoLevel: true,
    preAlertAudio: "None",
    postAlertAudio: "None",
  },
  silenceTimingsMs: {
    beforeHeaderTones: 1000,
    headerToAttention: 1000,
    attentionToVoice: 1000,
    voiceToEOM: 1000,
    eomToEnd: 1000,
  },
  headerPreview: "ZCZC-CIV-CEM-506037+0015-3172151-GITHUB01-",
  // NOTE: Header says California / Los Angeles because EAS Tools is US-only.
  // Real location is in the message text below: Teachers Camp, Baguio City.
};

// 7 security issues your org handles - reported by humans, NOT auto-detected
const SECURITY_ISSUES = [
  "Secret Leak",
  "Critical Bug",
  "Unauthorized Access",
  "Data Breach",
  "Phishing Link",
  "Fake Account",
  "Malware",
];

// Build TTS text - uses "reported" NOT "detected"
// Because machine does NOT know - human reports it
function buildSecurityAlertText(issues) {
  const list = issues.join(", ");
  return `Attention. Security Alert from our GitHub Organization in Teachers Camp, Baguio City. Members reported ${issues.length} issues. ${list}. Please check GitHub immediately and secure the repository.`;
}

// Full combined 1-7 alert
function buildCombinedAlertText() {
  return buildSecurityAlertText(SECURITY_ISSUES);
}

// Single issue alert - example: buildSecurityAlertText(["Secret Leak"])
function buildSingleAlertText(issue) {
  return `Attention. Security Alert from our GitHub Organization in Teachers Camp, Baguio City. Members reported ${issue}. Please check GitHub immediately and secure the repository.`;
}

// Workflow: Report -> Verify -> Alert -> Fix
// 1. User reports in GitHub > Security > Report a vulnerability (PRIVATE)
// 2. You verify: is it REAL or NOT?
// 3. If REAL, staff fixes it
// 4. If FAKE, close it, do NOT send alert
function verifyReport(report) {
  // report = { isReal: true/false, type: "Secret Leak", file: "app.js" }
  // You must check manually in GitHub. This function does NOT auto-detect.
  if (!report || !report.isReal) {
    return { shouldAlert: false, reason: "Not real - do not send EAS alert" };
  }
  return {
    shouldAlert: true,
    config: EAS_TOOLS_CONFIG,
    ttsText: buildSingleAlertText(report.type),
    nextStep: "Send internal alert to staff ONLY. Do NOT broadcast to public TV/Radio.",
  };
}

// Export for Node / Browser
if (typeof module !== "undefined") {
  module.exports = {
    EAS_TOOLS_CONFIG,
    SECURITY_ISSUES,
    buildSecurityAlertText,
    buildCombinedAlertText,
    buildSingleAlertText,
    verifyReport,
  };
  }
