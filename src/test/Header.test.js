import React from "react";
import { render, screen } from "@testing-library/react";
import Header from '../components/Header';

it('Header Component Render Test', async () => {
  render(<Header text="test"/>);
  const findElement = await screen.findByRole('header')
  expect(findElement.textContent).toBe("test");
});
