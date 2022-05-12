import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { Company } from '../models/Company.model'
import { companyService } from '../services/company.service'
import { employeeService } from '../services/employee.service'

export interface State {
    companies: Company[]
    currCompanyIdx: number
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        companies: [],
        currCompanyIdx: -1
    },
    getters: {
        getCompanies(state) {
            return state.companies
        },
        getCurrCompany({ currCompanyIdx, companies }) {
            return currCompanyIdx !== -1 ? companies[currCompanyIdx] : null
        }
    },
    mutations: {
        setCompanies(state, { newCompanies }) {
            state.companies = newCompanies
        },
        setCurrCompanyIdx(state, { currCompanyIdx }) {
            state.currCompanyIdx = currCompanyIdx
        },
        removeEmployee(state, { id }) {
            const { companies, currCompanyIdx } = state
            const currCompany = companies[currCompanyIdx]
            const idx = currCompany.employees.findIndex(c => c._id === id)
            // TODO: Check if state.companies is needed for reactivity
            if (idx !== -1) state.companies[currCompanyIdx].employees.splice(idx, 1)
            else throw Error(`Employee not found with id: ${id}`)
        },
        saveEmployee(state, { employee }) {
            const { companies, currCompanyIdx } = state
            const currCompany = companies[currCompanyIdx]
            const idx = currCompany.employees.findIndex(e => e._id === employee._id)
            console.log('idx', idx);
            if (idx !== -1) {
                currCompany.employees.splice(idx, 1, employee)
            } else {
                currCompany.employees.unshift(employee)
            }
        }
    },
    actions: {
        async loadCompanies({ commit }) {
            try {

                const newCompanies = await companyService.query()
                commit({ type: 'setCompanies', newCompanies })
            } catch (err) {
                console.log(err);
            }
        },
        async loadCurrCompany({ commit, state }, { id }) {
            try {
                // TODO: this logic should be inside of mutation
                const currCompanyIdx = state.companies.findIndex(company => company._id === id)
                console.log('currCompanyIdx', currCompanyIdx);
                if (currCompanyIdx !== -1) commit({ type: 'setCurrCompanyIdx', currCompanyIdx })
                else throw Error(`Company not found with id: ${id}`)
            } catch (err) {
                console.log(err);
            }
        },
        async removeEmployee({ commit, getters }, { id }) {
            try {
                const companyId = getters.getCurrCompany._id
                await employeeService.remove(id, companyId)
                commit({ type: 'removeEmployee', id })
            } catch (err) {
                console.log(err);
            }
        },
        async saveEmployee({ commit, getters }, { employee }) {
            try {
                const companyId = getters.getCurrCompany._id
                const savedEmp = await employeeService.save(employee, companyId)
                console.log('AFTER savedEmp', savedEmp);
                commit({ type: 'saveEmployee', employee: savedEmp })
                return savedEmp
            } catch (err) {
                console.log(err);
            }
        },
        getEmpById({ getters }, { empId }) {
            const currCompany = getters.getCurrCompany
            const emp = currCompany.employees.find(e => e._id === empId)
            console.log('emp', emp);
            const empCopy = JSON.parse(JSON.stringify(emp))
            console.log('empCopy', empCopy);
            return empCopy
        }
    }
})

// define your own `useStore` composition function
export function useStore() {
    return baseUseStore(key)
}