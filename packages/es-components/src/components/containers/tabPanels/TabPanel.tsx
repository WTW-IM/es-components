import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tab, { TabAction, TabProps, RequiredReactNode } from './Tab';
import noop from '../../util/noop';

const TabList = styled.div`
  display: flex;
  flex-direction: column;
  font-size: inherit;
  overflow: hidden;
  @media (max-width: ${props => props.theme.screenSize.desktop}) {
    width: 100%;
  }
  @media (min-width: ${props => props.theme.screenSize.desktop}) {
    flex-direction: row;
    justify-content: flex-start;
  }
`;

const TabContent = styled.div`
  margin-top: -1px;
  background-color: ${props => props.theme.colors.white};
  border-top: 1px solid ${props => props.theme.colors.gray4};
`;

type TabElement = React.ReactElement<TabProps>;
type PossibleTabElement = TabElement | React.ReactNode;

type TabPanelChildProps = Override<
  Partial<TabProps>,
  {
    child: PossibleTabElement;
  }
>;

const TabPanelTabRenderer = ({ child, ...tabChildProps }: TabPanelChildProps) =>
  React.isValidElement<TabProps>(child)
    ? React.cloneElement(child, tabChildProps)
    : child;

const TabContentChildRenderer = ({ child }: { child: PossibleTabElement }) =>
  React.isValidElement<TabProps>(child) ? child.props.children : child;

const childIsSelected = (child: PossibleTabElement, key: React.ReactNode) => {
  if (!React.isValidElement<TabProps>(child)) {
    return false;
  }

  const elementName = child.props.name as Maybe<React.ReactElement>;

  return elementName?.key ? elementName.key === key : child.props.name === key;
};

export type TabPanelProps = Override<
  JSXElementProps<'div'>,
  {
    children: TabElement | TabElement[];
    selectedKey?: React.ReactNode;
    tabChanged?: (header: RequiredReactNode) => void;
    canTabChange?: (
      header: RequiredReactNode
    ) => Maybe<boolean> | Promise<Maybe<boolean>>;
  }
>;

const tabCanChangeFunc = () => true;

const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(
  function ForwardedTabPanel(
    {
      children,
      selectedKey,
      tabChanged = noop,
      canTabChange = tabCanChangeFunc,
      ...props
    },
    ref
  ) {
    const [value, setValue] = useState(selectedKey);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const selectTabAction = useCallback<TabAction>(
      async header => {
        /*
        We may want to display some interstitial UI to show that we're waiting to determine if we can get to the next tab.
        Being the first implementation of async support, this is fine for now.
        But were async support to grow and spread to other components, concerns like the above should definately be addressed for consistency.
        */

        const canChange = await canTabChange(header);
        if (canChange) {
          setValue(header);
          tabChanged(header);
        }
      },
      [canTabChange, tabChanged]
    );
    const arrayOfChildren = React.Children.toArray(children);

    useEffect(() => {
      const childArray = React.Children.toArray(children);
      const newSelectedIndex = childArray.findIndex(child =>
        childIsSelected(child, selectedKey || value)
      );

      setSelectedIndex(Math.max(newSelectedIndex, 0));
    }, [selectedKey, value, children]);

    return (
      <div ref={ref} {...props}>
        <TabList role="tablist" className="tab-list">
          {arrayOfChildren.map((child, index) => (
            <TabPanelTabRenderer
              key={`${(child as React.ReactElement).key || ''}-${index}`}
              selected={index === selectedIndex}
              action={selectTabAction}
              child={child}
            />
          ))}
        </TabList>
        <TabContent role="tabpanel" className="tab-content">
          <TabContentChildRenderer child={arrayOfChildren[selectedIndex]} />
        </TabContent>
      </div>
    );
  }
);

const childrenMustBeTabsRule: PropTypes.Validator<TabElement | TabElement[]> = (
  props,
  propName
) => {
  const theProp = props[propName] as PossibleTabElement | PossibleTabElement[];
  const children = Array.isArray(theProp) ? theProp : [theProp];

  if (
    !children.every(child => {
      if (!React.isValidElement<TabProps>(child)) return false;

      const constructorType = child.type as typeof Tab.constructor;
      const targetType = child.type as unknown as {
        target: Maybe<typeof Tab>;
      };
      return (
        child.type === 'Tab' ||
        child.type === Tab ||
        constructorType.name === 'Tab' ||
        targetType.target === Tab
      );
    })
  ) {
    console.error('tab panel tab failure', children);
    return new Error('Tab Panel only accepts Tabs as direct descendants.');
  }

  return null;
};

TabPanel.propTypes = {
  /**
   * Makes sure immediate children are Tabs, as we cannot render anything else in the tab heading.
   */
  children: childrenMustBeTabsRule,
  selectedKey: PropTypes.any,
  /**
   * Callback run before the selected tab has changed. The callback is given the name of the tab that is active and returns whether the tab change event should fire.
   */
  canTabChange: PropTypes.func,
  /**
   * Callback when the selected tab has changed. The callback is given the name of the tab that is active
   */
  tabChanged: PropTypes.func,
  className: PropTypes.string
};

TabPanel.defaultProps = {
  children: undefined,
  selectedKey: '',
  tabChanged: noop,
  canTabChange: tabCanChangeFunc
};

type TabPanelComponent = typeof TabPanel & {
  Tab: typeof Tab;
};

(TabPanel as TabPanelComponent).Tab = Tab;

export default TabPanel as TabPanelComponent;
