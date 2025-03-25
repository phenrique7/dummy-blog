<script setup>
import { css } from "styled-system/css/css.mjs";
</script>

<template>
  <div
    :class="
      css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      })
    "
  >
    <div
      :class="
        css({
          width: 5,
          height: 5,
          borderRadius: 'full',
          border: '3px solid token(colors.medium_background)',
          borderTopColor: 'token(colors.highlight)',
          animation: 'spin 0.7s linear infinite',
        })
      "
    ></div>
  </div>
</template>

<style>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
