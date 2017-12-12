/* eslint-env jest */

import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import TabPanel from './TabPanel';

const buildTabPanel = props => (
  <TabPanel>
    <TabPanel.Tab name="tab1">first</TabPanel.Tab>
    <TabPanel.Tab name="tab2" className="testing">
      second
    </TabPanel.Tab>
    <TabPanel.Tab name="tab3">third</TabPanel.Tab>
    <TabPanel.TabList name="multiTab">
      <TabPanel.TabItem name="option1" value="TheFirst">
        <div>multi first</div>
      </TabPanel.TabItem>
      <TabPanel.TabItem name="option2" value="TheSecond">
        <div>multi second</div>
      </TabPanel.TabItem>
      <TabPanel.TabItem name="option3" value="TheThird">
        <div>multi third</div>
      </TabPanel.TabItem>
    </TabPanel.TabList>
    <div />
  </TabPanel>
);

describe('Tab panel', () => {
  it('renders as expected', () => {
    const tree = renderer.create(buildTabPanel()).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('clicking a tab should set the panels value to its name', () => {
    const panelInstance = mount(buildTabPanel());
    const secondTab = panelInstance.find('.testing');
    expect(panelInstance.state('value')).toBe('');
    secondTab.simulate('click');
    expect(panelInstance.state('value')).toBe('tab2');
  });
});
