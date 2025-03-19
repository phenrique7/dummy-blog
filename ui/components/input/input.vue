<script setup lang="ts">
import { css, type Styles } from "styled-system/css";

defineProps<{
  inputId: string;
  overrides?: Styles;
}>();

const model = defineModel();
</script>

<template>
  <div>
    <template v-if="$slots.label">
      <label
        :for="`input-${inputId}`"
        :class="
          css({
            bottom: 0.5,
            fontSize: 'sm',
            color: 'db_black',
            position: 'relative',
          })
        "
      >
        <slot name="label" />
      </label>
    </template>
    <div :class="css({ position: 'relative' })">
      <input
        v-model="model"
        aria-invalid="false"
        :id="`input-${inputId}`"
        :aria-errormessage="`error-${inputId}`"
        :class="
          css(
            {
              height: 11,
              padding: 3,
              width: '100%',
              fontSize: 'sm',
              color: 'text_main',
              borderRadius: 'sm',
              border: '1px solid',
              borderColor: 'borders',
              backgroundColor: 'medium_background',
              _placeholder: {
                fontSize: 'sm',
              },
              _focus: {
                outline: '2px solid rgb(10, 13, 39)',
              },
            },
            overrides,
          )
        "
        v-bind="$attrs"
      />
      <template v-if="$slots['right-element']">
        <span
          :class="
            css({
              top: '50%',
              right: 0.5,
              position: 'absolute',
              transform: 'translateY(-50%)',
            })
          "
        >
          <slot name="right-element" />
        </span>
      </template>
    </div>
    <div
      :id="`error-${inputId}`"
      aria-live="polite"
      :class="css({ fontSize: 'xs', color: 'red.500', mt: 1 })"
    />
  </div>
</template>
