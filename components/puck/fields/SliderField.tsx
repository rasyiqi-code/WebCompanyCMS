import React from "react";

export type SliderFieldProps = {
    value: string | number;
    onChange: (value: string | number) => void;
    label?: string; // Puck might pass label but we usually handle it in the wrapper or ignore
    min?: number;
    max?: number;
    step?: number;
    unit?: string;
    defaultValue?: string | number;
    useUnits?: boolean;
};

export const SliderField = ({
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    unit = "px",
    defaultValue = 0,
    useUnits = true
}: SliderFieldProps) => {
    // Helper to safely parse any input to a number
    const parseValue = (val: string | number | undefined | null): number => {
        if (typeof val === 'number') return val;
        if (typeof val === 'string') return parseFloat(val);
        return 0;
    };

    const inputValue = value !== undefined && value !== null ? value : defaultValue;
    const numericValue = parseValue(inputValue);

    // Determine the current unit
    // If input is string "20px", extract "px". If number 20, use default 'unit'.
    // If useUnits is false, strictly using empty string or ignoring it.
    const extractUnit = (val: string | number) => {
        if (!useUnits) return "";
        if (typeof val === 'string') {
            const match = val.replace(/[0-9.-]/g, '');
            return match || unit;
        }
        return unit;
    };

    const currentUnit = extractUnit(inputValue);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = parseFloat(e.target.value);
        if (isNaN(newVal)) return;

        if (useUnits) {
            onChange(`${newVal}${currentUnit}`);
        } else {
            onChange(newVal);
        }
    };

    const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newUnit = e.target.value;
        onChange(`${numericValue}${newUnit}`);
    };

    return (
        <div style={{ padding: "8px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={numericValue}
                    onChange={handleChange}
                    style={{ flex: 1, cursor: "pointer" }}
                />
                <input
                    type="number"
                    min={min}
                    max={max}
                    step={step}
                    value={numericValue}
                    onChange={handleChange}
                    style={{
                        width: "60px",
                        padding: "4px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        fontSize: "12px"
                    }}
                />
                {useUnits && (
                    <select
                        value={currentUnit}
                        onChange={handleUnitChange}
                        style={{
                            width: "50px",
                            padding: "4px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            fontSize: "12px"
                        }}
                    >
                        <option value="px">px</option>
                        <option value="%">%</option>
                        <option value="vh">vh</option>
                        <option value="vw">vw</option>
                        <option value="em">em</option>
                        <option value="rem">rem</option>
                    </select>
                )}
            </div>
        </div>
    );
};
