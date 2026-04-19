import React, { useState } from "react";
import { SliderField } from "./SliderField"; // Re-use the existing basic slider

// Icons (Simple SVGs)
const DesktopIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
);
const TabletIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
);
const MobileIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
);

export type ResponsiveValue = {
    desktop?: number | string;
    tablet?: number | string;
    mobile?: number | string;
};

type ResponsiveSliderFieldProps = {
    value: ResponsiveValue;
    onChange: (value: ResponsiveValue) => void;
    label?: string;
    unit?: string;
    max?: number;
    min?: number;
    step?: number;
    defaultValue?: number | ResponsiveValue;
};

export const ResponsiveSliderField = ({
    value = {},
    onChange,
    label,
    unit = "px",
    max = 100,
    min = 0,
    step = 1,
    defaultValue = 0
}: ResponsiveSliderFieldProps) => {
    const [mode, setMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

    // Helper to get current value safely
    const getCurrentValue = () => {
        const val = value?.[mode];

        // If explicit value exists, use it
        if (val !== undefined && val !== null) {
            return val;
        }

        // Inheritance logic for existing values
        if (mode === 'tablet' && value?.desktop !== undefined) return value.desktop;
        if (mode === 'mobile') {
            if (value?.tablet !== undefined) return value.tablet;
            if (value?.desktop !== undefined) return value.desktop;
        }

        // If no value in `value` object, use `defaultValue`
        if (typeof defaultValue === 'number') return defaultValue;

        // Handle object defaultValue
        const def = defaultValue as ResponsiveValue;
        const defVal = def?.[mode];
        if (defVal !== undefined) return defVal;

        // Inheritance for defaultValue
        if (mode === 'tablet' && def?.desktop !== undefined) return def.desktop;
        if (mode === 'mobile') {
            if (def?.tablet !== undefined) return def.tablet;
            if (def?.desktop !== undefined) return def.desktop;
        }

        return 0;
    };

    const handleChange = (newVal: any) => {
        onChange({
            ...value,
            [mode]: newVal
        });
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {/* Header with Label and Toggles */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                {label && <label style={{ fontSize: "14px", fontWeight: 500, color: "#374151" }}>{label}</label>}

                <div style={{ display: "flex", backgroundColor: "#f3f4f6", borderRadius: "6px", padding: "2px" }}>
                    <button
                        onClick={() => setMode("desktop")}
                        style={{
                            padding: "4px 8px",
                            border: "none",
                            background: mode === "desktop" ? "white" : "transparent",
                            boxShadow: mode === "desktop" ? "0 1px 2px rgba(0,0,0,0.1)" : "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            color: mode === "desktop" ? "#111827" : "#6b7280",
                            display: 'flex', alignItems: 'center'
                        }}
                        title="Desktop"
                    >
                        <DesktopIcon />
                    </button>
                    <button
                        onClick={() => setMode("tablet")}
                        style={{
                            padding: "4px 8px",
                            border: "none",
                            background: mode === "tablet" ? "white" : "transparent",
                            boxShadow: mode === "tablet" ? "0 1px 2px rgba(0,0,0,0.1)" : "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            color: mode === "tablet" ? "#111827" : "#6b7280",
                            display: 'flex', alignItems: 'center'
                        }}
                        title="Tablet"
                    >
                        <TabletIcon />
                    </button>
                    <button
                        onClick={() => setMode("mobile")}
                        style={{
                            padding: "4px 8px",
                            border: "none",
                            background: mode === "mobile" ? "white" : "transparent",
                            boxShadow: mode === "mobile" ? "0 1px 2px rgba(0,0,0,0.1)" : "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            color: mode === "mobile" ? "#111827" : "#6b7280",
                            display: 'flex', alignItems: 'center'
                        }}
                        title="Mobile"
                    >
                        <MobileIcon />
                    </button>
                </div>
            </div>

            {/* The Actual Slider Input */}
            <SliderField
                value={getCurrentValue()}
                onChange={handleChange}
                unit={unit}
                max={max}
                min={min}
                step={step}
                useUnits={false} // Force unit handling logic if needed, but here simple numbers usually suffice for responsiveness
            />

            {/* Helper Text to indicate what is being edited */}
            <div style={{ fontSize: "11px", color: "#9ca3af", textAlign: "right", marginTop: "-4px" }}>
                Editing {mode.charAt(0).toUpperCase() + mode.slice(1)} Value
            </div>
        </div>
    );
};
