import Avatars from './Avatars.svelte';

export default {
  title: 'UI/Avatars',
  component: Avatars,
  argTypes: {
  },
};

const Template = ({ onClick, ...args }) => ({
  Component: Avatars,
  props: args,
  on: {
    click: onClick,
  },
});

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Avatars',
};
