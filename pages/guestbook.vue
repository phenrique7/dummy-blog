<script setup lang="ts">
import { css } from "styled-system/css";
import { container, hstack } from "styled-system/patterns";
import GoogleIcon from "~/ui/icons/google-icon.vue";
import GitHubIcon from "~/ui/icons/github-icon.vue";
import Input from "~/ui/components/input/input.vue";
import Button from "~/ui/components/button/button.vue";
import Spinner from "~/ui/components/spinner/spinner.vue";

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

const checkSessionQuery = await useFetch<{ logged: boolean }>(
  "/api/session",
  {
    key: "__fk_check-session__",
  },
);

const deleteSessionQuery = await useFetch("/api/session", {
  method: "DELETE",
  immediate: false,
  key: "__fk_delete-session__",
});

const logged = computed(() => checkSessionQuery.data.value?.logged);
const loggingOut = computed(
  () =>
    deleteSessionQuery.status.value === "pending" ||
    checkSessionQuery.status.value === "pending",
);

function onSignIn(provider: "google" | "github") {
  window.location.href = `/login/${provider}?redirectUrl=${route.path}`;
}

async function onSignOut() {
  await deleteSessionQuery.execute();
  await checkSessionQuery.refresh();
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
            :class="
              css({
                padding: 3,
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
            Sign
          </button>
        </template>
      </Input>
      <div :class="css({ w: '4.5rem', '& div': { ml: 1 } })">
        <Button
          size="sm"
          variant="ghost"
          @click="onSignOut"
          :disabled="loggingOut"
        >
          Sign out
          <Spinner v-if="loggingOut" />
        </Button>
      </div>
    </div>
  </div>
</template>
