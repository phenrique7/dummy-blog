<script setup lang="ts">
import { css } from "styled-system/css";
import { container } from "styled-system/patterns";
import PreviousNextPost from "~/ui/components/previous-next-post/previous-next-post.vue";

const route = useRoute();

const { data: page } = await useAsyncData(
  `post@${route.params.slug}`,
  () => queryCollection("article").path(route.path).first(),
);

useSeoMeta({
  title: page.value!.title + " − Alexander Maxwell",
  description: page.value!.description,
  ogTitle: page.value!.title + " − Alexander Maxwell",
  ogDescription: page.value!.description,
  ogImage: page.value?.thumbnail,
  twitterCard: "summary_large_image",
});

function formatPostDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
</script>

<template>
  <div v-if="page">
    <article
      :class="
        container({
          pt: 5,
          pb: 20,
          px: 6,
          md: { py: 16 },
          lg: { maxW: '2xl' },
          xl: { maxW: '3xl' },
        })
      "
    >
      <div :class="css({ mb: 12 })">
        <time
          :datetime="page.date"
          :class="css({ color: 'text_muted', fontWeight: 'semibold' })"
        >
          {{ formatPostDate(page.date) }}
        </time>
        <ProseH1>{{ page.title }}</ProseH1>
        <ProseH2>{{ page.description }}</ProseH2>
      </div>
      <ContentRenderer prose :value="page" />
    </article>
    <PreviousNextPost :currentPathPost="page.path" />
  </div>
  <template v-else>
    <div>
      <h1>Page Not Found</h1>
      <p>Oops! The content you're looking for doesn't exist.</p>
      <NuxtLink to="/">Go back home</NuxtLink>
    </div>
  </template>
</template>
