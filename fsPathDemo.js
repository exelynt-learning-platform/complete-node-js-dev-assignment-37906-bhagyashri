
const fs = require("fs");
const path = require("path");

const dataDirectory = path.join(__dirname, "data");
const logFile = path.join(__dirname, "data", "application.log");
const jsonFile = path.join(__dirname, "data", "user.json");

// Create the data directory if it does not exist.
fs.mkdir(dataDirectory, { recursive: true }, (error) => {
    if (error) {
        console.error("Directory creation error:", error.message);
        return;
    }

    // Write a log file.
    fs.writeFile(logFile, "Application started successfully.\n", (error) => {
        if (error) {
            console.error("Log writing error:", error.message);
            return;
        }

        console.log("Log file created successfully.");

        // Read the log file.
        fs.readFile(logFile, "utf8", (error, data) => {
            if (error) {
                console.error("Log reading error:", error.message);
                return;
            }

            console.log("Log file content:");
            console.log(data.trim());

            // Append another message to the log file.
            fs.appendFile(logFile, "New activity recorded.\n", (error) => {
                if (error) {
                    console.error("Log append error:", error.message);
                    return;
                }

                console.log("Log file updated successfully.");
                console.log("Updated log content:");

                fs.readFile(logFile, "utf8", (error, updatedData) => {
                    if (error) {
                        console.error("Updated log reading error:", error.message);
                        return;
                    }

                    console.log(updatedData.trim());
                });
            });
        });
    });

    // Write JSON data.
    const user = {
        id: 1,
        name: "John",
        email: "john@example.com"
    };

    fs.writeFile(jsonFile, JSON.stringify(user, null, 2), (error) => {
        if (error) {
            console.error("JSON writing error:", error.message);
            return;
        }

        console.log("JSON file created successfully.");

        // Read and parse JSON data.
        fs.readFile(jsonFile, "utf8", (error, data) => {
            if (error) {
                console.error("JSON reading error:", error.message);
                return;
            }

            const userData = JSON.parse(data);
            console.log("JSON file content:", userData);

            // Append another property by reading, updating and rewriting JSON.
            userData.city = "Mumbai";

            fs.writeFile(jsonFile, JSON.stringify(userData, null, 2), (error) => {
                if (error) {
                    console.error("JSON update error:", error.message);
                    return;
                }

                console.log("JSON file updated successfully.");
            });
        });
    });
});
