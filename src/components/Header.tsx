import React from 'react';

type Props = {
  text: string;
};

const Header = (props: Props): JSX.Element => {
  return (
    <header className="App-header">
      <h2>{props.text}</h2>
    </header>
  );
};

export default Header;
