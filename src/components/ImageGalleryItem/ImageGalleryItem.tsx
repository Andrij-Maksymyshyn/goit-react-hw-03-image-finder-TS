import { Li, Img } from './ImageGalleryItem.styled';

interface Iprops {
  webformatURL: string,
  tags: string,
  largeImageURL: string,
  onClick: (largeImageURL: string, tags: string) => void,
};

const ImageGalleryItem = ({ webformatURL, tags, largeImageURL, onClick }: Iprops) => (
  <Li
    onClick={() => {
      onClick(largeImageURL, tags);
    }}
  >
    <Img src={webformatURL} alt={tags} />
  </Li>
);

export default ImageGalleryItem;

