
const fs = require("fs/promises");
const path = require("path");

// Create all paths using path.join().
const dataDir = path.join(__dirname, "data");
const logPath = path.join(__dirname, "data", "application.log");
const jsonPath = path.join(__dirname, "data", "records.json");

async function fileOperations() {
    try {
        // Create data directory if it does not exist.
        await fs.mkdir(dataDir, { recursive: true });

        // 1. Write to log file.
        await fs.writeFile(
            logPath,
            "Application started successfully.\n",
            "utf8"
        );

        console.log("Log file created successfully.");

        // 2. Read log file.
        let logData = await fs.readFile(logPath, "utf8");
        console.log("Log content:", logData.trim());

        // 3. Append to log file.
        await fs.appendFile(
            logPath,
            "New activity recorded.\n",
            "utf8"
        );

        console.log("Log file appended successfully.");

        logData = await fs.readFile(logPath, "utf8");
        console.log("Updated log:\n" + logData.trim());

        // 4. Write JSON file.
        const initialRecords = [
            {
                id: 1,
                name: "John",
                email: "john@example.com"
            }
        ];

        await fs.writeFile(
            jsonPath,
            JSON.stringify(initialRecords, null, 2),
            "utf8"
        );

        console.log("JSON file created successfully.");

        // 5. Read JSON file.
        const jsonData = await fs.readFile(jsonPath, "utf8");
        const records = JSON.parse(jsonData);

        console.log("JSON content:", JSON.stringify(records));

        // 6. Append a new record while preserving valid JSON.
        records.push({
            id: 2,
            name: "Priya",
            email: "priya@example.com"
        });

        await fs.writeFile(
            jsonPath,
            JSON.stringify(records, null, 2),
            "utf8"
        );

        console.log("New JSON record appended successfully.");

        const updatedJson = await fs.readFile(jsonPath, "utf8");
        console.log("Updated JSON:", JSON.stringify(JSON.parse(updatedJson)));

    } catch (error) {
        console.error("File operation error:", error.message);
        process.exitCode = 1;
    }
}

fileOperations();
