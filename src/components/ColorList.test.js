import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen} from "@testing-library/react";
import ColorList from './ColorList';
import userEvent from '@testing-library/user-event';

const mockData = [
  { color: 'white', code: { hex: '#000000' }}, 
  { color: 'SomeColor', code: { hex: '#123456' }}
]

test("Renders an empty list of colors without errors", () => {
  render(<ColorList colors={[]}/>)
});

test("Renders a list of colors without errors", () => {
  render(<ColorList colors={mockData}/>)
});

test("Renders the EditForm when editing = true and does not render EditForm when editing = false", () => {
  const { rerender } = render(<ColorList colors={mockData} editing={true} />);
  
  expect(screen.queryByTestId('edit_menu')).toBeVisible();

  rerender(<ColorList colors={mockData} editing={false} />);
  
  expect(screen.queryByTestId('edit_menu')).toBeNull();
});
