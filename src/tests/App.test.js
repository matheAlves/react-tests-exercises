import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe(
  'testa componente App', () => {
    it('testa se aplicação contém um conjunto fixo de links de navegação', () => {
      renderWithRouter(<App />);
      const navBar = screen.getByRole('navigation');
      const nOfLinks = 3;
      const homeLink = screen.getByRole('link', { name: /home/i });
      const aboutLink = screen.getByRole('link', { name: /about/i });
      const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });

      expect(navBar.children.length).toBe(nOfLinks);
      expect(homeLink).toBeDefined();
      expect(aboutLink).toBeDefined();
      expect(favoriteLink).toBeDefined();
    });

    it('testa se é redirecionado para a URL certa ao clicar no link Home', () => {
      const { history } = renderWithRouter(<App />);
      const homeLink = screen.getByRole('link', { name: /home/i });

      userEvent.click(homeLink);

      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });

    it('testa se é redirecionado para a URL certa ao clicar no link About', () => {
      const { history } = renderWithRouter(<App />);
      const homeLink = screen.getByRole('link', { name: /about/i });

      userEvent.click(homeLink);

      const { pathname } = history.location;
      expect(pathname).toBe('/about');
    });

    it('testa se é redirecionado para a URL certa ao clicar no link Favorite', () => {
      const { history } = renderWithRouter(<App />);
      const homeLink = screen.getByRole('link', { name: /favorite pokémons/i });

      userEvent.click(homeLink);

      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });

    it('testa se é redirecionado para not found ao entrar em URL desconhecida', () => {
      const { history } = renderWithRouter(<App />);
      history.push('/url/fake');
      const notFoundMessage = screen.getByRole('heading',
        { level: 2, name: /Page requested not found/i });

      expect(notFoundMessage).toBeDefined();
    });
  },
);
