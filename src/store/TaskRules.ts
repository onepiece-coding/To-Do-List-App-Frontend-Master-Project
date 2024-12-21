
// Define a TaskRules class to represent the structure of a task
export class TaskRules {
    /**
     * @desc Constructor to initialize a task with ID, title, and completion status
     * @param id - A unique identifier for the task
     * @param  title - The title of the task
     * @param isCompleted - A boolean indiating if the task is completed or not
    */
    constructor(
        public id : string,
        public title : string,
        public isCompleted : boolean
    ) {}
}
