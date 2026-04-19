import type { ComponentConfig } from "@credbuild/core";
import { DropZone } from "@credbuild/core";
import { SliderField } from "./fields/SliderField";
import { ColorPickerField } from "./fields/ColorPickerField";
import React, { useId } from "react";

export type ContainerProps = {
    // --- LAYOUT ---
    containerLayout: "flex" | "grid";
    contentWidth: "boxed" | "full";
    width: string;
    minHeight: string;

    // Flex Specific
    flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
    flexWrap?: "nowrap" | "wrap";

    // Grid Specific
    gridColumns?: string;
    gridRows?: string;
    gridAutoFlow?: "row" | "column" | "row dense" | "column dense";

    // Unified Gaps (Apply to both Flex & Grid)
    columnGap?: string;
    rowGap?: string;

    // Common Alignment
    justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
    alignItems?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
    justifyItems?: "start" | "end" | "center" | "stretch";

    // Responsive Behavior
    mobileBehavior?: "wrap" | "scroll";

    // --- STYLE ---
    backgroundColor?: string;
    backgroundImage?: string;
    backgroundSize?: "cover" | "contain" | "auto";
    backgroundPosition?: "center" | "top" | "bottom" | "left" | "right";
    backgroundRepeat?: "no-repeat" | "repeat";
    backgroundAttachment?: "scroll" | "fixed";
    overlayColor?: string;

    borderStyle?: "solid" | "dashed" | "dotted" | "double" | "none";
    borderWidth?: string;
    borderColor?: string;
    borderRadius?: string;
    boxShadow?: string;

    textColor?: string;
    textAlign?: "left" | "center" | "right" | "justify";

    // --- ADVANCED ---
    marginTop?: string;
    marginRight?: string;
    marginBottom?: string;
    marginLeft?: string;

    paddingTop?: string;
    paddingRight?: string;
    paddingBottom?: string;
    paddingLeft?: string;

    zIndex?: number;
    cssId?: string;
    cssClass?: string;
    overflow?: "visible" | "hidden" | "scroll" | "auto";
};

const ContainerRender = ({
    containerLayout, contentWidth, width, minHeight,
    flexDirection, flexWrap, justifyContent, alignItems, justifyItems,
    gridColumns, gridRows, gridAutoFlow,
    columnGap, rowGap,
    mobileBehavior,
    backgroundColor, backgroundImage, backgroundSize, backgroundPosition, backgroundRepeat, backgroundAttachment,
    overlayColor,
    borderStyle, borderWidth, borderColor, borderRadius,
    boxShadow,
    textColor, textAlign,
    marginTop, marginBottom, marginLeft, marginRight,
    paddingTop, paddingBottom, paddingLeft, paddingRight,
    zIndex, overflow, cssId, cssClass
}: ContainerProps) => {
    const isBoxed = contentWidth === 'boxed';
    const innerWidth = isBoxed ? (width || '1140px') : '100%';
    const isGrid = containerLayout === 'grid';

    const computedMinHeight = minHeight === '100vh' ? '100vh' : minHeight;

    const cols = parseInt(String(gridColumns || "3"));
    const rows = parseInt(String(gridRows || "1"));
    const safeColumns = !isNaN(cols) && cols > 0 ? `repeat(${cols}, 1fr)` : gridColumns;
    const safeRows = !isNaN(rows) && rows > 0 ? `repeat(${rows}, 1fr)` : gridRows;

    const uniqueId = `cnt-${useId().replace(/:/g, "")}`;
    const combinedClass = cssClass ? `${cssClass} ${uniqueId}` : uniqueId;

    const commonStyles = `
        column-gap: ${columnGap || '20px'} !important;
        row-gap: ${rowGap || '20px'} !important;
        justify-content: ${justifyContent || 'flex-start'} !important;
        align-items: ${alignItems || 'stretch'} !important;
    `;

    const gridStyles = `
        display: grid !important;
        grid-template-columns: ${safeColumns} !important;
        grid-template-rows: ${safeRows} !important;
        grid-auto-flow: ${gridAutoFlow || 'row'} !important;
        justify-items: ${justifyItems || 'stretch'} !important;
        width: 100% !important;
        ${commonStyles}
    `;

    const flexStyles = `
        display: flex !important;
        flex-direction: ${flexDirection || 'row'} !important;
        flex-wrap: ${flexWrap || 'wrap'} !important;
        width: 100% !important;
        ${commonStyles}
    `;

    const mobileScrollStyles = mobileBehavior === 'scroll' ? `
        @media (max-width: 768px) {
            .${uniqueId} .credbuild-dropzone > div {
                display: flex !important;
                flex-direction: row !important;
                flex-wrap: nowrap !important;
                overflow-x: auto !important;
                scroll-snap-type: x mandatory;
                justify-content: flex-start !important;
                padding-bottom: 20px !important;
                -webkit-overflow-scrolling: touch;
                grid-template-columns: none !important;
            }
            .${uniqueId} .credbuild-dropzone > div > * {
                flex: 0 0 85% !important;
                width: 85% !important;
                max-width: 85% !important;
                scroll-snap-align: center;
                margin-right: ${columnGap || '20px'} !important;
                margin-bottom: 0 !important;
            }
            .${uniqueId} .credbuild-dropzone > div > *:last-child {
                margin-right: 0 !important;
            }
            .${uniqueId} .credbuild-dropzone > div::-webkit-scrollbar {
                height: 6px;
            }
            .${uniqueId} .credbuild-dropzone > div::-webkit-scrollbar-thumb {
                background: #cccccc60;
                border-radius: 4px;
            }
        }
    ` : `
         @media (max-width: 768px) {
             .${uniqueId} .credbuild-dropzone > div {
                 ${isGrid ? `
                     grid-template-columns: 1fr !important;
                     grid-auto-flow: row !important;
                 ` : `
                     flex-direction: column !important;
                     flex-wrap: nowrap !important;
                 `}
             }
             .${uniqueId} .credbuild-dropzone > div > * {
                 width: 100% !important;
                 max-width: 100% !important;
                 margin-right: 0 !important;
             }
         }
    `;

    return (
        <div
            id={cssId}
            className={combinedClass}
            style={{
                position: 'relative',
                width: '100%',
                minHeight: computedMinHeight,
                backgroundColor: backgroundColor || 'transparent',
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
                backgroundSize: backgroundSize || 'cover',
                backgroundPosition: backgroundPosition || 'center',
                backgroundRepeat: backgroundRepeat || 'no-repeat',
                backgroundAttachment: backgroundAttachment || 'scroll',
                borderStyle: borderStyle || 'none',
                borderWidth: borderWidth || '0',
                borderColor: borderColor || 'transparent',
                borderRadius: borderRadius || '0',
                boxShadow: boxShadow || 'none',
                marginTop: marginTop || '0',
                marginBottom: marginBottom || '0',
                marginLeft: marginLeft || 'auto',
                marginRight: marginRight || 'auto',
                zIndex: zIndex || 0,
                overflow: overflow || 'visible',
                display: 'flex',
                justifyContent: 'center',
                color: textColor,
                textAlign,
            }}
        >
            <style>{`
                .${uniqueId} .credbuild-dropzone > div {
                    ${isGrid ? gridStyles : flexStyles}
                }
                ${mobileScrollStyles}
            `}</style>

            {overlayColor && (
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: overlayColor,
                    zIndex: -1,
                    pointerEvents: 'none',
                    borderRadius: borderRadius || '0',
                }} />
            )}

            <div className="credbuild-dropzone" style={{
                width: innerWidth,
                maxWidth: '100%',
                paddingTop: paddingTop || '0',
                paddingBottom: paddingBottom || '0',
                paddingLeft: paddingLeft || '0',
                paddingRight: paddingRight || '0',
                display: 'block',
            }}>
                <DropZone zone="content" />
            </div>
        </div>
    );
};

export const Container: ComponentConfig<ContainerProps> = {
    label: "Container",
    fields: {
        containerLayout: {
            type: "radio", label: "Layout",
            options: [{ label: "Flexbox", value: "flex" }, { label: "Grid", value: "grid" }]
        },
        contentWidth: {
            type: "select", label: "Content Width",
            options: [{ label: "Boxed", value: "boxed" }, { label: "Full Width", value: "full" }],
        },
        mobileBehavior: {
            type: "radio", label: "Mobile Behavior",
            options: [{ label: "Stack / Wrap", value: "wrap" }, { label: "Horizontal Scroll", value: "scroll" }]
        },
        width: {
            type: "custom", label: "Width",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={2000} defaultValue="1140px" />
        },
        minHeight: {
            type: "custom", label: "Min Height",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={1000} defaultValue="100px" />
        },
        columnGap: {
            type: "custom", label: "Column Gap",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={100} defaultValue="20px" />
        },
        rowGap: {
            type: "custom", label: "Row Gap",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={100} defaultValue="20px" />
        },
        flexDirection: {
            type: "radio", label: "Direction",
            options: [
                { label: "Row →", value: "row" }, { label: "Col ↓", value: "column" },
                { label: "Row Rev ←", value: "row-reverse" }, { label: "Col Rev ↑", value: "column-reverse" }
            ],
        },
        flexWrap: {
            type: "radio", label: "Wrap",
            options: [{ label: "No Wrap", value: "nowrap" }, { label: "Wrap", value: "wrap" }]
        },
        gridColumns: {
            type: "custom", label: "Columns",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="" max={12} min={1} defaultValue="3" useUnits={false} />
        },
        gridRows: {
            type: "custom", label: "Rows",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="" max={12} min={1} defaultValue="1" useUnits={false} />
        },
        gridAutoFlow: {
            type: "select", label: "Auto Flow",
            options: [
                { label: "Row", value: "row" }, { label: "Column", value: "column" },
                { label: "Row Dense", value: "row dense" }, { label: "Col Dense", value: "column dense" }
            ]
        },
        justifyContent: {
            type: "select", label: "Justify Content",
            options: [
                { label: "Start", value: "flex-start" }, { label: "Center", value: "center" },
                { label: "End", value: "flex-end" }, { label: "Space Between", value: "space-between" },
                { label: "Space Around", value: "space-around" },
            ]
        },
        alignItems: {
            type: "select", label: "Align Items",
            options: [
                { label: "Start", value: "flex-start" }, { label: "Center", value: "center" },
                { label: "End", value: "flex-end" }, { label: "Stretch", value: "stretch" },
            ]
        },
        justifyItems: {
            type: "select", label: "Justify Items",
            options: [
                { label: "Start", value: "start" }, { label: "Center", value: "center" },
                { label: "End", value: "end" }, { label: "Stretch", value: "stretch" },
            ]
        },
        backgroundColor: {
            type: "custom", label: "Background Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        backgroundImage: { type: "text", label: "Image URL" },
        backgroundSize: {
            type: "select", label: "BG Size",
            options: [{ label: "Cover", value: "cover" }, { label: "Contain", value: "contain" }, { label: "Auto", value: "auto" }]
        },
        overlayColor: {
            type: "custom", label: "Overlay Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        borderStyle: {
            type: "select", label: "Border Type",
            options: [{ label: "None", value: "none" }, { label: "Solid", value: "solid" }, { label: "Dashed", value: "dashed" }, { label: "Dotted", value: "dotted" }]
        },
        borderWidth: {
            type: "custom", label: "Border Width",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={20} defaultValue="0px" />
        },
        borderColor: {
            type: "custom", label: "Border Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        borderRadius: {
            type: "custom", label: "Border Radius",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={100} defaultValue="0px" />
        },
        boxShadow: { type: "text", label: "Box Shadow" },
        textColor: {
            type: "custom", label: "Text Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        textAlign: {
            type: "radio", label: "Text Align",
            options: [{ label: "Left", value: "left" }, { label: "Center", value: "center" }, { label: "Right", value: "right" }]
        },
        marginTop: {
            type: "custom", label: "Margin Top",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={200} step={1} defaultValue="0" />
        },
        marginBottom: {
            type: "custom", label: "Margin Bottom",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={200} step={1} defaultValue="0" />
        },
        marginLeft: {
            type: "custom", label: "Margin Left",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={200} step={1} defaultValue="auto" />
        },
        marginRight: {
            type: "custom", label: "Margin Right",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={200} step={1} defaultValue="auto" />
        },
        paddingTop: {
            type: "custom", label: "Padding Top",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={200} step={1} defaultValue="20px" />
        },
        paddingBottom: {
            type: "custom", label: "Padding Bottom",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={200} step={1} defaultValue="20px" />
        },
        paddingLeft: {
            type: "custom", label: "Padding Left",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={200} step={1} defaultValue="20px" />
        },
        paddingRight: {
            type: "custom", label: "Padding Right",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={200} step={1} defaultValue="20px" />
        },
        zIndex: { type: "number", label: "Z-Index" },
        overflow: {
            type: "select", label: "Overflow",
            options: [{ label: "Visible", value: "visible" }, { label: "Hidden", value: "hidden" }, { label: "Scroll", value: "scroll" }]
        },
        cssId: { type: "text", label: "CSS ID" },
        cssClass: { type: "text", label: "CSS Class" },
    },
    defaultProps: {
        containerLayout: "grid",
        contentWidth: "boxed",
        mobileBehavior: "wrap",
        width: "1140px",
        minHeight: "100px",
        columnGap: "20px",
        rowGap: "20px",
        gridColumns: "3",
        gridRows: "1",
        gridAutoFlow: "row",
        justifyItems: "stretch",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        alignItems: "stretch",
        paddingTop: "20px",
        paddingBottom: "20px",
        paddingLeft: "20px",
        paddingRight: "20px",
        backgroundColor: "transparent",
        borderStyle: "none",
        borderWidth: "0px",
    },
    render: ContainerRender,
};
