import ImageGalleryItem from '../ImageGalleryItem';
import { BoxUl } from './ImageGallery.styled';

interface IProps{
  propGallery: { [key: string]: string } [],
  onModalClick: (largeImg: string, tags: string) => void,        
};


const ImageGallery = ({ propGallery, onModalClick }: IProps) => (
  <BoxUl>
    {propGallery.map(({ webformatURL, tags, largeImageURL }, index) => (
      <ImageGalleryItem
        key={index}
        webformatURL={webformatURL}
        tags={tags}
        largeImageURL={largeImageURL}
        onClick={onModalClick}
      />
    ))}
  </BoxUl>
);

export default ImageGallery;

