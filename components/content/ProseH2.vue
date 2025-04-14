<script setup lang="ts">
import { css } from "styled-system/css";
import { useGenerateHeadings } from "#imports";

const props = defineProps<{ id?: string }>();

const generate = useGenerateHeadings(props);
</script>

<template>
  <h2
    :id="props.id"
    :class="
      css({
        mb: 3,
        lineHeight: '1.2',
        fontWeight: 'bold',
        color: 'text_main',
        fontStyle: 'italic',
        fontSize: { base: '3xl', md: '4xl' },
      })
    "
  >
    <a v-if="props.id && generate" :href="`#${props.id}`">
      <slot />
    </a>
    <slot v-else />
  </h2>
</template>
