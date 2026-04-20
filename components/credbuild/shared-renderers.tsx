import React from "react";
import { ColorPickerField } from "./fields/ColorPickerField";
import { ResponsiveSliderField } from "./fields/ResponsiveSliderField";
import { SliderField } from "./fields/SliderField";

export const RenderColorPicker = ({ value, onChange }: { value: any; onChange: (val: any) => void }) => (
  <ColorPickerField value={value} onChange={onChange} />
);

export const RenderSlider = ({ value, onChange, unit, max, min, step, defaultValue }: any) => (
  <SliderField value={value} onChange={onChange} unit={unit} max={max} min={min} step={step} defaultValue={defaultValue} />
);

export const RenderResponsiveSlider = ({ value, onChange, unit, max, min, step, defaultValue }: any) => (
  <ResponsiveSliderField value={value} onChange={onChange} unit={unit} max={max} min={min} step={step} defaultValue={defaultValue} />
);

// Specific common configurations
export const RenderResponsiveSliderRem = (props: any) => (
  <RenderResponsiveSlider {...props} unit="rem" max={6} step={0.1} />
);

export const RenderResponsiveSliderPx = (props: any) => (
  <RenderResponsiveSlider {...props} unit="px" max={200} />
);
