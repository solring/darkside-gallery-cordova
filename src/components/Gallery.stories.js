import Gallery from "./Gallery"
import { Provider } from "react-redux"
import configureAppStore from '../store'

// mock data
import { mockState } from '../utils/mockdata'
const store = configureAppStore(mockState)

const decos = [
  (story) => <Provider store={store}>{story()}</Provider>
]

export default {
  title: 'Gallery/Gallery',
  component: Gallery,
  decorators: decos
};

const Template = (args) => <Gallery {...args} />
export const Default = Template.bind({})
Default.args = {

}