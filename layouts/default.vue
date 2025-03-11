<script setup lang="ts">
import { css } from "styled-system/css";
import { flex } from "styled-system/patterns";
import Sidebar from "~/ui/components/sidebar/sidebar.vue";
import MenuBar from "~/ui/components/menu-bar/menu-bar.vue";

const { displayPreferences } = useDisplayPreferences();

useHead(() => ({
  htmlAttrs: {
    class: displayPreferences.value.theme,
  },
  bodyAttrs: {
    class: css({ fontFamily: "Inter" }),
  },
}));
</script>

<template>
  <div
    :class="
      flex({ flexDirection: 'column', md: { flexDirection: 'row' } })
    "
  >
    <Sidebar />
    <main
      :class="
        css({
          px: 0,
          width: '100%',
          pt: '3.875rem',
          minHeight: '100dvh',
          background: 'background',
          md: { pt: 0, pl: 80, pr: 14 },
        })
      "
    >
      <slot />
    </main>
    <MenuBar />
  </div>
</template>
