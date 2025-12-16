import React from "react";

type ColorPickerFieldProps = {
    value: string;
    onChange: (value: string) => void;
};

export const ColorPickerField = ({ value, onChange }: ColorPickerFieldProps) => {
    const safeValue = value || "#ffffff";

    return (
        <div style={{ padding: "8px 0", display: "flex", gap: "8px", alignItems: "center" }}>
            <div style={{
                position: "relative",
                width: "32px",
                height: "32px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                overflow: "hidden",
                flexShrink: 0
            }}>
                <input
                    type="color"
                    value={safeValue.startsWith("#") ? safeValue : "#000000"} // Input color needs hex
                    onChange={(e) => {
                        if (e.target.value !== value) {
                            onChange(e.target.value);
                        }
                    }}
                    style={{
                        position: "absolute",
                        top: "-50%",
                        left: "-50%",
                        width: "200%",
                        height: "200%",
                        cursor: "pointer",
                        border: "none",
                        padding: 0,
                        margin: 0
                    }}
                />
            </div>
            <input
                type="text"
                value={value || ""}
                placeholder="#RRGGBB or rgba(...)"
                onChange={(e) => onChange(e.target.value)}
                style={{
                    flex: 1,
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    fontSize: "12px",
                    fontFamily: "monospace"
                }}
            />
        </div>
    );
};
