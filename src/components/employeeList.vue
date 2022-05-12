<script setup lang="ts">
import employeePreview from "./employeePreview.vue";

const props = defineProps({
  employees: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <ul class="employee-list">
    <employee-preview
      v-for="e in employees"
      :key="e._id"
      :employee="e"
    ></employee-preview>
  </ul>
</template>