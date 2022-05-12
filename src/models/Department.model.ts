import { Empolyee } from "./Empolyee"

export interface Department {
    _id: string
    departmentName: string
    shortcut: string
    employeesIds: Empolyee[]
}