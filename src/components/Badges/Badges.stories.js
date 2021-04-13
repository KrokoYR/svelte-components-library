import Badges from './Badges.svelte';

export default {
  title: 'UI/Badges',
  component: Badges,
  argTypes: {
  },
};

const Template = ({ onClick, ...args }) => ({
  Component: Badges,
  props: args,
  on: {
    click: onClick,
  },
});

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Badges',
};
