
// Import dependencies, including TaskRules and the Base class and tasksState
import { Base } from "./Base";
import { TaskRules } from "../store/TaskRules";
import { tasksState } from "../store/TasksState";

// TaskItem class id responsible for rendering individual task items
export class TaskItem extends Base<HTMLDivElement> {
    // private property to store the task details
    private _task : TaskRules;

    // Constructor accespts a task object and initializes the task item
    constructor(task : TaskRules) {
        // Call the Base class constructor with IDs related to the task item template and target location
        super("task-item", "todo-app--tasks-list", "todo-app--task-item");

        // Assign the passed task object to the private property
        this._task = task;

        // Render the task item in the DOM
        this._renderTask();

        // Attach event listeners for task interactions
        this._taskCompletion();

        // Set up delete functionality for the task
        this._deleteTask();
    }

    // private method to render the task's title in the DOM
    private _renderTask() {
        // Find the element for the task title in the task item template
        const todoAppTaskTitle = this.element.querySelector(".todo-app--task-title")! as HTMLParagraphElement;

        // Set the task's title text
        todoAppTaskTitle.textContent = this._task.title;

        // Apply or remove the "completed" class based on the task's completion status
        if (this._task.isCompleted) {
            this.element.classList.add("completed");
        } else {
            this.element.classList.remove("completed");
        }
    }

    // Sets a click event listener for making the task as completed or uncompleted
    private _taskCompletion() {
        // Select the task completion button element
        const todoAppTaskCompletion = this.element.querySelector(
            ".todo-app--task-completion"
        )! as HTMLSpanElement;

        // Add a click event listener to handle task completion status change
        todoAppTaskCompletion.addEventListener("click", _ => {
            this._handleTaskCompletion()
        });
    }

    // Handle the task completion toggle and updates the global state
    private _handleTaskCompletion() {
        // Call the state method to toggle the task's completion status
        tasksState.changeTaskCompletionStatus(this._task.id);
    }

    // Adds an event listener to the delete button for removing the task
    private _deleteTask() {
        // Select the delete button element inside the task
        const deleteTaskBtn = this.element.querySelector(
            ".todo-app--delete-task"
        )! as HTMLButtonElement;

        // Attach a click event listener to handle task deletion
        deleteTaskBtn.addEventListener("click", this._handleDeleteTask.bind(this));
    }

    // Handle the delete action for the task
    private _handleDeleteTask() {
        // Show a confirmation dialog to the user before deletion
        if (confirm("Are you sure? you want to delete this task!")) {
            // Call the state method to delete the task
            tasksState.deleteTaskById(this._task.id);
        }
    }
}
