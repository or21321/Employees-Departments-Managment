import { Employee } from "../models/Empolyee";
import { companyService } from "./company.service"
import { utilService } from "./util.service";

export const employeeService = {
    remove,
    save,
    getEmptyEmployee,
}

async function remove(employeeId: string, companyId: string) {
    console.log('companyId', companyId);
    const company = await companyService.getById(companyId)
    console.log('company', company);
    const idx = company?.employees.findIndex(e => {
        console.log(e._id === employeeId);
        console.log(e._id);
        console.log(employeeId);
        return e._id === employeeId
    })
    console.log('idx', idx);
    if (idx !== -1 && typeof idx === 'number') {
        company?.employees.splice(idx, 1)
        if (company) await companyService.save(company)
    }
    else return Promise.reject()
}

async function save(employee: Employee, companyId: string) {
    console.log('employee', employee);
    const company = await companyService.getById(companyId)
    console.log('company', company);
    if (company) {
        // PUT:
        if (employee._id) {
            const idx = company?.employees.findIndex(e => {
                console.log(e._id === employee._id);
                console.log(e._id);
                console.log(employee._id);
                return e._id === employee._id
            })
            console.log('idx', idx);
            if (idx !== -1 && typeof idx === 'number') {
                company?.employees.splice(idx, 1, employee)
                await companyService.save(company)
                return employee
            }
            else return Promise.reject()
            // POST:
        } else {
            employee._id = utilService.makeId()
            company?.employees.unshift(employee)
            await companyService.save(company)
            return employee
        }
    }
}

function getEmptyEmployee() {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res({
                _id: '',
                name: '',
                departmentId: '',
                expYears: 0,
            })
        }, 1000)
    })
}