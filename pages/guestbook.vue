<script setup lang="ts">
import { css } from "styled-system/css";
import { container, hstack, vstack } from "styled-system/patterns";
import GoogleIcon from "~/ui/icons/google-icon.vue";
import GitHubIcon from "~/ui/icons/github-icon.vue";
import Input from "~/ui/components/input/input.vue";
import Button from "~/ui/components/button/button.vue";
import Spinner from "~/ui/components/spinner/spinner.vue";
import type { GuestbookPostResponse } from "~/services/guestbook-posts/dto/dto";

useSeoMeta({
  title: "Guestbook − Alexander Maxwell",
  ogTitle: "Guestbook − Alexander Maxwell",
  description: "Let me know what you think about this dummy blog.",
  ogDescription: "Let me know what you think about this dummy blog.",
  ogImage: "https://example.com/image.png",
  twitterCard: "summary_large_image",
});

const route = useRoute();
const signText = ref("");
const loggingOut = ref(false);
const postingMessage = ref(false);

const checkSessionQuery = await useFetch<{ logged: boolean }>(
  "/api/session",
  {
    key: "__fk_check-session__",
  },
);

const logged = computed(() => checkSessionQuery.data.value?.logged);

const guestbookPostsQuery = await useFetch<GuestbookPostResponse[]>(
  "/api/guestbook-posts",
  {
    key: "__fk_guestbook-posts__",
  },
);

const guestbookPosts = computed(
  () => guestbookPostsQuery.data.value ?? [],
);

function onSignIn(provider: "google" | "github") {
  window.location.href = `/login/${provider}?redirectUrl=${route.path}`;
}

async function onSignOut() {
  loggingOut.value = true;

  await $fetch("/api/session", {
    method: "DELETE",
    cache: "no-cache",
  });

  loggingOut.value = false;

  await checkSessionQuery.refresh();
}

async function onSignText() {
  if (signText.value.trim() !== "") {
    postingMessage.value = true;

    await $fetch("/api/guestbook-posts", {
      method: "POST",
      cache: "no-cache",
      body: {
        message: signText.value,
      },
      onResponse({ response }) {
        if (response.status === 201) {
          signText.value = "";
        }
      },
    });

    postingMessage.value = false;

    await guestbookPostsQuery.refresh();
  }
}
</script>

<template>
  <div
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
    <h1
      :class="
        css({
          fontSize: '3xl',
          color: 'text_main',
          fontWeight: 'bold',
          md: { fontSize: '4xl' },
        })
      "
    >
      Sign my guestbook
    </h1>
    <div
      v-if="!logged"
      :class="
        hstack({
          mt: 6,
          gap: 3,
          flexWrap: 'wrap',
          md: { mt: 8, maxW: 'xl', flexWrap: 'nowrap' },
        })
      "
    >
      <Button variant="oauth" @click="onSignIn('google')">
        <template v-slot:icon>
          <GoogleIcon />
        </template>
        Sign in with Google
      </Button>
      <Button variant="oauth" @click="onSignIn('github')">
        <template v-slot:icon>
          <GitHubIcon :class="css({ fill: 'text_main' })" />
        </template>
        Sign in with GitHub
      </Button>
    </div>
    <div
      v-else
      :class="css({ maxW: '100%', mt: 6, md: { maxW: 'xl', mt: 8 } })"
    >
      <Input
        v-model="signText"
        inputId="sign-guestbook"
        placeholder="Your message..."
      >
        <template v-slot:right-element>
          <button
            @click="onSignText"
            :disabled="postingMessage"
            :class="
              css({
                pr: 3,
                py: 2.5,
                pl: 2.5,
                fontSize: 'xs',
                color: 'text_main',
                position: 'relative',
                fontWeight: 'semibold',
                backgroundColor: 'medium_background',
                _hover: {
                  cursor: 'pointer',
                },
                _focus: {
                  outline: '2px solid rgb(10, 13, 39)',
                },
              })
            "
          >
            <template v-if="!postingMessage">Sign</template>
            <Spinner v-else />
          </button>
        </template>
      </Input>
      <div :class="hstack({ mt: 2, gap: 1 })">
        <Button
          size="xs"
          variant="ghost"
          @click="onSignOut"
          :disabled="loggingOut"
        >
          Sign out
        </Button>
        <Spinner v-if="loggingOut" />
      </div>
    </div>
    <ul
      v-if="guestbookPosts.length > 0"
      :class="vstack({ mt: 12, alignItems: 'stretch', gap: 4 })"
    >
      <li v-for="post in guestbookPosts" :key="post.id">
        <p :class="css({ color: 'text_main' })">
          <span :class="css({ color: 'text_muted' })">
            {{ post.guestName }}:
          </span>
          {{ post.message }}
        </p>
      </li>
    </ul>
  </div>
</template>
