import React from 'react';
import PropTypes from 'prop-types';
import { parse, format, isValid } from 'date-fns';
import { noop } from 'lodash';

import { useTheme } from '../../util/useTheme';
import { useWindowWidth } from '../../util/useWindowWidth';
import Textbox from '../../controls/textbox/Textbox';
import MaskedTextbox from '../../controls/textbox/MaskedTextbox';

function slashToDash(dateString) {
  return dateString && dateString.includes('/')
    ? dateString.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$1-$2')
    : dateString;
}

function dashToSlash(dateString) {
  return dateString && dateString.includes('-')
    ? dateString.replace(/(\d{4})-(\d{2})-(\d{2})/, '$2/$3/$1')
    : dateString;
}

function getParsedDate(dateString) {
  const newDate = parse(`${dateString}T01:00:00`);
  return isValid(newDate) ? format(newDate, 'YYYY-MM-DD') : dateString;
}

function MobileDob({ onChange, value, ...props }) {
  const onChangeIntercept = event => {
    onChange(event.target.value);
  };

  return (
    <Textbox
      prependIconName="calendar"
      type="date"
      {...props}
      value={slashToDash(value)}
      onChange={onChangeIntercept}
    />
  );
}

function DesktopDob({ onChange, value, ...props }) {
  const onChangeIntercept = event => {
    onChange(getParsedDate(event.target.value));
  };

  return (
    <MaskedTextbox
      prependIconName="calendar"
      placeholder="mm/dd/yyyy"
      maskType="date"
      {...props}
      value={dashToSlash(value)}
      onChange={onChangeIntercept}
    />
  );
}

const DateOfBirth = React.memo(function DateOfBirth({
  allowNativeDatepickerOnMobile,
  ...props
}) {
  const theme = useTheme();
  const windowWidth = useWindowWidth();
  const phoneWidth = parseInt(theme.screenSize.phone, 10) || 0;

  const mobileDob = <MobileDob {...props} />;
  const desktopDob = <DesktopDob {...props} />;

  const datePicker =
    allowNativeDatepickerOnMobile && windowWidth <= phoneWidth
      ? mobileDob
      : desktopDob;
  return datePicker;
});

DateOfBirth.propTypes = {
  /** Callback that returns the entered value or valid date string */
  onChange: PropTypes.func,
  /** When True, the masked input is replaced with a native input type="date" for mobile devices */
  allowNativeDatepickerOnMobile: PropTypes.bool
};

DateOfBirth.defaultProps = {
  onChange: noop,
  allowNativeDatepickerOnMobile: true
};

export default DateOfBirth;
