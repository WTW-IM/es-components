import React, { useMemo, forwardRef } from 'react';
import { css } from 'styled-components';
import { IconName } from 'es-components-shared-types';
import { useRootNodeContext, RootNode } from '../../util/useRootNode';
import Icon, { IconBaseProps, IconProps, iconBaseStyles } from './Icon';

type DocumentRoot = Document | ShadowRoot;
type GetComputedStyleFunc = typeof window.getComputedStyle;
type ComputedStyleParams = Parameters<GetComputedStyleFunc>;
type ComputedStyleReturn = ReturnType<GetComputedStyleFunc>;
type IconElement = HTMLElement;

const computeStyle = (...args: ComputedStyleParams) => {
  try {
    return window.getComputedStyle(...args);
  } catch (err) {
    if ((err as Error)?.message?.match(/Not Implemented/i)) {
      return {} as ComputedStyleReturn;
    }
    throw err;
  }
};

const getIconElementStyles = (icon: IconElement) => {
  const computedStyle = computeStyle(icon);
  const beforeStyle = computeStyle(icon, ':before');
  return css<IconBaseProps>`
    ${() => css`
      ${iconBaseStyles}

      // computed styles
      content: ${beforeStyle.content};
      font-family: ${computedStyle.fontFamily};
      font-size: ${computedStyle.fontSize};
    `}
  `;
};

const getIconStyles = (iconName: IconName, rootNode?: RootNode) => {
  const rules = [
    ...new Set([
      ...((rootNode?.getRootNode() as DocumentRoot | undefined)?.styleSheets ||
        []),
      ...document.styleSheets
    ])
  ]
    .flatMap(sheet => {
      try {
        return [...(sheet.rules || [])];
      } catch (e) {
        return [];
      }
    })
    .filter<CSSStyleRule>((rule: CSSRule): rule is CSSStyleRule =>
      Boolean((rule as CSSStyleRule).selectorText)
    );
  const baseIconRule = rules.find(rule => rule.selectorText === '.bds-icon');
  const iconRule = rules.find(rule =>
    [`.bds-${iconName}:before`, `.bds-${iconName}::before`].includes(
      rule.selectorText
    )
  );
  const iconStyles = css`
    ${baseIconRule?.cssText}
    ${iconRule?.cssText}
  `;
  return iconStyles;
};

export type HiddenIconConfig = {
  [key in IconName]?: React.Ref<HTMLElement>;
};

type HiddenIconProps = JSXElementProps<'div'> & {
  icons: HiddenIconConfig;
  iconProps?: Omit<IconProps, 'name'>;
};

export const HiddenIcons = forwardRef<HTMLDivElement, HiddenIconProps>(
  function ForwardedHiddenIcons({ icons, style, iconProps, ...props }, ref) {
    return (
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          visibility: 'hidden',
          overflow: 'visible',
          width: 0,
          height: 0,
          left: -5000,
          ...(style || {})
        }}
        {...props}
        ref={ref}
      >
        {Object.entries<React.Ref<HTMLElement> | undefined>(icons).map(
          ([iconName, iconRef]) => (
            <Icon
              key={iconName}
              ref={iconRef}
              {...iconProps}
              name={iconName as IconName}
            />
          )
        )}
      </div>
    );
  }
);

export const useIconStyles = (
  iconName?: IconName,
  icon?: IconElement | null
) => {
  const rootNode = useRootNodeContext();
  const iconStyles = useMemo(
    () =>
      icon
        ? getIconElementStyles(icon)
        : iconName
        ? getIconStyles(iconName, rootNode)
        : undefined,
    [iconName, rootNode, icon]
  );
  return iconStyles;
};

export default useIconStyles;
