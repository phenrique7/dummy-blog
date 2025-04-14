<script setup lang="ts">
import type { PropType } from "vue";
import { css } from "styled-system/css";

const props = defineProps({
  href: {
    type: String,
    default: "",
  },
  target: {
    type: String as PropType<
      | "_blank"
      | "_parent"
      | "_self"
      | "_top"
      | (string & object)
      | null
      | undefined
    >,
    default: undefined,
    required: false,
  },
});
</script>

<template>
  <NuxtLink
    :href="props.href"
    :target="props.target"
    :class="
      css({
        color: 'highlight',
        borderBottom: '1px dashed',
        borderBottomColor: 'highlight',
      })
    "
  >
    <slot />
  </NuxtLink>
</template>
