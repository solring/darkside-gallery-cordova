import PicGrid from "./PicGrid"
import {mockItem} from '../utils/mockdata'

function randH() {
  return 150 + Math.floor(Math.random() * 400)
}

const mockList = Array(24).fill(0).map(() => ({...mockItem, height: randH()}))

export default {
  title: 'PicGrid/PicGrid',
  component: PicGrid
}

const Template = (args) => <PicGrid {...args} />
export const Default = Template.bind({})
Default.args = {
  items: mockList
}