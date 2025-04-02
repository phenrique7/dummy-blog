<script setup lang="ts">
import { buttonSva } from "~/ui/components/button/button.sva";

const props = defineProps<{
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "solid" | "ghost" | "oauth";
}>();

const { size, variant, ...other } = props;
const styles = buttonSva({ size, variant });
</script>

<template>
  <button :class="styles.root" v-bind="other">
    <span v-if="$slots.icon" :class="styles.icon">
      <slot name="icon" />
    </span>
    <slot />
  </button>
</template>
