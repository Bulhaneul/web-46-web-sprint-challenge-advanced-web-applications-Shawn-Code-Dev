import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Color from './Color';

test("Renders without errors with blank color passed into component", () => {
  const blankColor = { color: '', code: { hex: '' } };

  render(<Color color={blankColor} />)
});
  
test("Renders the color passed into component", () => {
  const testColor = { color: 'white', code: { hex: '#000000' }}

  render(<Color color={testColor} />)

  expect(screen.queryByText('white')).toBeVisible();
});

test("Executes handleDelete and toggleEdit property when the 'x' icon is clicked", () => {
  const testColor = { color: 'white', code: { hex: '#000000' }}
  const mockToggleEdit = jest.fn()
  const mockDelete = jest.fn()

  render(<Color color={testColor} toggleEdit={mockToggleEdit} deleteColor={mockDelete}/>)

  userEvent.click(screen.getByTestId('delete'))

  expect(mockToggleEdit).toBeCalled();
  expect(mockDelete).toBeCalled();
});

test("Executes setEditColor and toggleEdit property when color div is clicked", () => {
  const testColor = { color: 'white', code: { hex: '#000000' }}
  const mockToggleEdit = jest.fn()
  const mockSet = jest.fn()

  render(<Color color={testColor} toggleEdit={mockToggleEdit} setEditColor={mockSet}/>)

  userEvent.click(screen.getByTestId('color'))

  expect(mockToggleEdit).toBeCalled();
  expect(mockSet).toBeCalled();
});