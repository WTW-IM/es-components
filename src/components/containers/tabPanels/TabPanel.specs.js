/* eslint-env jest */

import React from 'react';
import { mount } from 'enzyme';

import TabPanel from './TabPanel';

describe('Tab panel component', () => {
  const instanceToRender = (
    <TabPanel>
      <TabPanel.Tab name="test1">
        <div>Test Content 1</div>
      </TabPanel.Tab>
      <TabPanel.Tab name="test2">
        <div>Test Content 2</div>
      </TabPanel.Tab>
      <TabPanel.TabList name="testList">
        <span optionText="test3">
          <div>Test Content 3</div>
        </span>
        <span optionText="test4">
          <div>Test Content 4</div>
        </span>
      </TabPanel.TabList>
    </TabPanel>
  );

  const complexInstanceToRender = (
    <TabPanel>
      <TabPanel.TabList name="testList">
        <span optionText="test3">
          <div>Test Content 3</div>
        </span>
        <span optionText="test4">
          <div>Test Content 4</div>
        </span>
      </TabPanel.TabList>
      <TabPanel.Tab name="test1">
        <div>Test Content 1</div>
      </TabPanel.Tab>
      <TabPanel.Tab name="test2">
        <div>Test Content 2</div>
      </TabPanel.Tab>
    </TabPanel>
  );

  it('Will select first child on load', () => {
    const tabPanelInstance = mount(instanceToRender);
    expect(tabPanelInstance.state('value')).toBe('test1');
  });

  it('Will select first list item when rendering', () => {
    const tabPanelInstance = mount(complexInstanceToRender);
    expect(tabPanelInstance.state('value')).toBe('test3');
  });

  it('Properly selects a list', () => {
    const tabPanelInstance = mount(instanceToRender);
    tabPanelInstance.setState({ value: 'test3' });
    expect(tabPanelInstance.find({ name: 'testList' }).props().selected).toBe(
      true
    );
  });

  it('Properly selects a tab', () => {
    const tabPanelInstance = mount(instanceToRender);
    tabPanelInstance.setState({ value: 'test2' });
    expect(tabPanelInstance.find({ name: 'test2' }).props().selected).toBe(
      true
    );
  });

  it('Clicks on tab select them', () => {
    const tabPanelInstance = mount(instanceToRender);
    const tab = tabPanelInstance.find({ name: 'test2' });
    const tabButton = tab.find('button');
    tabButton.simulate('click');
    expect(tabPanelInstance.state('value')).toBe('test2');
  });
});
