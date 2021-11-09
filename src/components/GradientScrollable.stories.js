import GradientScrollable from "./GradientScrollable"

import * as vars from '../utils/constants'

export default {
  title: 'Primitives/GradientScrollable',
  component: GradientScrollable
}

const testContent = Array(10).fill().map(() => (
  <p className="text-light">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, eius dicta quibusdam sed est officia alias fugit temporibus reiciendis? Aut ad assumenda repellat praesentium natus eveniet perferendis saepe nisi quae?
Unde, numquam. Ex, odit dolor distinctio eum nam maxime ipsum vel optio nemo quae recusandae cum voluptate? Odio aliquid perferendis officia tempora, maiores provident minus soluta inventore labore aliquam suscipit.
Dolorem, expedita voluptatibus rerum sapiente hic beatae quas atque animi odit pariatur! Commodi saepe reprehenderit ad illo quaerat distinctio excepturi, similique, repudiandae delectus doloremque neque provident sunt quisquam sint quam.
Sit debitis animi libero?
  </p>
))

const Template = (args) => <GradientScrollable {...args} >{testContent}</GradientScrollable>;
export const Default = Template.bind({});
Default.args = {
  color1: vars.GRADIENT_COLOR1,
  color2: vars.GRADIENT_COLOR2,
  height: 600
}