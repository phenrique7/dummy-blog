<script setup lang="ts">
import { flex } from "styled-system/patterns";
import { css } from "styled-system/css";

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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        :class="
          css({
            h: 5,
            mr: 2,
            minW: 5,
            display: previousArticle ? 'block' : 'none',
          })
        "
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
        />
      </svg>
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        :class="
          css({
            h: 5,
            ml: 2,
            minW: 5,
            display: nextArticle ? 'block' : 'none',
          })
        "
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
        />
      </svg>
    </NuxtLink>
  </section>
</template>
