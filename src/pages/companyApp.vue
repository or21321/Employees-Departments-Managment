<script setup lang="ts">
import {
  computed,
  onBeforeMount,
  onMounted,
  provide,
  watchEffect,
} from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { Company } from "../models/Company.model";
import { companyService } from "../services/company.service";
import { useStore } from "../store";

const store = useStore();
const route = useRoute();
const router = useRouter();

// provide("getEmpImg", getEmpImg);
const employeeActions = {
  onEmployeeSelect,
  onEmployeeEdit,
  onEmployeeRemove,
};

provide("employeeActions", employeeActions);

const currCompany = computed<Company>(() => store.getters.getCurrCompany);

watchEffect(async () => {
  const { id } = route.params;
  console.log("id", id);
  await store.dispatch({ type: "loadCurrCompany", id });

  console.log("currCompany", currCompany, currCompany.value);
});

function onEmployeeSelect(id: string) {
  router.push(``);
}

function onEmployeeEdit(id: string) {
  console.log("currCompany", currCompany);
  router.push(`/${currCompany.value._id}/employee/edit/${id}`);
}

function onEmployeeRemove(id: string) {
  console.log("onEmployeeRemove id:", id);
  store.dispatch({ type: "removeEmployee", id });
}

// async function getEmpImg() {
//   return await companyService.getRandImg();
// }
</script>

<template>
  <section class="company-app">
    <router-view :company="currCompany"></router-view>
  </section>
</template>