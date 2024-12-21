
import { ListenerType } from './ListenerType';

// Import the TaskRules class, which defines the structure of a task object
import { TaskRules } from "./TaskRules";

// Define a singleton class to manage the state of the tasks in the application
class TasksState {
    // A private static instance of the class to ensure only one instance exists
    private static _instance : TasksState;

    // private array to store the tasks
    private _tasks : TaskRules[] = [];

    // Private listener to notify when the tasks state changes
    private _listner : ListenerType;

    // Fetch tasks from localStorage if they exist, otherwise initialize an empty array
    private _localStorageTasks = localStorage.getItem("tasks") ?
    JSON.parse(localStorage.getItem("tasks")!) : [];

    constructor() {
        this._listner = (tasks : TaskRules[]) => {
            console.log("Default listner invoked with tasks : ", tasks);
        }
        // Initializes the _tasks array with data from localStorage
        this._tasks = this._localStorageTasks;
    }

    /**
     * @desc public method to create and add new task to the state
     * @param taskTitleValue : string
    */
    public createNewTask(taskTitleValue : string) {
        /* Create a new task object with a unique ID, the provided title, and a default completion status of false */ 
        const newTask : TaskRules = {
            id : new Date().getTime().toString(),
            title : taskTitleValue,
            isCompleted : false
        }

        // Add the new task to the tasks array
        this._tasks.push(newTask);

        // Notify the listner of the updated tasks state (after every add task)
        this._notifyListener();

        // Update localStorage with the new tasks array
        localStorage.setItem("tasks", JSON.stringify(this._tasks));
    }

    // Toggles the complestion status of a task by its ID
    public changeTaskCompletionStatus(taskId : string) {
        // Find the task by ID in the tasks array
        const findTask = this._tasks.find((task : TaskRules) => {
            return task.id === taskId;
        });
        if (findTask) {
            // Toggle the completion status
            findTask.isCompleted = !findTask.isCompleted;
            // Notify the listener about the state change
            this._notifyListener();
            // Update tasks in localStorage
            localStorage.setItem("tasks", JSON.stringify(this._tasks));
        }
    }

    // Adds a method to delete a task by its ID
    public deleteTaskById(taskId : string) {
        // Filter out the task with the specified ID from the tasks array
        const tasksAfterDelete = this._tasks.filter((task : TaskRules) => {
            return task.id !== taskId;
        });

        // Update the internal tasks array with the filtered list
        this._tasks = tasksAfterDelete;

        // Notify listener about the updated state
        this._notifyListener();

        // Save the updated tasks to localStorage
        localStorage.setItem("tasks", JSON.stringify(this._tasks));
    }

    /**
     * @desc public method to set a listener that will be invoked when the tasks state changes
     * @param listener : ListenerType - The listener function to handle tasks updates
    */
    public setListener(listener : ListenerType) {
        this._listner = listener;
    }

    /**
     * @desc private method to notify the listener of the current tasks state
    */
    private _notifyListener() {
        if (this._listner) {
            this._listner(this._tasks);
        }
    }

    /**
     * @desc public static method to get the singleton instance of the TasksState class.
     * Ensures that only on instance of the class exists 
    */
    public static getInstance() {
        // If the instance doesn't exist, create it
        if (!this._instance) {
            this._instance = new TasksState();
            return new TasksState();
        }

        // Return the existing instance if it already exists
        return this._instance;
    }
}

// Export a singleton instance of the TasksState class
export const tasksState = TasksState.getInstance();
// This allows global access to the single instance of TasksState

/**
 * Singleton Design Pattern Explanation:
 * - A Singleton is a creational design pattern that ensures a class has only one instance.
 * - It provides a global access point to this instance.
 * - Here, the TasksState class uses the Singleton pattern to manage the task state across the application.
 */
