<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { Icon } from "@iconify/vue";
const isOpen = ref(false);
</script>

<template>
  <section class="menu-popup" @click.stop="isOpen = !isOpen">
    <button class="btn-premium" v-if="!isOpen">
      <slot name="btn"></slot>
    </button>
    <div v-else>
      <Icon
        @click.stop="isOpen = !isOpen"
        class="popup-close-btn"
        icon="logos:copyleft"
      />
      <header>
        <slot name="header"></slot>
      </header>
      <ul>
        <slot name="options"></slot>
      </ul>
    </div>
  </section>
</template>