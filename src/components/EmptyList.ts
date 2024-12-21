
// Import Base class to extend its functionality
import { Base } from "./Base";

// EmptyList class is responsible for rendering the "No Items To Show!" message
export class EmptyList extends Base<HTMLParagraphElement> {
    constructor() {
        // Call the Base class constructor with IDs related to the empty list template and target location
        super("empty-list", "todo-app--tasks-list", "todo-app--empty-list");
    }
}
