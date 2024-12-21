
// A generic Base class for creating components in the application.
// It abstract common logic for initializing and rendering elements.
export class Base<T extends HTMLElement> {
    private _template : HTMLTemplateElement; // Reference to the template element.
    private _appHost : HTMLDivElement; /* Reference to the host element where the component will mounted. */
    protected element : T; // The actual DOM element created from the template.

    constructor(templateId : string, hostId : string, elementId : string) {
        // Get the template element by ID
        this._template = document.getElementById(templateId)! as HTMLTemplateElement;

        // Get the host element (where the template's content will be added) by its ID
        this._appHost = document.getElementById(hostId)! as HTMLDivElement;

        // Import the content of the template (deep clone it)
        const templateContent = document.importNode(this._template.content, true);

        // Get first element from the template content and typecast it
        this.element = templateContent.firstElementChild! as T;

        // Assign the provided element ID to the newly created element
        this.element.id = elementId;

        // Insert the new element into the host element as its last child
        this._appHost.insertAdjacentElement("beforeend", this.element);
    }
}
