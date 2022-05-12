<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { notify } from "@kyvg/vue3-notification";
import {
  computed,
  onBeforeMount,
  provide,
  reactive,
  watchEffect,
} from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import appHeader from "./components/appHeader.vue";
import { authService } from "./services/auth.service";
import { useStore } from "./store";

const loggedUserRef = authService.getLoggedUserRef();
const store = useStore();

const router = useRouter();
const route = useRoute();

onBeforeMount(async () => {
  provide("loggedUser", loggedUserRef);
  await store.dispatch({ type: "loadCompanies" });
  console.log("store.state after loading", store.state);
});
const companies = computed(() => store.getters.getCompanies);
watchEffect(() => {
  console.log("companies", companies);
  console.log("store.getters.getCompanies", store.getters.getCompanies);
});

async function logout() {
  await authService.logout();
  notify({
    title: "Logged out",
    text: "You have logged out successfully!",
  });
  if (route.path === "/home") router.push("/login");
}
</script>

<template>
  <app-header
    :companies="companies"
    class="main-layout"
    @onLogout="logout"
  ></app-header>
  <router-view class="main-layout" />
  <notifications />
</template>

