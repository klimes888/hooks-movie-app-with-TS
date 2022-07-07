import React from 'react';
import { IndexStore } from './store/reducer/IndexStore';
import App from './components/App';

export default function Root() {
  return (
    <IndexStore>
      <App />
    </IndexStore>
  );
}
