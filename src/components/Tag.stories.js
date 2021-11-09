import Tag from "./Tag";

const decos = [
  (story) => <div className="p-4 bg-light">{story()}</div>
]

export default {
  title: 'NavTabs/Tag',
  component: Tag,
  decorators: decos,
};

const Template = (args) => <Tag {...args}>Tag</Tag>;
export const Default = Template.bind({});
Default.args = {
  active: false,
};

export const Active = Template.bind({});
Active.args = {
  active: true,
};