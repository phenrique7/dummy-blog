<script setup lang="ts">
import { flex } from "styled-system/patterns";

const props = defineProps<{
  currentPathPost: string;
}>();

const { data } = await useAsyncData("posts", () =>
  queryCollection("article")
    .select("title", "path", "date")
    .order("date", "DESC")
    .all(),
);

const posts = data.value ?? [];
const currentPostIndex = posts.findIndex(
  (post) => post.path === props.currentPathPost,
);
const previousPost = posts[currentPostIndex - 1];
const nextPost = posts[currentPostIndex + 1];
</script>

<template>
  <section
    :class="
      flex({
        mb: 14,
        bg: 'medium_background',
        borderTop: '1px solid',
        borderTopColor: 'borders',
        borderBottom: '1px solid',
        borderBottomColor: 'borders',
      })
    "
  >
    <NuxtLink
      :to="previousPost?.path"
      :class="
        flex({
          width: '50%',
          color: 'highlight',
          alignItems: 'center',
          textDecoration: 'none',
          py: { base: 4, md: 8 },
          px: { base: 4, md: 12 },
          transition: 'background 0.3s',
          fontSize: { base: 'sm', md: 'md' },
          boxShadow: '1px 0 0 0 var(--colors-borders)',
          pointerEvents: previousPost ? 'auto' : 'none',
          _hover: {
            bg: 'borders',
          },
        })
      "
    >
      {{ previousPost?.title ?? null }}
    </NuxtLink>
    <NuxtLink
      :to="nextPost?.path"
      :class="
        flex({
          width: '50%',
          color: 'highlight',
          alignItems: 'center',
          textDecoration: 'none',
          py: { base: 4, md: 8 },
          px: { base: 4, md: 12 },
          justifyContent: 'flex-end',
          transition: 'background 0.3s',
          pointerEvents: nextPost ? 'auto' : 'none',
          _hover: {
            bg: 'borders',
          },
        })
      "
    >
      {{ nextPost?.title ?? null }}
    </NuxtLink>
  </section>
</template>

<style scoped>
section :deep(a:first-child)::before {
  content: v-bind('previousPost ? "' ← '" : "' '"');
  margin-right: 0.5rem;
}

section :deep(a:last-child)::after {
  content: v-bind('nextPost ? "' → '" : "' '"');
  margin-left: 0.5rem;
}
</style>
