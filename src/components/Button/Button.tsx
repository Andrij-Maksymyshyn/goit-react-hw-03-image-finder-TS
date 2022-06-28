import { BtnLoadMore } from './Button.styled';

interface IProps {
  buttonP: () => void,
};

const Button = ({ buttonP } : IProps) => (
  <BtnLoadMore type="submit" onClick={buttonP}>
    Load more
  </BtnLoadMore>
);

export default Button;


