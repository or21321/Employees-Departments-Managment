<script setup lang="ts">
import { onMounted } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import employeeList from "../components/employeeList.vue";

const route = useRoute();
const props = defineProps({
  company: {
    type: Object,
    required: true,
  },
});

onMounted(() => {
  console.log("props.company", props.company);
});
</script>

<template>
  <section class="employee-page">
    <router-link :to="`/${company._id}/employee/edit/`">Create employee</router-link>
    <employee-list :employees="company.employees"></employee-list>
    <router-view></router-view>
  </section>
</template>