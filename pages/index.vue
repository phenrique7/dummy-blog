<script setup lang="ts">
import { css } from "styled-system/css";
import { grid } from "styled-system/patterns";
import PostCard from "~/ui/components/post-card/post-card.vue";
import EmptyState from "~/ui/components/empty-state/empty-state.vue";

const { displayPreferences } = useDisplayPreferences();

const { data } = await useAsyncData("posts", () =>
  queryCollection("article")
    .select(
      "id",
      "title",
      "date",
      "path",
      "category",
      "background",
      "description",
    )
    .order("date", "DESC")
    .all(),
);

const posts = data.value ?? [];

useSeoMeta({
  title: "Alexander Maxwell's dummy blog",
  description: "This is my amazing blog, let me tell you all about it.",
  ogTitle: "Alexander Maxwell's dummy blog",
  ogDescription: "This is my amazing blog, let me tell you all about it.",
  ogImage: "https://example.com/image.png",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <template v-if="posts.length === 0">
    <EmptyState />
  </template>
  <template v-else>
    <ul v-if="displayPreferences.display === 'list'">
      <li
        v-for="post in posts"
        :key="post.id"
        :class="
          css({ borderBottom: '1px solid', borderBottomColor: 'borders' })
        "
      >
        <PostCard :post="post" />
      </li>
    </ul>
    <div
      v-else
      :class="
        grid({
          gap: '1px',
          hideBelow: 'md',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
        })
      "
    >
      <div
        v-for="post in posts"
        :key="post.id"
        :class="
          css({
            border: 'medium',
            boxShadow: `0 -1px 0 0 var(--colors-borders),0 1px 0 0 var(--colors-borders),1px 0 0 0 var(--colors-borders),-1px 0 0 0 var(--colors-borders)`,
          })
        "
      >
        <PostCard :post="post" display="grid" />
      </div>
    </div>
  </template>
</template>
