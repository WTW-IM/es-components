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
  </TabPanel>
);

describe('Tab panel', () => {
  let panelInstance;

  beforeAll(() => {
    panelInstance = mount(buildTabPanel());
  });

  it('renders as expected', () => {
    const tree = renderer.create(buildTabPanel()).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('clicking a tab should set the panels value to its name', () => {
    const secondTab = panelInstance.find('.testing');
    expect(panelInstance.state('value')).toBe('');
    secondTab.simulate('click');
    expect(panelInstance.state('value')).toBe('tab2');
  });

  it('child is selected correctly', () => {
    panelInstance.setState({ value: 'something' });
    expect(panelInstance.instance().isChildSelected('something', 5)).toBe(true);
  });

  it('child is not selected when values are different', () => {
    panelInstance.setState({ value: 'test' });
    expect(panelInstance.instance().isChildSelected('something', 5)).toBe(
      false
    );
  });

  it('child is selected when default', () => {
    panelInstance.setState({ value: '' });
    expect(panelInstance.instance().isChildSelected('something', 0)).toBe(true);
  });

  it('decrements when left arrow is pressed', () => {
    panelInstance.setState({ value: 'bye', allValues: ['hi', 'bye', 'there'] });
    panelInstance.simulate('keyDown', { key: 'ArrowLeft' });
    expect(panelInstance.state('value')).toBe('hi');
  });

  it('increments when right arrow is pressed', () => {
    panelInstance.setState({ value: 'bye', allValues: ['hi', 'bye', 'there'] });
    panelInstance.simulate('keyDown', { key: 'ArrowRight' });
    expect(panelInstance.state('value')).toBe('there');
  });

  it('decrements and wraps when left arrow is pressed at start', () => {
    panelInstance.setState({ value: 'hi', allValues: ['hi', 'bye', 'there'] });
    panelInstance.simulate('keyDown', { key: 'ArrowLeft' });
    expect(panelInstance.state('value')).toBe('there');
  });

  it('increments and wraps when right arrow is pressed at end', () => {
    panelInstance.setState({
      value: 'there',
      allValues: ['hi', 'bye', 'there']
    });
    panelInstance.simulate('keyDown', { key: 'ArrowRight' });
    expect(panelInstance.state('value')).toBe('hi');
  });
});
