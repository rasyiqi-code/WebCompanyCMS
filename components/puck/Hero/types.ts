export type HeroProps = {
    // Core content
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    layout?: "center" | "split-images" | "split-feature" | "center-gallery" | "center-stats";

    // Section styling
    backgroundColor?: string;
    textColor?: string;
    paddingTop?: string;
    paddingBottom?: string;

    // Title styling
    titleFontSize?: string;
    titleFontWeight?: string;
    titleLineHeight?: string;
    titleMarginBottom?: string;

    // Subtitle styling
    subtitleFontSize?: string;
    subtitleLineHeight?: string;
    subtitleOpacity?: string;
    subtitleMarginBottom?: string;
    subtitleMaxWidth?: string;

    // Primary button styling
    buttonBgColor?: string;
    buttonTextColor?: string;
    buttonPadding?: string;
    buttonBorderRadius?: string;
    buttonFontSize?: string;
    buttonFontWeight?: string;
    buttonBorder?: string;
    buttonHoverBg?: string;

    // Secondary button
    secondaryButtonText?: string;
    secondaryButtonBgColor?: string;
    secondaryButtonTextColor?: string;
    secondaryButtonBorder?: string;

    // Images
    imageUrl1?: string;
    imageUrl2?: string;
    imageUrl3?: string;
    imageUrl4?: string;
};
