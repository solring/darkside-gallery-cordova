import PicCard from "./PicCard"

import {mockItem} from '../utils/mockdata'

const decos = [
  (story) => <div style={{width: "200px"}}>{story()}</div>
]

export default {
  title: 'PicGrid/PicCard',
  component: PicCard,
  decorators: decos
}

const Template = (args) => <PicCard {...args} />;
export const Default = Template.bind({});
Default.args = {
  data: mockItem
}