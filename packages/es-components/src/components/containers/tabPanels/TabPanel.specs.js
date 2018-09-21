/* eslint-env jest */

import React from 'react';
import { mountWithTheme, renderWithTheme } from 'styled-enzyme';

import TabPanel from './TabPanel';

describe('Tab panel component', () => {
  const instanceToRender = (
    <TabPanel optionKeyFunc={x => x.replace(/\s/g, '')}>
      <TabPanel.Tab name="test1">
        <div>Test Content 1</div>
      </TabPanel.Tab>
      <TabPanel.Tab name="test2">
        <div>Test Content 2</div>
      </TabPanel.Tab>
    </TabPanel>
  );

  const instanceWithAnnouncer = (
    <TabPanel optionKeyFunc={x => x.replace(/\s/g, '')}>
      <TabPanel.Tab
        name="test1"
        simpleName="I'm Simple Name!"
        announcerText="Why am I not just part of simpleName?"
      >
        <div>Test Content 1</div>
      </TabPanel.Tab>
      <TabPanel.Tab name="test2">
        <div>Test Content 2</div>
      </TabPanel.Tab>
    </TabPanel>
  );

  it('renders as expected', () => {
    const tree = renderWithTheme(instanceToRender).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders as expected with aria announcer text', () => {
    const tree = renderWithTheme(instanceWithAnnouncer).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Will select first child on load', () => {
    const tabPanelInstance = mountWithTheme(instanceToRender);
    expect(tabPanelInstance.state('value')).toBe('test1');
  });

  it('Properly selects a tab', () => {
    const tabPanelInstance = mountWithTheme(instanceToRender);
    tabPanelInstance.setState({ value: 'test2' });
    expect(
      tabPanelInstance
        .find({ name: 'test2' })
        .first()
        .props().selected
    ).toBe(true);
  });

  it('Clicks on tab select them', () => {
    const tabPanelInstance = mountWithTheme(instanceToRender);
    const tab = tabPanelInstance.find({ name: 'test2' });
    const tabButton = tab.find('button');
    tabButton.simulate('click');
    expect(tabPanelInstance.state('value')).toBe('test2');
  });

  it('Clicking on tab invokes the callback', () => {
    let selectedTab = 'test1';
    const tabPanelInstance = mountWithTheme(instanceToRender);
    tabPanelInstance.setProps({
      tabChanged(name) {
        selectedTab = name;
      }
    });

    const tab = tabPanelInstance.find({ name: 'test2' });
    const tabButton = tab.find('button');
    tabButton.simulate('click');
    expect(selectedTab).toBe('test2');
  });

  it('Clicking the selected tab does not invoke the callback unnecessarily', () => {
    let timesCalled = 0;
    const tabPanelInstance = mountWithTheme(instanceToRender);
    tabPanelInstance.setProps({
      tabChanged() {
        timesCalled += 1;
      }
    });

    const tab = tabPanelInstance.find({ name: 'test2' });
    const tabButton = tab.find('button');
    tabButton.simulate('click');
    tabButton.simulate('click');
    expect(timesCalled).toBe(1);
  });
});
