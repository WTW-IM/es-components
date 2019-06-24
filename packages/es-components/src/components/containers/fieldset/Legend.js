import styled from 'styled-components';

export default styled.legend`
  border: 0;
  border-bottom: 1px solid ${props => props.theme.colors.gray6};
  color: ${props => props.theme.colors.black};
  display: block;
  font-size: 21.6px;
  line-height: ${props => props.theme.sizes.baseLineHeight};
  margin: 0 0 18px 0;
  padding: 0;
  width: 100%;
`;
