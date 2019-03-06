import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  emphasizedText: PropTypes.string,
  text: PropTypes.string.isRequired
};

const defaultProps = {
  emphasizedText: undefined
};

export function InlineMessage({ emphasizedText, text }) {
  return (
    <p>
      {emphasizedText !== undefined ? <strong>{emphasizedText}</strong> : null}
      {' '}
      {text}
    </p>
  );
}

InlineMessage.propTypes = propTypes;
InlineMessage.defaultProps = defaultProps;

export function Message({ emphasizedText, text }) {
  return (
    <p>
      {emphasizedText !== undefined ? (
        <>
          <strong>{emphasizedText}</strong>
          <br />
        </>
      ) : null}
      {text}
    </p>
  );
}

Message.propTypes = propTypes;
Message.defaultProps = defaultProps;
