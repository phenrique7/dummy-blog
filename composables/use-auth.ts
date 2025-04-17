export async function useAuth() {
  const route = useRoute();
  const loggingOut = ref(false);

  const checkSessionQuery = await useFetch<{ logged: boolean }>(
    "/api/session",
    {
      key: "__fk_check-session__",
    },
  );

  const logged = computed(() => checkSessionQuery.data.value?.logged);

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

  return { logged, onSignIn, onSignOut, loggingOut };
}
