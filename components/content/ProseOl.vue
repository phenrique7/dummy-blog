<script setup lang="ts">
import { css } from "styled-system/css";
</script>

<template>
  <ol :class="css({ listStyle: 'disc', pl: 10, margin: '0 auto 1.6rem' })">
    <slot />
  </ol>
</template>
