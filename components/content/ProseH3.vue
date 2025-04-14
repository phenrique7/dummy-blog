<script setup lang="ts">
import { css } from "styled-system/css";
import { useGenerateHeadings } from "#imports";

const props = defineProps<{ id?: string }>();

const generate = useGenerateHeadings(props);
</script>

<template>
  <h3
    :id="props.id"
    :class="
      css({
        mt: 6,
        mb: 2,
        lineHeight: '1.2',
        fontWeight: 'bold',
        color: 'text_muted',
        fontSize: { base: '2xl', md: '3xl' },
      })
    "
  >
    <a v-if="props.id && generate" :href="`#${props.id}`">
      <slot />
    </a>
    <slot v-else />
  </h3>
</template>
