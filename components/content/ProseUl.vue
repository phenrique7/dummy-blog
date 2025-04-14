<script setup lang="ts">
import { css } from "styled-system/css";
</script>

<template>
  <ul
    :class="
      css({ listStyle: 'disc', pl: 10, margin: '0.75rem auto 1rem' })
    "
  >
    <slot />
  </ul>
</template>
