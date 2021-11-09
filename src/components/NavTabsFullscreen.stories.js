import NavTabsFullscreen from "./NavTabsFullscreen"
import * as origin from "./NavTabs.stories"

export default {
  title: 'NavTabs/NavTabsFullscreen',
  component: NavTabsFullscreen
}

const Template = (args) => <NavTabsFullscreen {...args} />
export const Default = Template.bind({})
Default.args = {
  ...origin.Default.args,
  toggle: true
}

export const Selected = Template.bind({})
Selected.args = {
  ...origin.Selected.args,
  toggle: true
}

export const SelectedTags = Template.bind({})
SelectedTags.args = {
  ...origin.SelectedTags.args,
  toggle: true
}