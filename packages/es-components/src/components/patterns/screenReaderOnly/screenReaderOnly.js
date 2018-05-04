import styled from 'styled-components';

// styles are based off of WebAIM's recommended styles
// https://webaim.org/techniques/css/invisiblecontent/#absolutepositioning
export default function screenReaderOnly(Component) {
  const ScreenReaderOnly = styled(Component)`
    position: absolute !important;
    left: -10000px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  `;

  return ScreenReaderOnly;
}
