
import { TaskItem } from "./TaskItem";
import { EmptyList } from "./EmptyList";
import { TaskRules } from "../store/TaskRules";
import { tasksState } from "../store/TasksState";

// import the Base class for rendering components
import { Base } from "./Base";

// The TasksList class is responsible for rendering the list of tasks in the application
export class TasksList extends Base<HTMLDivElement> {
    constructor() {
        // Initialize the component using the Base class constructor
        // It uses the "tasks-list" template ID, mounts it to the "app" host, and assigns a unique ID "todo-app--tasks-list".
        super("tasks-list", "app", "todo-app--tasks-list");

        // Check if there are tasks saved in localStorage
        if (localStorage.getItem("tasks")) {
            // Parse the tasks stored in localStorage into an array of TaskRules[]
            const localStorageTasks : TaskRules[] = JSON.parse(
                localStorage.getItem("tasks")!
            );

            // If ther are no tasks, display an empty list message
            if (localStorageTasks.length === 0) {
                this._renderEmptyListMsg();
            } else { // Otherwise, Iterate over each task and render it in the tasks list
                localStorageTasks.forEach((task : TaskRules) => {
                    this._renderTask(task);
                });
            }
        }

        // Use the listener pattern to update the state tasks list whenever the state changes.
        tasksState.setListener((tasks : TaskRules[]) => {
            // Clear the current tasks list in the DOM
            this.element.innerHTML = "";

            // Check if there are no tasks and render an empty list message if true
            if(tasks.length === 0) {
                this._renderEmptyListMsg();
            } else {
                // Otherwise, iterate through the tasks and render each task
                tasks.forEach((task : TaskRules) => {
                    this._renderTask(task);
                });
            }
        });
    }

    // private method to render an empty list message when no tasks are available
    private _renderEmptyListMsg() {
        new EmptyList();
    }

    // private method to render individual tasks in the list
    private _renderTask(task : TaskRules) {
        new TaskItem(task);
    }
}
