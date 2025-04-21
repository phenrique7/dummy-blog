<script setup lang="ts">
import { flex } from "styled-system/patterns";

const props = defineProps<{
  articlePath: string;
}>();

const { data } = await useAsyncData("articles", () =>
  queryCollection("article")
    .select("title", "path", "date")
    .order("date", "DESC")
    .all(),
);

const articles = data.value ?? [];
const currentArticleIndex = articles.findIndex(
  (post) => post.path === props.articlePath,
);
const previousArticle = articles[currentArticleIndex - 1];
const nextArticle = articles[currentArticleIndex + 1];
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
      :to="previousArticle?.path"
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
          pointerEvents: previousArticle ? 'auto' : 'none',
          _hover: {
            bg: 'borders',
          },
        })
      "
    >
      {{ previousArticle?.title ?? null }}
    </NuxtLink>
    <NuxtLink
      :to="nextArticle?.path"
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
          pointerEvents: nextArticle ? 'auto' : 'none',
          _hover: {
            bg: 'borders',
          },
        })
      "
    >
      {{ nextArticle?.title ?? null }}
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
