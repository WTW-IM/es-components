import React from 'react';
import PropTypes from 'prop-types';

interface MessageProps extends JSXElementProps<'span'> {
  emphasizedText?: string;
  text: string;
  isInline?: boolean;
}

const propTypes = {
  emphasizedText: PropTypes.string,
  text: PropTypes.string.isRequired
};

const defaultProps = {
  emphasizedText: undefined
};

export const InlineMessage = React.forwardRef<HTMLSpanElement, MessageProps>(
  function ForwardedInlineMessage(props, ref) {
    return <Message {...props} isInline ref={ref} />;
  }
);

InlineMessage.propTypes = propTypes;
InlineMessage.defaultProps = defaultProps;

export const Message = React.forwardRef<HTMLSpanElement, MessageProps>(
  function Message({ emphasizedText, text, isInline, ...rest }, ref) {
    const inlineBreak = isInline ? <></> : <br />;

    return (
      <span {...rest} ref={ref}>
        {emphasizedText !== undefined ? (
          <>
            <strong>{emphasizedText}</strong>
            {inlineBreak}
          </>
        ) : null}
        {text}
      </span>
    );
  }
);

Message.propTypes = propTypes;
Message.defaultProps = defaultProps;
