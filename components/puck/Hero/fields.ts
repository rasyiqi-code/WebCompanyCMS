import type { HeroProps } from './types';

export const getDynamicFields = (props?: Partial<HeroProps>): any => {
    const layout = props?.layout || "center";
    const showImages = layout !== "center" && layout !== "center-stats";
    const showMultipleImages = layout === "split-images" || layout === "center-gallery";
    const showSecondaryButton = layout === "split-feature" || layout === "center-stats";

    return {
        layout: {
            type: "select" as const,
            label: "🎨 Layout Style",
            options: [
                { label: "Center (Default)", value: "center" },
                { label: "Split with Image Grid", value: "split-images" },
                { label: "Split with Feature Image", value: "split-feature" },
                { label: "Center with Gallery", value: "center-gallery" },
                { label: "Center with Stats", value: "center-stats" },
            ],
        },

        title: { type: "text" as const, label: "📝 Title" },
        subtitle: { type: "textarea" as const, label: "📄 Subtitle" },
        ctaText: { type: "text" as const, label: "🔘 Primary Button Text" },
        ctaLink: { type: "text" as const, label: "🔗 Primary Button Link" },

        ...(showSecondaryButton ? {
            secondaryButtonText: { type: "text" as const, label: "🔘 Secondary Button Text" },
        } : {}),

        ...(showImages ? {
            imageUrl1: { type: "text" as const, label: showMultipleImages ? "🖼️ Image URL 1" : "🖼️ Feature Image URL" },
        } : {}),

        ...(showMultipleImages ? {
            imageUrl2: { type: "text" as const, label: "🖼️ Image URL 2" },
            imageUrl3: { type: "text" as const, label: "🖼️ Image URL 3" },
            imageUrl4: { type: "text" as const, label: "🖼️ Image URL 4" },
        } : {}),

        backgroundColor: { type: "text" as const, label: "🎨 Background Color", placeholder: "#dc2626" },
        textColor: { type: "text" as const, label: "✏️ Text Color", placeholder: "#ffffff" },
        paddingTop: { type: "text" as const, label: "📐 Padding Top", placeholder: "80px" },
        paddingBottom: { type: "text" as const, label: "📐 Padding Bottom", placeholder: "80px" },

        titleFontSize: { type: "text" as const, label: "📏 Title Font Size", placeholder: "clamp(2.5rem, 5vw, 4rem)" },
        titleFontWeight: { type: "text" as const, label: "⚖️ Title Font Weight", placeholder: "800" },
        titleLineHeight: { type: "text" as const, label: "📊 Title Line Height", placeholder: "1.1" },
        titleMarginBottom: { type: "text" as const, label: "📐 Title Margin Bottom", placeholder: "1.5rem" },

        subtitleFontSize: { type: "text" as const, label: "📏 Subtitle Font Size", placeholder: "1.2rem" },
        subtitleLineHeight: { type: "text" as const, label: "📊 Subtitle Line Height", placeholder: "1.6" },
        subtitleOpacity: { type: "text" as const, label: "🌫️ Subtitle Opacity", placeholder: "0.95" },
        subtitleMarginBottom: { type: "text" as const, label: "📐 Subtitle Margin Bottom", placeholder: "2.5rem" },
        subtitleMaxWidth: { type: "text" as const, label: "↔️ Subtitle Max Width", placeholder: "700px" },

        buttonBgColor: { type: "text" as const, label: "🎨 Button Background", placeholder: "#ffffff" },
        buttonTextColor: { type: "text" as const, label: "✏️ Button Text Color", placeholder: "#dc2626" },
        buttonPadding: { type: "text" as const, label: "📐 Button Padding", placeholder: "16px 48px" },
        buttonBorderRadius: { type: "text" as const, label: "⭕ Button Border Radius", placeholder: "9999px" },
        buttonFontSize: { type: "text" as const, label: "📏 Button Font Size", placeholder: "1.1rem" },
        buttonFontWeight: { type: "text" as const, label: "⚖️ Button Font Weight", placeholder: "700" },
        buttonBorder: { type: "text" as const, label: "🔲 Button Border", placeholder: "none" },
        buttonHoverBg: { type: "text" as const, label: "🎨 Button Hover BG", placeholder: "#f1f5f9" },

        ...(showSecondaryButton ? {
            secondaryButtonBgColor: { type: "text" as const, label: "🎨 Secondary Button BG", placeholder: "transparent" },
            secondaryButtonTextColor: { type: "text" as const, label: "✏️ Secondary Button Text", placeholder: "#dc2626" },
            secondaryButtonBorder: { type: "text" as const, label: "🔲 Secondary Button Border", placeholder: "2px solid #dc2626" },
        } : {}),
    };
};
