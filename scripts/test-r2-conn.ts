
import "dotenv/config";

const url = "https://cdn.univedpress.id/1765543542203-245c869e-b3de-409a-82c0-60526dcc712e.jpg";

async function checkUrl() {
    console.log(`Testing URL: ${url}`);
    try {
        const res = await fetch(url);
        console.log(`Status: ${res.status} ${res.statusText}`);
        if (res.ok) {
            console.log("SUCCESS: Image is accessible from Node.js");
            const blob = await res.blob();
            console.log(`Size: ${blob.size} bytes`);
        } else {
            console.log("FAILURE: R2 returned non-200 status");
        }
    } catch (error) {
        console.log("ERROR: Connection failed");
        console.error(error);
    }
}

checkUrl();
