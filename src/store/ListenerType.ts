
import { TaskRules } from "./TaskRules";

// Define a type for the listener function, whech accept an array of TaskRules as its argument
export type ListenerType = (tasks : TaskRules[]) => void;
