import { SpinnerRoundOutlined } from 'spinners-react';
import { SpinnerWrapper } from './Loader.styled';



const Loader = () => (
  <SpinnerWrapper>
    <SpinnerRoundOutlined
      size={50}
      thickness={100}
      speed={100}
      color="#36ad47"
    />
  </SpinnerWrapper>
);

export default Loader;
