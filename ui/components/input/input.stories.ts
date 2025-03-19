import { css } from "styled-system/css";
import type { Meta, StoryObj } from "@storybook/vue3";
import Input from "~/ui/components/input/input.vue";

const meta = {
  title: "Components/Input",
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Type whatever you want...",
  },
  render: (args) => ({
    components: { Input },
    setup() {
      return { args };
    },
    template: `<Input v-bind='args' inputId='xyz' />`,
  }),
};

export const WithLabel: Story = {
  args: {},
  render: (args) => ({
    components: { Input },
    setup() {
      return { args };
    },
    template: `
      <Input v-bind='args' inputId='xyz'>
		<template v-slot:label>Label</template>
      </Input>
    `,
  }),
};

export const WithRigthElement: Story = {
  args: {},
  render: (args) => ({
    components: { Input },
    setup() {
      return { args, css };
    },
    template: `
	  <Input v-bind="args" :overrides="css.raw({ pr: 20 })" inputId="subscribe">
		<template v-slot:right-element>
		  <button
            :class="css({
              padding: 3,
              right: -3.5,
              fontSize: 'xs',
              color: 'db_black',
              fontWeight: 'medium',
              position: 'relative',
              _hover: {
                cursor: 'pointer',
                color: 'rgba(10, 13, 39, 0.8)',
              },
              _focus: {
                outline: '2px solid rgb(10, 13, 39)',
              },
            })"
          >
            Subscribe
          </button>
		</template>
	  </Input>
	`,
  }),
};
