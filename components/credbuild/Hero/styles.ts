import type { HeroProps } from './types';

export const getCommonStyles = (props: HeroProps) => {
    const {
        titleFontSize,
        titleFontWeight,
        titleLineHeight,
        titleMarginBottom,
        subtitleFontSize,
        subtitleLineHeight,
        subtitleOpacity,
        subtitleMarginBottom,
        subtitleMaxWidth,
        buttonBgColor,
        buttonTextColor,
        buttonPadding,
        buttonBorderRadius,
        buttonFontSize,
        buttonFontWeight,
        buttonBorder,
        secondaryButtonBgColor,
        secondaryButtonTextColor,
        secondaryButtonBorder,
        backgroundColor,
    } = props;

    return {
        titleStyle: {
            fontSize: titleFontSize || 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: titleFontWeight || '800',
            lineHeight: titleLineHeight || '1.1',
            marginBottom: titleMarginBottom || '1.5rem',
            letterSpacing: '-0.02em',
        },

        subtitleStyle: {
            fontSize: subtitleFontSize || '1.2rem',
            lineHeight: subtitleLineHeight || '1.6',
            opacity: subtitleOpacity || '0.95',
            marginBottom: subtitleMarginBottom || '2.5rem',
            maxWidth: subtitleMaxWidth || '700px',
        },

        primaryButtonStyle: {
            display: 'inline-block',
            backgroundColor: buttonBgColor || '#ffffff',
            color: buttonTextColor || (backgroundColor || '#dc2626'),
            padding: buttonPadding || '16px 48px',
            borderRadius: buttonBorderRadius || '9999px',
            textDecoration: 'none',
            fontSize: buttonFontSize || '1.1rem',
            fontWeight: buttonFontWeight || '700',
            border: buttonBorder || 'none',
            cursor: 'pointer',
            transition: 'all 0.2s',
        },

        secondaryButtonStyle: {
            display: 'inline-block',
            backgroundColor: secondaryButtonBgColor || 'transparent',
            color: secondaryButtonTextColor || (backgroundColor || '#dc2626'),
            padding: buttonPadding || '16px 40px',
            borderRadius: buttonBorderRadius || '9999px',
            textDecoration: 'none',
            fontSize: buttonFontSize || '1.1rem',
            fontWeight: buttonFontWeight || '600',
            border: secondaryButtonBorder || `2px solid ${backgroundColor || '#dc2626'}`,
            cursor: 'pointer',
            transition: 'all 0.2s',
        },
    };
};
