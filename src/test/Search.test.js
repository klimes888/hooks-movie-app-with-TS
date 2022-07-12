import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../components/Search';

it('Search Component Render & Event Test', () => {
  render(<Search search={() => {}} />);
  // Search onChange Value Test
  const getChaneValue = screen.getByTestId(/change_value/i);
  fireEvent.change(getChaneValue, { target: { value: 'Iron' } });
  expect(getChaneValue.value).toBe('Iron');

  // Search onClick Empty Value Test
  const getButtonValue = screen.getByTestId(/send_button/i);
  fireEvent.click(getButtonValue);
  expect(getChaneValue.value).toBe('');
});
