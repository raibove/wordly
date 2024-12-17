import { motion } from 'framer-motion';
import { Trophy, Sparkles } from 'lucide-react';
import { useDevvitListener } from '../hooks/useDevvitListener';
import { useEffect, useState } from 'react';
import { sendToDevvit } from '../utils';
import { Loader } from '../components/Loader';
import { useSetPage } from '../hooks/usePage';

const AlreadyPlayed = () => {
  const setPage = useSetPage();
  const userRankData = useDevvitListener('USER_RANK');
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    sendToDevvit({ type: 'GET_USER_RANK' })
  }, [])

  if (!Boolean(userRankData)) {
    return (
      <div className="w-full h-full max-w-md mx-auto p-4 flex justify-center items-center py-12">
        <Loader size="lg" color="secondary" label="Loading..." />
      </div>
    );
  }


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="bg-gray-800/90 p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 border border-purple-500/20"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="flex flex-col items-center"
        >
          <Sparkles className="text-yellow-400 w-16 h-16 mb-4" />
          <h2 className="text-2xl font-bold text-purple-300 mb-2">Game Played!</h2>
          <p className="text-gray-400 text-center mb-6">
            You have already played this game. Here's your score:
          </p>

          <div className="grid grid-cols-2 gap-4 w-full mb-8">
            <div className="bg-purple-900/30 p-4 rounded-xl text-center">
              <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-sm text-purple-300">Final Score</p>
              <p className="text-2xl font-bold text-purple-100">{userRankData?.score}</p>
            </div>
            <div className="bg-purple-900/30 p-4 rounded-xl text-center">
              <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-sm text-purple-300">Your Rank</p>
              <p className="text-2xl font-bold text-purple-100">{userRankData?.rank}</p>
            </div>
          </div>
          <div className='flex gap-2 flex-row'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setPage('leadboard') }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-full font-semibold flex items-center gap-2 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            Check Leaderboard
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { sendToDevvit({type: 'CREATE_NEW_GAME'}); setLoading(true) }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-full font-semibold flex items-center gap-2 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            Create new game
          </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default AlreadyPlayed;