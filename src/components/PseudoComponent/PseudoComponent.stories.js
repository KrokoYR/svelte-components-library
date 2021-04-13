import PseudoComponent from './PseudoComponent.svelte';

export default {
  title: 'UI/PseudoComponent',
  component: PseudoComponent,
  argTypes: {
  },
};

const Template = ({ onClick, ...args }) => ({
  Component: PseudoComponent,
  props: args,
  on: {
    click: onClick,
  },
});

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'PseudoComponent',
};
