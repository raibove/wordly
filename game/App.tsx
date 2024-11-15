import { Page } from './shared';
import { PokemonPage } from './pages/PokemonPage';
import { HomePage } from './pages/HomePage';
import { usePage } from './hooks/usePage';

const getPage = (page: Page) => {
  switch (page) {
    case 'home':
      return <HomePage />;
    case 'pokemon':
      return <PokemonPage />;
    default:
      throw new Error(`Unknown page: ${page satisfies never}`);
  }
};

export const App = () => {
  const page = usePage();

  return <div className="h-full">{getPage(page)}</div>;
};
