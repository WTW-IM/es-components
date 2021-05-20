/* eslint-disable react/prop-types */
import styled from 'styled-components';

// styles are based off of WebAIM's recommended styles
// https://webaim.org/techniques/css/invisiblecontent/#absolutepositioning
const screenReaderOnlyBase = styled.div`
  position: absolute !important;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

const screenReaderOnly = Component =>
  screenReaderOnlyBase.withComponent(Component);

/** @component */
export default screenReaderOnly;
