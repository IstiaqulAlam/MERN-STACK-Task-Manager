import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import MainPage from './MainPage';

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

    expect(screen.getByText('Create Task')).toBeInTheDocument();
    expect(screen.getByText('View Recipes')).toBeInTheDocument();
    expect(screen.getByText('Your Ingredients')).toBeInTheDocument();
  });
});