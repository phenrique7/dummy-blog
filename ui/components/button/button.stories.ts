import { hstack } from "styled-system/patterns";
import type { Meta, StoryObj } from "@storybook/vue3";
import GitHubIcon from "~/ui/icons/github-icon.vue";
import GoogleIcon from "~/ui/icons/google-icon.vue";
import Button from "~/ui/components/button/button.vue";

const meta = {
  title: "Components/Button",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: `
      <Button v-bind='args'>
		Solid
      </Button>
    `,
  }),
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: `
      <Button v-bind='args'>
		Ghost
      </Button>
    `,
  }),
};

export const Oauth: Story = {
  args: {
    variant: "oauth",
  },
  render: (args) => ({
    components: { Button, GitHubIcon, GoogleIcon },
    setup() {
      return { args, hstack };
    },
    template: `
	  <div :class='hstack()'>
        <Button v-bind='args'>
		  <template v-slot:icon>
		    <GoogleIcon />
		  </template>
		  Google
        </Button>
        <Button v-bind='args'>
		  <template v-slot:icon>
		    <GitHubIcon />
		  </template>
		  GitHub
        </Button>
	  </div>
    `,
  }),
};
