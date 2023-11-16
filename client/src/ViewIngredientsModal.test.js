import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import MainPage from './MainPage';
import { act } from 'react-dom/test-utils';

jest.mock('./MainPageScript', () => ({
  TaskList: jest.fn(() => Promise.resolve([])),
}));

jest.mock('./ViewIngredientsModal', () => ({
  YourIngredients: jest.fn(() => Promise.resolve([])),
}));

jest.mock('./AutoLogin', () => ({
  loginWithStoredCredentials: jest.fn(),
}));

describe('MainPage', () => {
  it('renders MainPage component with buttons', () => {
    render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );

    expect(screen.getByText('Your Ingredients')).toBeInTheDocument();

	act(async () => {
		fireEvent.click(screen.getByText('Your Ingredients'));
	  });
  });
});