import { shallow } from 'enzyme'
import ConverterBlock from '../ConverterBlock'

describe('ConverterBlock', () => { 
    it('renders correctly', () => { 
        const wrapper = shallow(<ConverterBlock />);
        expect(wrapper).toMatchSnapshot();
    })
})