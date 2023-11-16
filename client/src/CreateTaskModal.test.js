import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import { CreateTaskModal } from './CreateTaskModal';

describe('CreateTaskModal', () => {
	it('handles ingredient selection and submission', async () => {
	  render(<CreateTaskModal username="testUser" />);

	  fireEvent.click(screen.getByText('Pick an Ingredient'));
	  fireEvent.click(screen.getByText('Ingredient 1'));

	  fireEvent.change(screen.getByPlaceholderText('Task name'), {
		target: { value: 'Test Task' },
	  });

	  fireEvent.click(screen.getByText('Submit'));
	});
  });