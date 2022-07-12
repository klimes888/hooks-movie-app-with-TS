import React, { useState, ChangeEvent, MouseEvent } from 'react';

type SearchType = { search(params: string): void };

const Search = ({ search }: SearchType): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleSearchInputChanges = (e: ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value },
    } = e;
    setSearchValue(value);
  };

  const resetInputField = (): void => {
    setSearchValue('');
  };

  const callSearchFunction = (e: MouseEvent<HTMLInputElement>): void => {
    e.preventDefault();
    search(searchValue);
    resetInputField();
  };

  return (
    <form className="search">
      <input value={searchValue} onChange={handleSearchInputChanges} type="text" data-testid="change_value" />
      <input onClick={callSearchFunction} type="submit" value="SEARCH" data-testid="send_button" />
    </form>
  );
};

export default Search;
