import React, { type ReactNode } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { MemoryRouter, type MemoryRouterProps } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme'


interface ExtendedRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  route?: string;
  routerProps?: MemoryRouterProps;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    route = '/',
    routerProps,
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: { children?: ReactNode }) {
    return (
      <MemoryRouter initialEntries={[route]} {...routerProps}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </MemoryRouter>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}
