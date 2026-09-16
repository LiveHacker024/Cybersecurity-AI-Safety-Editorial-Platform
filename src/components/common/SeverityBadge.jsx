import React from 'react';
import { AlertOctagon, ShieldAlert, AlertCircle, Info } from 'lucide-react';

export default function SeverityBadge({ severity = "CRITICAL", cvss = null }) {
  const configs = {
    CRITICAL: {
      label: "CRITICAL",
      icon: AlertOctagon,
      bg: "rgba(239, 68, 68, 0.15)",
      border: "rgba(239, 68, 68, 0.4)",
      color: "#ef4444"
    },
    HIGH: {
      label: "HIGH",
      icon: ShieldAlert,
      bg: "rgba(249, 115, 22, 0.15)",
      border: "rgba(249, 115, 22, 0.4)",
      color: "#f97316"
    },
    MEDIUM: {
      label: "MEDIUM",
      icon: AlertCircle,
      bg: "rgba(234, 179, 8, 0.15)",
      border: "rgba(234, 179, 8, 0.4)",
      color: "#eab308"
    },
    LOW: {
      label: "LOW",
      icon: Info,
      bg: "rgba(56, 189, 248, 0.15)",
      border: "rgba(56, 189, 248, 0.4)",
      color: "#38bdf8"
    }
  };

  const key = severity.toUpperCase();
  const current = configs[key] || configs.MEDIUM;
  const IconComponent = current.icon;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.2rem 0.65rem',
        background: current.bg,
        border: `1px solid ${current.border}`,
        borderRadius: '6px',
        color: current.color,
        fontSize: '0.75rem',
        fontWeight: 700,
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.03em'
      }}
    >
      <IconComponent size={13} />
      <span>{current.label}</span>
      {cvss && (
        <span
          style={{
            marginLeft: '0.2rem',
            padding: '0.05rem 0.35rem',
            borderRadius: '4px',
            background: 'rgba(0, 0, 0, 0.4)',
            color: '#ffffff',
            fontSize: '0.7rem'
          }}
        >
          CVSS {cvss}
        </span>
      )}
    </span>
  );
}
