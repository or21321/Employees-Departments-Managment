<script setup lang="ts">
import { ref, Ref } from "@vue/reactivity";
import { computed, onMounted } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../store";
import { Employee } from "../models/Empolyee";
import { employeeService } from "../services/employee.service";

const store = useStore();

const router = useRouter();
const route = useRoute();
const { empId } = route.params;

const prmRes = empId
  ? await store.dispatch({ type: "getEmpById", empId })
  : await employeeService.getEmptyEmployee();

const employeeToEdit: Ref<Employee> | Ref<undefined> = ref(prmRes);
console.log("employeeToEdit", employeeToEdit);

const expYearsForDisplay = computed(() => employeeToEdit.value?.expYears);
const title = computed(() => (empId ? "Update" : "Add"));

onMounted(() => {
  console.log("onMounted");
});

async function onSubmit() {
  console.log("onSubmit() employeeToEdit.value", employeeToEdit.value);
  const savedEmp = await store.dispatch({
    type: "saveEmployee",
    employee: employeeToEdit.value,
  });
  employeeToEdit.value = savedEmp;
}

function onClose() {
  console.log("ASDASD");
  router.back();
}
</script>

<template>
  <section v-click-outside="onClose" class="employee-edit wrapped-modal">
    <header>{{ title }}</header>
    <form @submit.prevent="onSubmit">
      <label for="name">
        Name:
        <input
          type="text"
          name="name"
          id="name"
          v-model="employeeToEdit.name"
        />
      </label>
      <label for="expYears">
        Experience:
        <div class="range-input-container">
          <input
            type="range"
            id="expYears"
            min="0"
            max="10"
            name="expYears"
            v-model="employeeToEdit.expYears"
          />
          {{ expYearsForDisplay }}
        </div>
      </label>
      {{ employeeToEdit._id }}
      <button class="btn-submit">Save</button>
    </form>
  </section>
</template>