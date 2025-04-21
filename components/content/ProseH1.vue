<script setup lang="ts">
import { css } from "styled-system/css";
import { useGenerateHeadings } from "#imports";

const props = defineProps<{ id?: string }>();

const generate = useGenerateHeadings(props);
</script>

<template>
  <h1
    :id="props.id"
    :class="
      css({
        mb: 4,
        lineHeight: '1.2',
        fontWeight: 'bold',
        color: 'text_main',
        fontSize: { base: '5xl', lg: '6xl' },
      })
    "
  >
    <a v-if="generate" :href="`#${props.id}`">
      <slot />
    </a>
    <slot v-else />
  </h1>
</template>

