<script setup lang="ts">
import { css } from "styled-system/css";
import { flex } from "styled-system/patterns";
import HomeIcon from "~/ui/icons/home-icon.vue";
import GridIcon from "~/ui/icons/grid-icon.vue";
import ListIcon from "~/ui/icons/list-icon.vue";
import LightIcon from "~/ui/icons/light-icon.vue";
import SearchIcon from "~/ui/icons/search-icon.vue";
import ArrowUpIcon from "~/ui/icons/arrow-up-icon.vue";
import IconButton from "~/ui/components/icon-button/icon-button.vue";

const { displayPreferences, setPreferredTheme, setPreferredDisplay } =
  useDisplayPreferences();
</script>

<template>
  <aside
    :class="
      flex({
        py: 0,
        px: 3,
        bottom: 0,
        height: 14,
        width: '100%',
        flexDir: 'row',
        position: 'fixed',
        alignItems: 'center',
        justify: 'space-between',
        background: 'medium_background',
        md: {
          px: 0,
          py: 6,
          right: 0,
          width: '3.75rem',
          height: '100dvh',
          flexDir: 'column',
          borderLeft: '1px solid',
          borderLeftColor: 'borders',
        },
      })
    "
  >
    <div
      :class="
        flex({
          gap: 4,
          alignItems: 'center',
          md: { flexDir: 'column' },
        })
      "
    >
      <div
        :class="
          flex({
            w: 12,
            h: 12,
            cursor: 'pointer',
            justifyContent: 'center',
          })
        "
      >
        <NuxtLink to="/" :class="flex()">
          <IconButton
            variant="ghost"
            :overrides="{
              root: css.raw({ width: '100%' }),
              icon: css.raw({
                '& svg': { transition: 'fill 0.2s' },
                '& svg:hover': { fill: 'highlight' },
              }),
            }"
          >
            <HomeIcon color="var(--colors-text_main)" />
          </IconButton>
        </NuxtLink>
      </div>
      <div
        :class="
          flex({
            w: 12,
            h: 12,
            cursor: 'pointer',
            justifyContent: 'center',
          })
        "
      >
        <IconButton
          variant="ghost"
          :overrides="{
            root: css.raw({ width: '100%' }),
            icon: css.raw({
              '& svg': { transition: 'fill 0.2s' },
              '& svg:hover': { fill: 'highlight' },
            }),
          }"
        >
          <SearchIcon color="var(--colors-text_main)" />
        </IconButton>
      </div>
    </div>
    <div
      :class="
        flex({
          gap: 4,
          alignItems: 'center',
          md: {
            gap: 6,
            flexDir: 'column',
          },
        })
      "
    >
      <div
        :class="
          flex({
            w: 12,
            h: 12,
            cursor: 'pointer',
            justifyContent: 'center',
          })
        "
      >
        <IconButton
          size="sm"
          variant="ghost"
          @click="setPreferredTheme"
          :overrides="{
            root: css.raw({ width: '100%' }),
            icon: css.raw({
              '& svg': { transition: 'fill 0.2s' },
              '& svg:hover': {
                fill:
                  displayPreferences.theme === 'light'
                    ? '#E2E240'
                    : 'highlight',
              },
            }),
          }"
        >
          <LightIcon
            :color="
              displayPreferences.theme === 'light'
                ? '#D4D400'
                : 'var(--colors-text_main)'
            "
          />
        </IconButton>
      </div>
      <IconButton
        variant="ghost"
        @click="setPreferredDisplay"
        :overrides="{
          root: css.raw({ hideBelow: 'md' }),
          icon: css.raw({
            '& svg': { transition: 'fill 0.2s' },
            '& svg:hover': { fill: 'highlight' },
          }),
        }"
      >
        <GridIcon
          color="var(--colors-text_main)"
          v-if="displayPreferences.display === 'list'"
        />
        <ListIcon v-else color="var(--colors-text_main)" />
      </IconButton>
      <div
        :class="
          flex({
            w: 12,
            h: 12,
            cursor: 'pointer',
            justifyContent: 'center',
          })
        "
      >
        <IconButton
          variant="ghost"
          :overrides="{
            root: css.raw({ width: '100%' }),
            icon: css.raw({
              '& svg': { transition: 'fill 0.2s' },
              '& svg:hover': { fill: 'highlight' },
            }),
          }"
        >
          <ArrowUpIcon color="var(--colors-text_main)" />
        </IconButton>
      </div>
    </div>
  </aside>
</template>
