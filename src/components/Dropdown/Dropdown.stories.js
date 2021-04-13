import Dropdown from './Dropdown.svelte';

export default {
  title: 'UI/Dropdown',
  component: Dropdown,
  argTypes: {
  },
};

const Template = ({ onClick, ...args }) => ({
  Component: Dropdown,
  props: args,
  on: {
    click: onClick,
  },
});

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Dropdown',
};
