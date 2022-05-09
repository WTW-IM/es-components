/* eslint-env jest */
/* eslint-disable react/prop-types */

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { render, cleanup, waitFor, screen } from '@testing-library/react';
import { renderWithTheme, ThemeComponent } from '../../util/test-utils';

import { Drawer, useDrawerItemContext } from './Drawer';

// Ensure styled panels always work
const StyledFirstPanel = styled(Drawer.Panel)`
  background-color: blue;
`;

const buildDrawer = props => (
  <Drawer className="important" {...props}>
    <StyledFirstPanel
      title="collapse 1"
      key="1"
      className="first"
      titleAside="side text"
    >
      first
    </StyledFirstPanel>
    <Drawer.Panel title="collapse 2" key="2" className="second" noPadding>
      second
    </Drawer.Panel>
    <Drawer.Panel title="collapse 3" key="3" className="third">
      third
    </Drawer.Panel>
  </Drawer>
);

beforeEach(cleanup);

describe('drawer', () => {
  it('active panel is opened', () => {
    const onActiveKeysChanged = jest.fn();
    const { getByText } = renderWithTheme(
      buildDrawer({ onActiveKeysChanged, activeKeys: ['1'] })
    );

    expect(getByText('first')).toBeVisible();
    expect(getByText('second')).not.toBeVisible();
    expect(getByText('third')).not.toBeVisible();
  });

  it('allows multiple panels to be opened at the same time', () => {
    const onActiveKeysChanged = jest.fn();
    const { getByText } = renderWithTheme(
      buildDrawer({ onActiveKeysChanged, activeKeys: ['1', '3'] })
    );

    expect(getByText('first')).toBeVisible();
    expect(getByText('second')).not.toBeVisible();
    expect(getByText('third')).toBeVisible();
  });
});

describe('accordion', () => {
  const isAccordion = true;

  it('should only allow one drawer to be opened at a time', async () => {
    const onActiveKeysChanged = jest.fn();
    const { getByText } = renderWithTheme(
      buildDrawer({ isAccordion, onActiveKeysChanged, activeKeys: ['1', '2'] })
    );

    await waitFor(() => {
      expect(getByText('first')).toBeVisible();
    });
    await waitFor(() => {
      expect(getByText('second')).not.toBeVisible();
    });
  });
});

describe('Drawer.Item functionality', () => {
  const ItemTracker = ({ trackDrawerChange }) => {
    const { open } = useDrawerItemContext();
    useEffect(() => {
      trackDrawerChange(open);
    }, [open]);

    return <></>;
  };

  const TestItemDrawer = ({
    openItems = [],
    onDrawersChange = [],
    ...props
  }) => (
    <ThemeComponent>
      <Drawer className="important" {...props}>
        <div>
          <Drawer.Item open={openItems[0]}>
            <ItemTracker
              trackDrawerChange={open =>
                onDrawersChange[0] && onDrawersChange[0]()
              }
            />
            <Drawer.ItemOpener>
              <button type="button">collapse 1</button>
            </Drawer.ItemOpener>
            <Drawer.ItemBody className="first">first</Drawer.ItemBody>
          </Drawer.Item>
        </div>
        <Drawer.Item open={openItems[1]}>
          <ItemTracker
            trackDrawerChange={open =>
              onDrawersChange[1] && onDrawersChange[1]()
            }
          />
          <Drawer.ItemOpener>
            <button type="button">collapse 2</button>
          </Drawer.ItemOpener>
          <Drawer.ItemBody className="second">second</Drawer.ItemBody>
        </Drawer.Item>
        <Drawer.Item open={openItems[2]}>
          <ItemTracker
            trackDrawerChange={open =>
              onDrawersChange[2] && onDrawersChange[2]()
            }
          />
          <Drawer.ItemOpener>
            <button type="button">collapse 3</button>
          </Drawer.ItemOpener>
          <Drawer.ItemBody className="third">third</Drawer.ItemBody>
        </Drawer.Item>
      </Drawer>
    </ThemeComponent>
  );

  it('can open from a click', async () => {
    const { findByText } = screen;
    render(<TestItemDrawer />);

    expect(await findByText('first')).not.toBeVisible();

    (await findByText('collapse 1')).click();

    await waitFor(async () => {
      expect(await findByText('first')).toBeVisible();
    });
  });

  it('can close from a click', async () => {
    const { findByText } = screen;
    render(<TestItemDrawer />);

    expect(await findByText('first')).not.toBeVisible();

    (await findByText('collapse 1')).click();

    await waitFor(async () => {
      expect(await findByText('first')).toBeVisible();
    });

    (await findByText('collapse 1')).click();

    await waitFor(async () => {
      expect(await findByText('first')).not.toBeVisible();
    });
  });

  it('can open from a prop', async () => {
    const { findByText } = screen;
    render(<TestItemDrawer openItems={[true]} />);

    expect(await findByText('first')).toBeVisible();
  });

  it('can close from a prop', async () => {
    const { findByText } = screen;
    const { rerender } = render(<TestItemDrawer openItems={[true]} />);

    expect(await findByText('first')).toBeVisible();

    rerender(<TestItemDrawer openItems={[false]} />);

    await waitFor(async () => {
      expect(await findByText('first')).not.toBeVisible();
    });
  });

  it('reopens from a prop after a click', async () => {
    let theRerender = () => ({});
    const renderAgain = (open, renderFunc) =>
      renderFunc(
        <TestItemDrawer
          openItems={[open]}
          onDrawersChange={[newOpen => renderAgain(newOpen, theRerender)]}
        />
      );
    const { findByText } = screen;
    const { rerender } = renderAgain(true, render);
    theRerender = rerender;

    expect(await findByText('first')).toBeVisible();

    (await findByText('collapse 1')).click();

    await waitFor(async () => {
      expect(await findByText('first')).not.toBeVisible();
    });

    renderAgain(true, theRerender);

    await waitFor(async () => {
      expect(await findByText('first')).toBeVisible();
    });
  });

  it('matches correctly from prop to click', async () => {
    const { findByText } = screen;
    const { rerender } = render(<TestItemDrawer openItems={[true]} />);

    expect(await findByText('first')).toBeVisible();

    (await findByText('collapse 1')).click();

    await waitFor(async () => {
      expect(await findByText('first')).not.toBeVisible();
    });

    rerender(<TestItemDrawer openItems={[false]} />);

    await waitFor(async () => {
      expect(await findByText('first')).not.toBeVisible();
    });
  });
});
