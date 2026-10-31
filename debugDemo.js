
// Declare variables
const num1 = 10;
const num2 = 5;

// Perform addition
const sum = num1 + num2;

console.log("First Number:", num1);
console.log("Second Number:", num2);
console.log("Sum:", sum);

// Function to calculate the square
function calculateSquare(number) {
    console.log("Debug: Function received:", number);
    return number * number;
}

// Call the function with the correct argument
const result = calculateSquare(sum);

console.log("Square Result:", result);
console.log("Program executed successfully!");
