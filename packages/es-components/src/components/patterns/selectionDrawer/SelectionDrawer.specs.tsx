/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { css as styledCss } from 'styled-components';
import userEvent from '@testing-library/user-event';
import viaTheme from 'es-components-via-theme';
import { ThemeComponent } from '../../util/test-utils';
import SelectionDrawer, { SelectionDrawerProps } from './SelectionDrawer';
import { SelectionDrawerItemProps } from './SelectionDrawerItem';
import { DrawerType } from './SelectionDrawerProvider';
import { RadioDisplay } from '../../controls/radio-buttons/RadioButton';
import { CheckboxInput } from '../../controls/checkbox/Checkbox';

interface ToStringable {
  toString(): string;
}

const css = (
  strings: TemplateStringsArray,
  ...values: (ToStringable | undefined)[]
) => strings.map((s, i) => `${s}${values[i]?.toString() || ''}`).join('');

type TestDrawerProps<T extends DrawerType = 'checkbox'> = Partial<
  SelectionDrawerProps<T>
>;

type TestItemProps<T extends DrawerType = 'checkbox'> = Partial<
  SelectionDrawerItemProps<T>
>;
type TestItemValue<T extends DrawerType = 'checkbox'> =
  TestItemProps<T>['value'];

type TestSelectionProps<T extends DrawerType = 'checkbox'> = Override<
  TestDrawerProps<T>,
  {
    items?: TestItemProps<T>[];
  }
>;

function TestSelectionDrawer<T extends DrawerType>({
  items = [
    { value: 'item1' satisfies TestItemValue<T> } as TestItemProps<T>,
    { value: 'item2' satisfies TestItemValue<T> } as TestItemProps<T>,
    { value: 'item3' satisfies TestItemValue<T> } as TestItemProps<T>
  ],
  ...props
}: TestSelectionProps<T>) {
  while (items.length < 3) {
    items.push({ value: (items.length + 1).toString() } as TestItemProps<T>);
  }
  return (
    <ThemeComponent>
      <SelectionDrawer {...props}>
        {items.map((item, index) => (
          <SelectionDrawer.Item
            key={index}
            {...item}
            header={item.header || `item${index + 1}`}
          >
            {item.children || `body${index + 1}`}
          </SelectionDrawer.Item>
        ))}
      </SelectionDrawer>
    </ThemeComponent>
  );
}

describe('SelectionDrawer', () => {
  test.each<TestSelectionProps<DrawerType> & { expectedRole: string }>([
    {
      type: 'checkbox',
      expectedRole: 'checkbox'
    },
    {
      type: 'radio',
      name: 'test',
      expectedRole: 'radio'
    }
  ])(
    'has "$expectedRole" role when $type',
    async ({ expectedRole, ...props }) => {
      render(<TestSelectionDrawer {...props} />);
      const targets = await screen.findAllByRole(expectedRole);
      expect(targets).toHaveLength(Math.max(3, props.items?.length || 0));
    }
  );

  interface StyleRuleBlock {
    [key: string]: ReturnType<typeof styledCss> | string;
  }

  interface StyleRuleBlockWithModifier extends StyleRuleBlock {
    modifier: ReturnType<typeof styledCss>;
  }

  type StyleBlock = string | StyleRuleBlockWithModifier;

  const isRuleBlock = (
    styles: StyleBlock
  ): styles is StyleRuleBlockWithModifier =>
    Boolean((styles as StyleRuleBlock).modifier);

  const checkStyleRules = (element: Element | null, styleBlock: StyleBlock) => {
    if (isRuleBlock(styleBlock)) {
      const { modifier, ...expectedStyles } = styleBlock;
      Object.entries(expectedStyles as Record<string, string>).forEach(
        ([prop, value]) =>
          expect(element).toHaveStyleRule(prop, value, { modifier })
      );
    } else {
      expect(element).toHaveStyle(styleBlock);
    }
  };

  // eslint-disable-next-line jest/expect-expect
  test.each<
    TestSelectionProps<DrawerType> & { expectedLabelStyles: StyleBlock }
  >([
    {
      inputAlignment: 'left',
      labelAlignment: 'left',
      expectedLabelStyles: css`
        flex-flow: row nowrap;
        justify-content: flex-start;
      `
    },
    {
      inputAlignment: 'left',
      labelAlignment: 'right',
      expectedLabelStyles: css`
        flex-flow: row nowrap;
        justify-content: space-between;
      `
    },
    {
      inputAlignment: 'right',
      labelAlignment: 'right',
      expectedLabelStyles: css`
        flex-flow: row-reverse nowrap;
        justify-content: flex-start;
      `
    },
    {
      inputAlignment: 'right',
      labelAlignment: 'left',
      expectedLabelStyles: css`
        flex-flow: row-reverse nowrap;
        justify-content: space-between;
      `
    }
  ])(
    `properly renders header layout with "$inputAlignment" input and "$labelAlignment" label`,
    async ({ expectedLabelStyles, ...props }) => {
      render(<TestSelectionDrawer {...props} />);
      const targets = await screen.findAllByLabelText(/item\d/);
      targets.forEach(el => {
        const itemLabel = el.closest('label')!;
        checkStyleRules(itemLabel, expectedLabelStyles);
      });
    }
  );

  type SelectionDrawerTestProps = TestSelectionProps<DrawerType> & {
    expectedContainerStyles: string;
    expectedInputStyles: StyleBlock;
    expectedSelectedStyles: {
      display: StyleBlock;
      pseudo?: Record<string, string>;
    };
  };

  test.each<SelectionDrawerTestProps>([
    {
      type: 'checkbox',
      validationState: 'danger',
      selectedItems: ['item1'],
      expectedContainerStyles: css`
        border-color: ${viaTheme.validationTextColor.danger};
      `,
      expectedInputStyles: css`
        border-color: ${viaTheme.validationTextColor.danger};
      `,
      expectedSelectedStyles: {
        display: css`
          background-color: ${viaTheme.validationTextColor.danger};
        `,
        pseudo: {
          'border-color': viaTheme.colors.white
        }
      }
    },
    {
      type: 'radio',
      name: 'test',
      validationState: 'danger',
      selectedItems: ['item1'],
      expectedContainerStyles: css`
        border-color: ${viaTheme.validationInputColor.danger.borderColor};
      `,
      expectedInputStyles: {
        modifier: styledCss`& ~ ${RadioDisplay}`,
        'border-color': viaTheme.validationTextColor.danger
      },
      expectedSelectedStyles: {
        display: {
          modifier: styledCss`&:checked~${RadioDisplay}::before`,
          'background-color': viaTheme.validationTextColor.danger
        }
      }
    }
  ])(
    'properly renders styles for "$type" input with "$validationState" validation state',
    async ({
      expectedContainerStyles,
      expectedInputStyles,
      expectedSelectedStyles,
      items,
      type = 'checkbox',
      validationState = 'default',
      ...props
    }) => {
      render(
        <TestSelectionDrawer {...{ ...props, items, type, validationState }} />
      );
      const elementType = type || 'checkbox';

      const allInputs = await screen.findAllByLabelText(/item\d/);
      expect(allInputs).toHaveLength(Math.max(3, items?.length || 0));

      allInputs.forEach(el => {
        const container = el.closest('label')?.closest('div')
          ?.parentElement?.parentElement;
        const inputDisplay =
          elementType === 'checkbox' ? el.nextElementSibling : el;

        expect(container).toHaveStyle(expectedContainerStyles);
        checkStyleRules(inputDisplay, expectedInputStyles);
      });

      const selectedInputs = await screen.findAllByLabelText(/item\d/, {
        selector: 'input:checked'
      });
      const validationClass = `via-theme-${
        validationState || 'default'
      }-checked`;

      selectedInputs.forEach(el => {
        const inputDisplay =
          elementType === 'checkbox' ? el.nextElementSibling : el;

        const { display: displayStyles, pseudo: pseudoStyles } =
          expectedSelectedStyles;

        if (displayStyles) {
          checkStyleRules(inputDisplay, displayStyles);
        }

        if (pseudoStyles) {
          const pseudoTarget = elementType === 'checkbox' ? inputDisplay : el;
          const pseudoModifier =
            elementType === 'checkbox'
              ? styledCss`${CheckboxInput}:checked~&.${validationClass}::after`
              : styledCss`:checked~${RadioDisplay}::before`;

          checkStyleRules(pseudoTarget, {
            ...pseudoStyles,
            modifier: pseudoModifier
          });
        }
      });
    }
  );

  it('properly handles selection change for "radio" inputs', async () => {
    let selectedItems: string[] = [];
    render(
      <TestSelectionDrawer
        type="radio"
        name="test"
        onSelectionChange={newSelected => (selectedItems = newSelected)}
      />
    );
    let itemNumber = 1;

    while (itemNumber <= 3) {
      const targetValue = `item${itemNumber}`;
      const target = await screen.findByLabelText(targetValue);

      await userEvent.click(target.closest('label')!);
      expect(target).toBeChecked();
      expect(selectedItems).toEqual([targetValue]);
      itemNumber += 1;
    }
  });

  it('properly handles selection change for "checkbox" inputs', async () => {
    let selectedItems: string[] = [];
    render(
      <TestSelectionDrawer
        type="checkbox"
        name="test"
        onSelectionChange={newSelected => (selectedItems = newSelected)}
      />
    );
    let itemNumber = 1;

    let expectedItems: string[] = [];
    while (itemNumber <= 3) {
      const targetValue = `item${itemNumber}`;
      expectedItems = [...expectedItems, targetValue];
      const target = await screen.findByLabelText(targetValue);

      await userEvent.click(target.closest('label')!);

      expectedItems.forEach(item => {
        expect(screen.getByLabelText(item)).toBeChecked();
      });
      expect(selectedItems).toEqual(expectedItems);

      itemNumber += 1;
    }
  });

  it('properly disables all inputs', async () => {
    render(<TestSelectionDrawer disableAll name="test" />);

    const allInputs = await screen.findAllByLabelText(/item\d/);
    expect(allInputs).toHaveLength(3);
    allInputs.forEach(el => expect(el).toBeDisabled());
  });

  it('properly sets all inputs to openable', async () => {
    render(<TestSelectionDrawer openable name="test" />);

    const allInputs = await screen.findAllByLabelText(/item\d/);
    expect(allInputs).toHaveLength(3);
    await Promise.all(
      allInputs.map(async el => {
        const opener = el.closest('label')?.nextElementSibling;
        expect(opener).toBeVisible();
        expect(opener).toHaveAttribute('aria-label', 'Expand');

        await userEvent.click(opener!);
        expect(opener).toHaveAttribute('aria-label', 'Collapse');
      })
    );
  });
});

describe('SelectionDrawer.Item', () => {
  it('overrides parent props', async () => {
    render(
      <TestSelectionDrawer
        openable
        validationState="danger"
        name="test"
        items={[
          {
            header: 'black sheep',
            openable: false,
            validationState: 'success'
          }
        ]}
      />
    );

    const regularInputs = await screen.findAllByLabelText(/item\d/);
    expect(regularInputs).toHaveLength(2);

    await Promise.all(
      regularInputs.map(async el => {
        const opener = el.closest('label')?.nextElementSibling;
        expect(opener).toBeVisible();
        expect(opener).toHaveAttribute('aria-label', 'Expand');

        await userEvent.click(opener!);
        expect(opener).toHaveAttribute('aria-label', 'Collapse');

        const container = el.closest('label')?.closest('div')
          ?.parentElement?.parentElement;
        const inputDisplay = el.nextElementSibling;

        expect(container).toHaveStyle(css`
          border-color: ${viaTheme.validationTextColor.danger};
        `);
        expect(inputDisplay).toHaveStyle(css`
          border-color: ${viaTheme.validationTextColor.danger};
        `);
      })
    );

    const blackSheepInput = await screen.findByLabelText('black sheep');
    const blackSheepOpener =
      blackSheepInput.closest('label')?.nextElementSibling;
    expect(blackSheepOpener?.tagName).not.toBe('BUTTON');

    const blackSheepContainer = blackSheepInput.closest('label')?.closest('div')
      ?.parentElement?.parentElement;
    const blackSheepDisplay = blackSheepInput.nextElementSibling;

    expect(blackSheepContainer).toHaveStyle(css`
      border-color: ${viaTheme.validationTextColor.success};
    `);
    expect(blackSheepDisplay).toHaveStyle(css`
      border-color: ${viaTheme.validationTextColor.success};
    `);
  });

  it('overrides parent disabled prop', async () => {
    render(
      <TestSelectionDrawer
        disableAll
        name="test"
        items={[
          {
            header: 'black sheep',
            disabled: false
          }
        ]}
      />
    );

    const regularInputs = await screen.findAllByLabelText(/item\d/);
    const blackSheepInput = await screen.findByLabelText('black sheep');
    expect(regularInputs).toHaveLength(2);
    expect(blackSheepInput).toBeEnabled();

    regularInputs.forEach(el => expect(el).toBeDisabled());
  });
});
