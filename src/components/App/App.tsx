import { Component } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Button from '../Button';
import Loader from '../Loader';
import Modal from '../Modal/Modal';
import { Container } from './App.styled';

const KEY = '24382748-1dfb63c81149146d5ea200f75';
const BASE_URL = 'https://pixabay.com/api';


interface IState {
  searchValue: string,
  images: { [key: string]: string }[],
  page: number,
  endPage: number,
  perPage: number,
  isLoading: boolean,
  error: null | unknown,
  showModal: boolean,
  largeImg: string,
  tags: string, 
};

class App extends Component <{}, IState>{
  state = {
    searchValue: '',
    images: [],
    page: 1,
    endPage: 0,
    perPage: 12,
    isLoading: false,
    error: null,
    showModal: false,
    largeImg: '',
    tags: '',    
  };

  addSearchValue = (formData: string) => {
    this.setState({
      searchValue: formData,
      page: 1,
      images: [],
      isLoading: false,
      error: null,
    });
  };

 
  async componentDidUpdate(_ : any, prevState : IState) {
    const { searchValue, images, page, perPage, endPage } = this.state;
    if (prevState.searchValue !== searchValue || prevState.page !== page) {
      this.setState({ isLoading: true });

      try {
        await axios
          .get(
            `${BASE_URL}/?q=${searchValue}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}
`,
          )
          .then(data => {
            const {
              data: { hits, totalHits },
            } = data;

            if (hits.length === 0) {
              toast.error(
                'Sorry, there are no pictures. Try another request...',
              );
              return this.setState({ images: [] });
            }

            this.setState(prevState => {
              return {
                images: [...prevState.images, ...hits],
                endPage: totalHits - page * perPage,
              };
            });

            if (images.length > 0 && endPage < perPage) {
              return toast.error('Pictures are finished.Try new request');
            }
          });
        
      } catch (error) {
        this.setState({ error });
        toast.error('Whoops, something went wrong: error. Try new request');
        
      } finally {
        this.setState({ isLoading: false });
      }
    }
  };

  

  handleClick = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

   toggleModal = (largeImg = '' , tags = '') => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImg,
      tags,
    }));
  };

  

  render() {
    const { images, endPage, perPage, isLoading, showModal, largeImg, tags } =
      this.state;
    const shouldRenderLoreMoreButton =
      endPage > perPage / 2 && images.length > 0;

    

    return (
      <Container>
        <Toaster position="top-right" />
        <Searchbar onSubmit={this.addSearchValue} />
        {images.length > 0 && (
          <ImageGallery propGallery={images} onModalClick={this.toggleModal} />
        )}
        {isLoading && <Loader />}
        {shouldRenderLoreMoreButton && <Button buttonP={this.handleClick} />}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImg} alt={tags} />
          </Modal>
        )}
      </Container>
    );
  }
}

export default App;
