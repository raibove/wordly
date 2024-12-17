import { Page } from './shared';
import { HomePage } from './pages/HomePage';
import { usePage, useSetPage } from './hooks/usePage';
import { useEffect, useState } from 'react';
import { sendToDevvit } from './utils';
import { useDevvitListener } from './hooks/useDevvitListener';
import Leaderboard from './pages/LeaderboardPage';
import { Loader } from './components/Loader';
import AlreadyPlayed from './pages/AlreadyPlayed';

const getPage = (page: Page, { initialWords }: { initialWords: string[]}) => {
  switch (page) {
    case 'home':
      return <HomePage initialWords={initialWords} />;
    case 'leadboard':
      return <Leaderboard/>
    case 'alreadyPlayed':
      return <AlreadyPlayed />
    case 'loading':
      return (
        <div id='loader-init' className="w-full h-full max-w-md mx-auto p-4 flex justify-center items-center py-12">
          <Loader size="lg" color="secondary" label="Loading..." />
        </div>
      );
    default:
      throw new Error(`Unknown page: ${page satisfies never}`);
  }
};

export const App = () => {
  const [initialWords, setInitialWords] = useState<string[]>([]);
  const page = usePage();
  const setPage = useSetPage();
  const initData = useDevvitListener('INIT_RESPONSE');
  useEffect(() => {
    sendToDevvit({ type: 'INIT' });
  }, []);

  useEffect(() => {
    if (initData) {
      if(initData.hasUserPlayedChallenge){
        setPage('alreadyPlayed');
      } else {
        setPage('home');
      }
      const words = initData.challengeInfo.words.split(',') as string[];
      setInitialWords(words);
    }
  }, [initData, setInitialWords]);

  return <div className="h-full">{getPage(page, { initialWords })}</div>;
};
