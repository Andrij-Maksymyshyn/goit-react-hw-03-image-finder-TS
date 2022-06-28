import { Button } from './IconButton.styled';

interface Iprops {
  onClick?: () => void,
  children?: React.ReactNode,
  'aria-label': string,
};

const IconButton = ({ children = null, onClick = () => null, ...allyProps } : Iprops) => (
  <Button type="submit" onclick={onClick} {...allyProps}>
    {children}
  </Button>
);

export default IconButton;
