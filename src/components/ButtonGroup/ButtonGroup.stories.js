import ButtonGroup from './ButtonGroup.svelte';

export default {
  title: 'UI/ButtonGroup',
  component: ButtonGroup,
  argTypes: {
  },
};

const Template = ({ onClick, ...args }) => ({
  Component: ButtonGroup,
  props: args,
  on: {
    click: onClick,
  },
});

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'ButtonGroup',
};
