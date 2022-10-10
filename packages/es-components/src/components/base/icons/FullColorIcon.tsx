import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export interface FullColorIconProps {
  /** Name of the icon to display */
  name: string;
  /** Specify icon size in pixels */
  size?: string | number;
}

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

export default function FullColorIcon({
  name,
  size,
  ...props
}: FullColorIconProps) {
  return (
    <Container size={size} {...props}>
      <Icon
        src={`${ASSETS_PATH}images/full-color-icons/${name}.svg`}
        alt={`${name} icon`}
      />
    </Container>
  );
}

FullColorIcon.propTypes = {
  /** Name of the icon to display */
  name: PropTypes.string.isRequired,
  /** Specify icon size in pixels */
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

FullColorIcon.defaultProps = {
  size: undefined
};
