import { tasksState } from "../store/TasksState";

// Import validation helpers for input validation logic
import { assignValidateInput, handleValidationError } from "../utils/validation/validation_helpers";

// Import the Base class to extend its functionality
import { Base } from "./Base";

// The Field class represent the To-Do form (input field and submit button).
// It extends the Base class and uses its logic for initialization and rendering
export class Field extends Base<HTMLFormElement> {
    constructor() {
        /* Pass the template ID ("field"), the host element ID ("app"), and the desired element ID ("todo-app--form") to the Base class constructor */
        super("field", "app", "todo-app--form");

        // Add an event listener for handling task addition
        this._addNewTask();
    }

    // Private method to attach the "submit" event listener for the form
    private _addNewTask() {
        this.element.addEventListener("submit", (event) => this._handleAddTask(event));
    }

    // Private method to handle the form submission event
    private _handleAddTask(event : SubmitEvent) {
        event.preventDefault();

        // Get the title input field using its name attribute
        const taskTitleInput = this.element["task-title--input"]! as HTMLInputElement;

        // Extract the value entered by the user
        const taskTitleValue = taskTitleInput.value;

        // Validate the input before proceeding with task creation
        if (this._formValidation(taskTitleValue)) {
            // If valid, create a new task and add it to the application state.
            tasksState.createNewTask(taskTitleValue);

            // Clear the input field and set focus for the next task.
            this._clearInputAndFocus(taskTitleInput);
        }
    }

    // Private method for validating the form input
    private _formValidation(taskTitleValue : string) {
        // Assign validation rules to the task title input
        const inputRule = assignValidateInput(taskTitleValue);

        // Handle validation errors based on the rules
        const errorMsg = handleValidationError(inputRule);

        // If an error message is returned, alert the user and return false
        if (errorMsg) {
            alert(errorMsg);
            return false;
        }

        // Return true if the input passes all validation rules
        return true;
    }

    // Private method to clear the input field and set focus
    private _clearInputAndFocus(taskTitleInput : HTMLInputElement) {
        taskTitleInput.value = "";
        taskTitleInput.focus();
    }
}
