import { ISteps } from "@/contracts/steps.interface"
import StepService from "./StepService"
import PriorityService from "./PriorityService"
import { IPriority } from "@/contracts/priority.interface"

export default class CatalogService {
    public userId: string

    constructor(userId: string){
        this.userId = userId
    }

    public async get(): Promise<{ steps: Array<ISteps>, step_status: boolean, priorities: Array<IPriority>, priorities_status: boolean }> {
        const steps = await new StepService(this.userId).get()
        const priorities = await new PriorityService(this.userId).get()
        return { steps: steps.response, step_status: steps.status, priorities: priorities.response, priorities_status: priorities.status }
    }
}