
import "./sass/main.scss";

// Import the PrimaryHeading class to initialize the component.
import { PrimaryHeading } from "./components/PrimaryHeading";

// Import the Field class to initialize the component.
import { Field } from "./components/Field";

// import the Component for displaying the list of tasks
import { TasksList } from "./components/TasksList";

// Create a new instance of PrimaryHeading.
new PrimaryHeading();
/* This will render the heading component in the DOM using the Base class functionality. */

// Create a new instance of Field.
new Field();
/* This initializes and renders the form (input field and submit button) for the To-Do App */

// Instantiate the TasksList component to render the tasks list.
new TasksList();
