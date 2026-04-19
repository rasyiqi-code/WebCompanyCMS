import { getSiteSettings } from "../../lib/settings";
import { getMenu } from "../../lib/menus";
import { getThemeLayout } from "../../lib/themes";

export default async function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const settings = await getSiteSettings();
    const mainMenu = await getMenu("main");
    
    // Dynamically load the layout based on the active theme
    const ThemeLayout = getThemeLayout(settings.activeTheme || "default");

    return (
        <ThemeLayout settings={settings} mainMenu={mainMenu}>
            {children}
        </ThemeLayout>
    );
}
