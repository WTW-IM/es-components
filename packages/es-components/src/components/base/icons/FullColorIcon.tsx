import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export type FullColorIconProps = Override<
  JSXElementProps<'div'>,
  {
    /** Name of the icon to display */
    name: string;
    /** Specify icon size in pixels */
    size?: string | number;
  }
>;

const Container = styled.div<{ size?: string | number }>`
  align-items: center;
  display: flex;
  height: ${({ size }) => size};
  justify-content: center;
  width: ${({ size }) => size};
`;

const Icon = styled.img`
  height: auto;
  max-width: 100%;
`;

const FullColorIcon = React.forwardRef<HTMLDivElement, FullColorIconProps>(
  function FullColorIcon({ name, size, ...props }, ref) {
    return (
      // reused this logic for size from the Icon component. Fine with the repeat for now, but should
      // consider moving to a util function later if we use again
      <Container
        ref={ref}
        size={
          /^\d+$/.test(size?.toString() || '') ? `${size}px` : size || 'inherit'
        }
        {...props}
      >
        <Icon
          src={`${ASSETS_PATH}images/full-color-icons/${name}.svg`}
          alt={`${name} icon`}
        />
      </Container>
    );
  }
);

FullColorIcon.propTypes = {
  /** Name of the icon to display */
  name: PropTypes.string.isRequired,
  /** Specify icon size in pixels */
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

FullColorIcon.defaultProps = {
  size: undefined
};

export default FullColorIcon;
