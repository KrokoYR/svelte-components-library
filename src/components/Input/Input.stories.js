import Input from './Input.svelte';
import QuestionMark from '../Icons/QuestionMark.svelte'

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
  label: 'Input',
  error: false,
  helpText: 'default sub text',
  icon: QuestionMark
};
