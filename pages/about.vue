<script setup lang="ts">
import { container } from "styled-system/patterns";

const { data: page } = await useAsyncData("about", () =>
  queryCollection("about").first(),
);

useSeoMeta({
  title: page.value!.title + " − Alexander Maxwell",
  description: page.value!.description,
  ogTitle: page.value!.title + " − Alexander Maxwell",
  ogDescription: page.value!.description,
  ogImage: "/images/notion-avatar.png",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <div v-if="page">
    <article
      :class="
        container({
          pt: 5,
          px: 6,
          pb: 20,
          md: { py: 16 },
          lg: { maxW: '2xl' },
          xl: { maxW: '3xl' },
        })
      "
    >
      <ProseH1>{{ page.title }}</ProseH1>
      <ContentRenderer :value="page" />
    </article>
  </div>
  <template v-else>
    <div>
      <h1>Page Not Found</h1>
      <p>Oops! The content you're looking for doesn't exist.</p>
      <NuxtLink to="/">Go back home</NuxtLink>
    </div>
  </template>
</template>
