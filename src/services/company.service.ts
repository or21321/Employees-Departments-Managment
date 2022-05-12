import { Company } from '../models/Company.model';
import { asyncStorageService } from './async-storage.service';
import { storageService } from './storage.service';
import { utilService } from './util.service';
import axios from 'axios'

const COMPANIES: Company[] = [
    {
        _id: utilService.makeId(),
        companyName: 'MisterBit',
        departments: [
            {
                _id: 'Asi768%^&thrhqwr23$#T6',
                departmentName: 'Human resources ',
                shortcut: 'HR',
                employeesIds: [
                    'AhyrhRTH563q4rGRE5y4',
                    'AhyrhTGHR%YH65756uTHaf2345y4'
                ]
            },
            {
                _id: 'Asi768%^&hYJ%&YU457647F',
                departmentName: 'Artificial intelligence ',
                shortcut: 'AI',
                employeesIds: [
                    'AhyrhLUKHRY$^6786uTYrGRE5y4',
                    'AhyrTYHJwgeyth6$7657456y4'
                ]
            },
            {
                _id: 'Asi768hrthrWRTG35645y',
                departmentName: 'Public Relations ',
                shortcut: 'PR',
                employeesIds: [
                    'AhyrhghGTRThrh546y4',
                    'AhyrhRTH5gertHGRTyh47647y4'
                ]
            }],
        adminsNames: ['ADMIN'],
        employees: [
            {
                _id: 'AhyrhRTH563q4rGRE5y4',
                name: 'Or',
                departmentId: 'Asi768%^&thrhqwr23$#T6',
                expYears: 1
            },
            {
                _id: 'AhyrhTGHR%YH65756uTHaf2345y4',
                name: 'Ben',
                departmentId: 'Asi768%^&thrhqwr23$#T6',
                expYears: 2
            },
            {
                _id: 'AhyrhLUKHRY$^6786uTYrGRE5y4',
                name: 'Shay',
                departmentId: 'Asi768%^&thrhqwr23$#T6',
                expYears: 1.5
            },
            {
                _id: 'AhyrTYHJwgeyth6$7657456y4',
                name: 'Orna',
                departmentId: 'Asi768%^&thrhqwr23$#T6',
                expYears: 3
            },
            {
                _id: 'AhyrhghGTRThrh546y4',
                name: 'Yaron',
                departmentId: 'Asi768%^&thrhqwr23$#T6',
                expYears: 0.5
            },
            {
                _id: 'AhyrhRTH5gertHGRTyh47647y4',
                name: 'Oshra',
                departmentId: 'Asi768%^&thrhqwr23$#T6',
                expYears: 4
            },
        ]
    },
    {
        _id: utilService.makeId(),
        companyName: 'Facebook',
        departments: [],
        adminsNames: [],
        employees: []
    },
    {
        _id: utilService.makeId(),
        companyName: 'Google',
        departments: [],
        adminsNames: [],
        employees: []
    },
]

const KEY = 'companyDb';

export const companyService = {
    query,
    getById,
    remove,
    save,
    getEmptyCompany,
    getRandImg
}

function query(): Promise<Company[] | undefined> {
    if (!storageService.load(KEY)) storageService.store(KEY, COMPANIES)
    return asyncStorageService.query(KEY)
}

function getById(id: string): Promise<Company | undefined> {
    return asyncStorageService.get(KEY, id)
}

function remove(id) {
    return asyncStorageService.remove(KEY, id)
}

function save(company: Company): Promise<Company> {
    // const companyToSave = JSON.parse(JSON.stringify(company))
    const prm = (company._id) ? asyncStorageService.put(KEY, company) : asyncStorageService.post(KEY, company)
    return prm
}

function getEmptyCompany(): Promise<Company> {
    return new Promise((res, rej) => {
        res({
            _id: utilService.makeId(),
            companyName: 'MisterBit',
            departments: [],
            employees: [],
            adminsNames: ['ADMIN']
        })
    })
}

async function getRandImg() {
    // Makes loading slow because of await, could use Promise.all or just then
    const res = await axios.get('https://randomuser.me/api/')
    return res.data.results[0].picture.medium
}
