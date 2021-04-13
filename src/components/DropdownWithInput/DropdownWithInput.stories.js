import DropdownWithInput from './DropdownWithInput.svelte';

export default {
  title: 'UI/DropdownWithInput',
  component: DropdownWithInput,
  argTypes: {
  },
};

const Template = ({ onClick, ...args }) => ({
  Component: DropdownWithInput,
  props: args,
  on: {
    click: onClick,
  },
});

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'DropdownWithInput',
};
