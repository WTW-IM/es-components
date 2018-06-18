import Enzyme from 'enzyme';
import { init } from 'styled-enzyme';
import Adapter from 'enzyme-adapter-react-16';
import viaTheme from 'es-components-via-theme';

init(viaTheme);

Enzyme.configure({ adapter: new Adapter() });
