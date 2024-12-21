
// Import the Base class to extend its functionality
import { Base } from "./Base";

// A class that extends the Base class to create the primary heading component
export class PrimaryHeading extends Base<HTMLHeadingElement> {
    constructor() {
        // Call the parent class constructor with the necessary parameters
        // - "primary-heading" : The ID of the template to use.
        // - "app" : The ID of the host element where the heading will be added.
        // - "todo-app--primary-heading" : The ID to assign to the new heading element.
        super("primary-heading", "app", "todo-app--primary-heading");
    }
}
