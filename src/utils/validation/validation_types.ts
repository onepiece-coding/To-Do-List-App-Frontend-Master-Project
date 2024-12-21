
// Define the structure of validation rules using a TypeScript type
export type Validation = {
    type : string,
    value : string;
    required : boolean;
    minLength : number;
    maxLength : number;
}
