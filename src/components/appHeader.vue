<script setup lang="ts">
import { inject, onMounted, watchEffect } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { Icon } from '@iconify/vue';

const store = useStore();

const emit = defineEmits(["onLogout"]);
const props = defineProps({
  companies: {
    type: Array,
    required: true,
  },
});

watchEffect(() => {
  console.log("props", props);
});

const loggedUser = inject("loggedUser");

function logout() {
  emit("onLogout");
}
</script>

<template>
  <section class="app-header-container">
    <header class="app-header">
      <div class="logo"><Icon icon="logos:angellist" /></div>
      <nav class="nav-bar">
        <ul class="companies-nav" v-if="props.companies.length">
          <router-link
            :to="`/${company._id}/employee`"
            v-for="company in companies"
            :key="company._id"
            >{{ company.companyName }}</router-link
          >
        </ul>
      </nav>
      <router-link v-if="!loggedUser" :to="{ name: 'Login' }"
        >Login</router-link
      >
      <button v-else @click="logout">Logout</button>
    </header>
  </section>
</template>