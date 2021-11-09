import PicModal from "./PicModal"

import {mockItem} from '../utils/mockdata'

export default {
  title: 'PicGrid/PicModal',
  component: PicModal
};
const Template = (args) => <PicModal {...args} />
export const Empty = Template.bind({})
Empty.args = {
  toggle: true,
}

export const Default = Template.bind({})
Default.args = {
  toggle: true,
  data: mockItem,
}