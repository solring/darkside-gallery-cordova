import Sidebar from "./Sidebar";

const deco = [
  (story) => (
    <div className="row bg-dark g-0 vh-100">
      <div className="col-3">
        {story()}
      </div>
    </div>
  )
]

export default {
  title: 'Sidebar/Sidebar',
  component: Sidebar,
  decorators: deco
};
const Template = (args) => <Sidebar {...args} />;
export const Default = Template.bind({});
Default.args = {

};