<script setup lang="ts">
// Just to make it work with isoldatedModules config
import { notify } from "@kyvg/vue3-notification";
import { computed, inject, ref } from "@vue/runtime-core";
import menuPopup from "./menuPopup.vue";

const props = defineProps({
  employee: {
    type: Object,
    required: true,
  },
});

const employeeActions = inject("employeeActions");

// const getEmpImg = inject<Function>("getEmpImg");
// const profilePath = getEmpImg? ref(await getEmpImg()) : null
// console.log('profilePath.value', profilePath.value);
</script>

<template>
  <li class="employee-preview">
    <span>{{ employee.name }}</span>
    <span>Experience: {{ employee.expYears }}</span>
    <menu-popup>
      <template #btn>Actions</template>
      <template #header>Actions</template>
      <template #options>
        <li @click.stop="employeeActions.onEmployeeEdit(employee._id)">Edit</li>
        <li @click.stop="employeeActions.onEmployeeRemove(employee._id)">
          Remove
        </li>
      </template>
    </menu-popup>
  </li>
</template>