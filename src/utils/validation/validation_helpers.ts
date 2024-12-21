
// Import the Validation type to define the structure of validation rules
import { Validation } from "./validation_types"

// Function to assign validation rules to the input value
export const assignValidateInput = (taskTitleValue : string) : Validation => {
    return {
        type : "title", // Type of input (for error message identification)
        value : taskTitleValue, // The value of the input field to validate
        required : true, // Indicates the field is mandatory
        minLength : 7, // Minimum length required for the input
        maxLength : 100 // Maximum length allowed for the input
    };
}

// Function to handle validation errors and return appropriate error message
export const handleValidationError = (inputRule : Validation) : string => {
    let errorMsg = ""; // Initialize an empty error message

    // Check if the input is empty
    if (inputRule.value.trim().length === 0) {
        errorMsg = `${inputRule.type} is required!`;
    }

    // Check if the input is shorter than the minimum length
    else if (inputRule.value.trim().length < inputRule.minLength) {
        errorMsg = `${inputRule.type} must be at least ${inputRule.minLength} Characters`;
    }

    // Check if the input is longer than the maximum length
    else if (inputRule.value.trim().length > inputRule.maxLength) {
        errorMsg = `${inputRule.type} must be less than ${inputRule.maxLength} Characters`;
    }

    // Return the error message (empty if no errors)
    return errorMsg;
}
