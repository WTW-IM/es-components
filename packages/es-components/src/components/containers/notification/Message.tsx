import React from 'react';
import PropTypes from 'prop-types';

interface MessageProps extends JSXElementProps<'span'> {
  emphasizedText?: string;
  text: string;
}

const propTypes = {
  emphasizedText: PropTypes.string,
  text: PropTypes.string.isRequired
};

const defaultProps = {
  emphasizedText: undefined
};

export function InlineMessage({ emphasizedText, text, ...rest }: MessageProps) {
  return (
    <span {...rest}>
      {emphasizedText !== undefined ? <strong>{emphasizedText}</strong> : null}{' '}
      {text}
    </span>
  );
}

InlineMessage.propTypes = propTypes;
InlineMessage.defaultProps = defaultProps;

export function Message({ emphasizedText, text, ...rest }: MessageProps) {
  return (
    <span {...rest}>
      {emphasizedText !== undefined ? (
        <>
          <strong>{emphasizedText}</strong>
          <br />
        </>
      ) : null}
      {text}
    </span>
  );
}

Message.propTypes = propTypes;
Message.defaultProps = defaultProps;
