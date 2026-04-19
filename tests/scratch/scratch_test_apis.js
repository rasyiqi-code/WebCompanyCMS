
async function testApis() {
    const baseUrl = "http://localhost:3000";
    
    console.log("--- Testing /api/settings ---");
    try {
        const resSettings = await fetch(`${baseUrl}/api/settings`);
        const settings = await resSettings.json();
        console.log(JSON.stringify(settings, null, 2));
    } catch (e) {
        console.error("Failed to fetch settings:", e.message);
    }

    console.log("\n--- Testing /api/menus?slug=main ---");
    try {
        const resMenu = await fetch(`${baseUrl}/api/menus?slug=main`);
        const menu = await resMenu.json();
        console.log(JSON.stringify(menu, null, 2));
    } catch (e) {
        console.error("Failed to fetch menu:", e.message);
    }
}

testApis();
