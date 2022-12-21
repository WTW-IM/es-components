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
  alignItems: center;
  display: flex;
  height: ${({size}) => size};
  justifyContent: center;
  width: ${({size}) => size};
`;

const Icon = styled.img`
  height: auto;
  maxWidth: 100%;
`;

export default function FullColorIcon({ name, size, ...props }: FullColorIconProps) {
  return (
    <Container size={size} {...props}>
      <Icon
        src={`https://bdaim-webexcdn-p.azureedge.net/es-assets/images/full-color-icons/${name}.svg`}
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
