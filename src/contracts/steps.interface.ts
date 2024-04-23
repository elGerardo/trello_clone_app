import { ITask } from "./tasks.interface"

export interface ISteps {
    name: string
    order: number
    tasks: Array<ITask>
    value: string
    label: string
}