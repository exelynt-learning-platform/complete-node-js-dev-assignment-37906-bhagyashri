
/*
 * Node.js File System Operations
 * Demonstrating asynchronous and synchronous methods
 */

// Import built-in File System module
const fs = require('fs');

console.log("===== Node.js File Operations Started =====");

// ------------------------------------
// 1. Asynchronous File Operations
// ------------------------------------

// Write content to data.txt
fs.writeFile('data.txt', 'Hello! Welcome to Node.js File System Operations.\n', (err) => {

    if (err) {
        console.error("Error writing data.txt:", err.message);
        return;
    }

    console.log("1. Text file written successfully.");

    // Read content from data.txt
    fs.readFile('data.txt', 'utf8', (err, data) => {

        if (err) {
            console.error("Error reading data.txt:", err.message);
            return;
        }

        console.log("2. Content of data.txt:");
        console.log(data);

        // Append additional content
        fs.appendFile('data.txt', 'This is additional content appended to the file.\n', (err) => {

            if (err) {
                console.error("Error appending data.txt:", err.message);
                return;
            }

            console.log("3. Additional content appended successfully.");

            // Read updated content
            fs.readFile('data.txt', 'utf8', (err, updatedData) => {

                if (err) {
                    console.error("Error reading updated file:", err.message);
                    return;
                }

                console.log("4. Updated data.txt content:");
                console.log(updatedData);
            });
        });
    });
});

// ------------------------------------
// 2. Synchronous File Operations
// ------------------------------------

try {

    // Write content synchronously
    fs.writeFileSync(
        'syncData.txt',
        'This file was created using synchronous writeFileSync().\n'
    );

    console.log("5. Synchronous file written successfully.");

    // Read content synchronously
    const syncData = fs.readFileSync('syncData.txt', 'utf8');

    console.log("6. Content of syncData.txt:");
    console.log(syncData);

} catch (err) {
    console.error("Synchronous file operation error:", err.message);
}

// ------------------------------------
// 3. JSON File Operations
// ------------------------------------

const userData = {
    name: "Rahul Sharma",
    age: 25,
    city: "Mumbai",
    profession: "Software Developer"
};

// Write JSON data asynchronously
fs.writeFile('data.json', JSON.stringify(userData, null, 2), (err) => {

    if (err) {
        console.error("Error writing JSON file:", err.message);
        return;
    }

    console.log("7. JSON file created successfully.");

    // Read JSON file
    fs.readFile('data.json', 'utf8', (err, jsonData) => {

        if (err) {
            console.error("Error reading JSON file:", err.message);
            return;
        }

        try {

            // Parse JSON data
            const parsedData = JSON.parse(jsonData);

            console.log("8. JSON data read successfully.");

            // Display specific values
            console.log("Name:", parsedData.name);
            console.log("Age:", parsedData.age);
            console.log("City:", parsedData.city);
            console.log("Profession:", parsedData.profession);

        } catch (parseError) {
            console.error("Error parsing JSON:", parseError.message);
        }
    });
});
