import { Component } from 'react';
import toast from 'react-hot-toast';
import IconButton from '../IconButton';
import { BiSearch } from 'react-icons/bi';
import { Header, SearchForm, Input } from './Searchbar.styled';


interface IState {
  inputFormValue: string,
};

interface IProps {
  onSubmit: (inputFormValue: string) => void,
};


class Searchbar extends Component <IProps, IState>{
  state = {
    inputFormValue: '',
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    this.setState({
      inputFormValue: value.toLowerCase(),
    });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { inputFormValue } = this.state;
    e.preventDefault();

    if (inputFormValue.trim() === '') {
      toast.error('Please, fill in the field of search');
      return;
    }

    this.props.onSubmit(inputFormValue);

    this.setState({
      inputFormValue: '',
    });
  };

  render() {
    const { inputFormValue } = this.state;

    return (
      <>
        <Header>
          <SearchForm onSubmit={this.handleSubmit}>
            <IconButton aria-label="search">
              <BiSearch width="40" height="40" />
            </IconButton>
            <Input
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={inputFormValue}
              onChange={this.handleChange}
            />
          </SearchForm>
        </Header>
      </>
    );
  }
}

export default Searchbar;

