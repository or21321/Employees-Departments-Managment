<script setup lang="ts">
import employeeEdit from "./employee-edit.vue";
import { computed } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import loader from "./loader.vue";

const route = useRoute();
const regex = new RegExp("edit", "i");

const cmp = computed(() => {
  // To combine with suspense, can be used to share same loader and container for edit & details if it was implemented on the app
  return regex.test(route.path) ? employeeEdit : null;
});
</script>

<template>
  <section class="modal-wrapper">
    <Suspense>
      <component :is="cmp"></component>

      <template #fallback>
        <loader />
      </template>
    </Suspense>
  </section>
</template>
