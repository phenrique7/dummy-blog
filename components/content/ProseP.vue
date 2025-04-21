<script setup lang="ts">
import { css } from "styled-system/css";
</script>

<template>
  <p
    :class="
      css({
        color: 'text_main',
        textAlign: 'justify',
        py: { base: 1, md: 1.5 },
      })
    "
  >
    <slot />
  </p>
</template>
