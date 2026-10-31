// Declare variables
const num1 = 10;
const num2 = 5;

// Perform calculation
const sum = num1 - num2; // Error 1: Incorrect operator

console.log("First Number:", num1);
console.log("Second Number:", num2);
console.log("Sum:", sum);

// Function to calculate the square
function calculateSquare(number) {
    return number * number;
}

// Call the function
const result = calculateSquare(sum + 2); // Error 2: Incorrect argument

console.log("Square Result:", result);
