import styled from 'styled-components';
import theme from '../../../common/theme';

export default styled.footer`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  text-align: right;
  * {
	color: #FFF;
  }
  background-color: ${theme.colors.primaryColor}
`;
