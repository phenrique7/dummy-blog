<script setup lang="ts">
import { css } from "styled-system/css";
</script>

<template>
  <p
    :class="
      css({
        color: 'text_main',
        py: { base: 2, md: 2.5 },
        // textAlign: 'justify', not working
      })
    "
  >
    <slot />
  </p>
</template>

<style scoped>
p {
  text-align: justify;
}
</style>
