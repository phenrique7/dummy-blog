export function useGenerateHeadings(props: { id?: string }) {
  const { headings } = useRuntimeConfig().public.mdc;

  return computed(() => {
    const hasAnchorLinks =
      (typeof headings?.anchorLinks === "boolean" &&
        headings?.anchorLinks === true) ||
      (typeof headings?.anchorLinks === "object" &&
        headings?.anchorLinks?.h2);

    return props.id && hasAnchorLinks;
  });
}
