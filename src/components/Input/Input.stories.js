import Input from './Input.svelte';

export default {
  title: 'UI/Input',
  component: Input,
  argTypes: {
  },
};

const Template = ({ onClick, ...args }) => ({
  Component: Input,
  props: args,
  on: {
    click: onClick,
  },
});

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Input',
};
