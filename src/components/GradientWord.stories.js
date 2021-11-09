import GradientWord from "./GradientWord"

export default {
  title: 'primitives/GradientWord',
  component: GradientWord
};
const Template = (args) => (
  <GradientWord {...args} >
    <h1>Test main title</h1>
  </GradientWord>)

export const Default = Template.bind({});
Default.args = {
  color1: "#4466aa",
  color2: "#ee55aa",
}