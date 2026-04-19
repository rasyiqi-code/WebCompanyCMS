import fs from "fs";
import path from "path";
import crypto from "crypto";

const ENV_PATH = path.resolve(process.cwd(), ".env");

/**
 * Reads the current .env file and returns its contents as a string.
 */
export const readEnvFile = (): string => {
    try {
        if (fs.existsSync(ENV_PATH)) {
            return fs.readFileSync(ENV_PATH, "utf8");
        }
    } catch (e) {
        console.error("[ENV_MANAGER] Error reading .env:", e);
    }
    return "";
};

/**
 * Updates or adds keys to the .env file.
 */
export const updateEnv = async (updates: Record<string, string>) => {
    let content = readEnvFile();
    const lines = content.split("\n");
    const updatedKeys = new Set<string>();

    const newLines = lines.map(line => {
        const match = line.match(/^([^=#\s]+)\s*=\s*(.*)$/);
        if (match) {
            const key = match[1];
            if (updates[key] !== undefined) {
                updatedKeys.add(key);
                // Handle different quote styles if present or just use double quotes
                return `${key}="${updates[key].replace(/"/g, '\\"')}"`;
            }
        }
        return line;
    });

    // Add keys that didn't exist
    Object.keys(updates).forEach(key => {
        if (!updatedKeys.has(key)) {
            newLines.push(`${key}="${updates[key].replace(/"/g, '\\"')}"`);
        }
    });

    try {
        fs.writeFileSync(ENV_PATH, newLines.join("\n"), "utf8");
        return true;
    } catch (e) {
        console.error("[ENV_MANAGER] Error writing .env:", e);
        return false;
    }
};

/**
 * Checks if the current environment allows writing to the filesystem.
 * Useful for detecting Read-only environments like Vercel.
 */
export const isFileSystemWritable = async () => {
    const testPath = path.resolve(process.cwd(), ".write-test");
    try {
        fs.writeFileSync(testPath, "test", "utf8");
        fs.unlinkSync(testPath);
        return true;
    } catch (e) {
        return false;
    }
};

/**
 * Generates a secure random string for NEXTAUTH_SECRET.
 */
export const generateNextAuthSecret = () => {
    return crypto.randomBytes(32).toString('base64');
};
