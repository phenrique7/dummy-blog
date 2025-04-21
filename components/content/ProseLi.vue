<script setup lang="ts">
import { css } from "styled-system/css";
</script>

<template>
  <li :class="css({ color: 'text_main' })"><slot /></li>
</template>
