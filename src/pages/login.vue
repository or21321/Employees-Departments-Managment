<script setup lang="ts">
import { reactive } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { authService } from "../services/auth.service";
import { notify } from "@kyvg/vue3-notification";
import { onMounted } from "@vue/runtime-core";

const router = useRouter();

const userCred = reactive({ username: "", password: "" });

async function onLogin() {
  await authService.login(userCred);
  notify({
    title: "Logged in",
    text: "You have logged in successfully!",
  });
  router.push("/home");
}
</script>

<template>
  <section class="login-page">
    <form @submit.prevent="onLogin($event)">
      <input v-model="userCred.username" type="text" placeholder="Username" />
      <input
        v-model="userCred.password"
        type="password"
        placeholder="Password"
      />
      <button>Login</button>
    </form>
  </section>
</template>