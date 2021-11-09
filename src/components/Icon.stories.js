import Icon from './Icon';

export default {
  title: 'Primitives/Icon',
  component: Icon,
};

const Template = (args) => <Icon {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  name: "assessment",
  size: "md",
};

export const Large = Template.bind({});
Large.args = {
  name: "assessment",
  size: "large",
};