import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import _noop from 'lodash/noop';
import SlidingPaneStyles from './SlidingPaneStyles';
import Heading from '../heading/Heading';
import LinkButton from '../../controls/buttons/LinkButton';
import Icon from '../../base/icons/Icon';

export default function SlidingPane({
  isOpen,
  title,
  subtitle,
  shouldCloseOnEsc,
  onRequestClose,
  onAfterOpen,
  children,
  className,
  overlayClassName,
  closeIcon,
  from,
  headingLevel,
  headingSize,
  closeTimeout
}) {
  const directionClass = `slide-pane_from_${from}`;

  return (
    <>
      <SlidingPaneStyles />
      <Modal
        className={`slide-pane dst ${directionClass} ${className}`}
        overlayClassName={`slide-pane__overlay dst-overlay 
          ${overlayClassName}`}
        closeTimeoutMS={closeTimeout}
        isOpen={isOpen}
        onAfterOpen={onAfterOpen}
        onRequestClose={onRequestClose}
        shouldCloseOnEsc={shouldCloseOnEsc}
        contentLabel={`Modal "${title}"`}
      >
        <div className="slide-pane__header">
          <LinkButton className="slide-pane__close" onClick={onRequestClose}>
            {closeIcon || <Icon name="remove" size={34} />}
          </LinkButton>
          <div className="slide-pane__title-wrapper">
            <Heading
              level={headingLevel}
              size={headingSize}
              className="slide-pane__title"
            >
              {title}
            </Heading>
            <div className="slide-pane__subtitle">{subtitle}</div>
          </div>
        </div>
        <div className="slide-pane__content">{children}</div>
      </Modal>
    </>
  );
}

SlidingPane.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.any,
  subtitle: PropTypes.any,
  shouldCloseOnEsc: PropTypes.bool,
  onRequestClose: PropTypes.func,
  onAfterOpen: PropTypes.func,
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  overlayClassName: PropTypes.string,
  from: PropTypes.oneOf(['left', 'right', 'bottom']),
  closeIcon: PropTypes.any,
  headingLevel: Heading.propTypes.level,
  headingSize: Heading.propTypes.size,
  closeTimeout: PropTypes.number
};

SlidingPane.defaultProps = {
  /* Timeout is in milliseconds */
  closeTimeout: 500,
  from: 'right',
  headingLevel: 2,
  headingSize: 2,
  shouldCloseOnEsc: true,
  title: '',
  subtitle: '',
  onRequestClose: _noop,
  onAfterOpen: _noop,
  className: '',
  overlayClassName: '',
  closeIcon: null
};
