<script setup lang="ts">
import { inject } from "@vue/runtime-core";

const loggedUser = inject("loggedUser");
</script>

<template>
  <sectio class="home-page">
    <h1>Home-Page</h1>
    <div>
      Welcome {{ loggedUser.username }}!
    </div>
  </sectio>
</template>