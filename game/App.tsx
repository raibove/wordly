import { Page } from './shared';
import { PokemonPage } from './pages/PokemonPage';
import { HomePage } from './pages/HomePage';
import { usePage } from './hooks/usePage';
import { useEffect, useState } from 'react';
import { sendToDevvit } from './utils';
import { useDevvitListener } from './hooks/useDevvitListener';

const getPage = (page: Page, { initialWords }: { initialWords: string[]}) => {
  switch (page) {
    case 'home':
      return <HomePage initialWords={initialWords} />;
    // case 'pokemon':
    //   return <PokemonPage />;
    default:
      throw new Error(`Unknown page: ${page satisfies never}`);
  }
};

export const App = () => {
  const [initialWords, setInitialWords] = useState<string[]>([]);
  const page = usePage();
  const initData = useDevvitListener('INIT_RESPONSE');
  console.log('<< init data', initData)
  useEffect(() => {
    sendToDevvit({ type: 'INIT' });
  }, []);

  useEffect(() => {
    if (initData) {
      console.log('<< init data', initData)
      const words = initData.challengeInfo.words.split(',') as string[];
      setInitialWords(words);
    }
  }, [initData, setInitialWords]);

  return <div className="h-full">{getPage(page, { initialWords })}</div>;
};
