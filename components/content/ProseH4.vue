<script setup lang="ts">
import { css } from "styled-system/css";
import { useGenerateHeadings } from "#imports";

const props = defineProps<{ id?: string }>();

const generate = useGenerateHeadings(props);
</script>

<template>
  <h4
    :id="props.id"
    :class="
      css({
        mt: 4,
        mb: 2,
        lineHeight: '1.2',
        fontWeight: 'bold',
        color: 'text_main',
        fontSize: { base: 'xl', md: '2xl' },
      })
    "
  >
    <a v-if="props.id && generate" :href="`#${props.id}`">
      <slot />
    </a>
    <slot v-else />
  </h4>
</template>
