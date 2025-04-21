<script setup lang="ts">
import { css } from "styled-system/css";
import { container, flex, hstack, vstack } from "styled-system/patterns";
import GoogleIcon from "~/ui/icons/google-icon.vue";
import GithubIcon from "~/ui/icons/github-icon.vue";
import Button from "~/ui/components/button/button.vue";
import Spinner from "~/ui/components/spinner/spinner.vue";
import type { GetArticleCommentDTO } from "~/services/article-comments/dto/dto";

const props = defineProps<{
  articleId: string;
}>();

const comment = ref("");
const postingComment = ref(false);

const auth = await useAuth();

const articleCommentsQuery = await useFetch<GetArticleCommentDTO[]>(
  `/api/article-comments?articleId=${props.articleId}`,
  {
    key: "__fk_article-comments__",
  },
);

const articleComments = computed(
  () => articleCommentsQuery.data.value ?? [],
);

function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  } else if (months > 0) {
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  } else if (days > 0) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else {
    return "just now";
  }
}

async function onSubmitComment() {
  if (comment.value.trim() !== "" && !postingComment.value) {
    postingComment.value = true;

    await $fetch("/api/article-comments", {
      method: "POST",
      cache: "no-cache",
      body: {
        articleId: props.articleId,
        comment: comment.value,
      },
      onResponse({ response }) {
        if (response.status === 201) {
          comment.value = "";
        }
      },
    });

    postingComment.value = false;

    await articleCommentsQuery.refresh();
  }
}
</script>

<template>
  <section
    :class="
      container({
        px: 6,
        lg: { maxW: '2xl' },
        xl: { maxW: '3xl' },
        mb: { base: 24, md: 12 },
      })
    "
  >
    <h2
      :class="
        css({
          fontWeight: 'bold',
          color: 'text_main',
          fontSize: { base: '2xl', md: '3xl' },
        })
      "
    >
      Comments
    </h2>
    <div
      v-if="!auth.logged.value"
      :class="
        hstack({
          mt: 6,
          gap: 3,
          flexWrap: 'wrap',
          md: { mt: 8, maxW: 'xl', flexWrap: 'nowrap' },
        })
      "
    >
      <Button variant="oauth" @click="auth.onSignIn('google')">
        <template v-slot:icon>
          <GoogleIcon />
        </template>
        Sign in with Google
      </Button>
      <Button variant="oauth" @click="auth.onSignIn('github')">
        <template v-slot:icon>
          <GithubIcon :class="css({ fill: 'text_main' })" />
        </template>
        Sign in with GitHub
      </Button>
    </div>
    <div v-else :class="css({ mt: 6 })">
      <textarea
        v-model="comment"
        placeholder="Leave a comment..."
        :class="
          css({
            p: 4,
            w: 'full',
            rounded: 'md',
            fontSize: 'lg',
            resize: 'none',
            color: 'text_main',
            border: '1px solid token(colors.borders)',
            _placeholder: {
              fontSize: 'sm',
            },
          })
        "
      />
      <div :class="flex({ justifyContent: 'end', mt: 1 })">
        <Button
          size="sm"
          @click="onSubmitComment"
          :disabled="postingComment"
        >
          <template v-if="!postingComment">Submit</template>
          <Spinner v-else />
        </Button>
      </div>
    </div>
    <ul
      v-if="articleComments.length > 0"
      :class="vstack({ mt: 12, alignItems: 'stretch', gap: 5 })"
    >
      <li
        :key="comment.id"
        v-for="comment in articleComments"
        :class="vstack({ gap: 1.5, alignItems: 'stretch' })"
      >
        <div :class="flex({ alignItems: 'center', gap: 2 })">
          <span :class="css({ color: 'text_main', fontWeight: 'medium' })">
            {{ comment.guestName }}
          </span>
          <span :class="css({ color: 'text_muted' })">
            {{ formatRelativeTime(comment.createdAt) }}
          </span>
        </div>
        <p :class="css({ color: 'text_main' })">
          {{ comment.comment }}
        </p>
      </li>
    </ul>
    <div v-else :class="vstack({ justifyContent: 'center', mt: 16 })">
      <h2
        :class="
          css({
            fontSize: '2xl',
            color: 'text_main',
            fontWeight: 'semibold',
          })
        "
      >
        No comments yet.
      </h2>
      <span :class="css({ color: 'text_muted' })">
        Start the conversation.
      </span>
    </div>
  </section>
</template>
