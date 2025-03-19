export function useDisplayPreferences() {
  const displayPreferences = useCookie<{
    theme: "dark" | "light";
    display: "list" | "grid";
  }>("__display-preferences__", {
    default: () => ({ theme: "dark", display: "list" }),
  });

  function setPreferredDisplay() {
    displayPreferences.value.display =
      displayPreferences.value.display === "list" ? "grid" : "list";
  }

  function setPreferredTheme() {
    displayPreferences.value.theme =
      displayPreferences.value.theme === "dark" ? "light" : "dark";
  }

  return { displayPreferences, setPreferredDisplay, setPreferredTheme };
}
