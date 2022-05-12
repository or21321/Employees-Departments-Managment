import { Department } from "./Department.model"
import { Employee } from "./Empolyee"

export interface Company {
    _id: string
    companyName: string
    departments: Department[]
    adminsNames: string[]
    employees: Employee[]
}