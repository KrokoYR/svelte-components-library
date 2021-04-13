import Modal from './Modal.svelte';

export default {
  title: 'UI/Modal',
  component: Modal,
  argTypes: {
  },
};

const Template = ({ onClick, ...args }) => ({
  Component: Modal,
  props: args,
  on: {
    click: onClick,
  },
});

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Modal',
};
