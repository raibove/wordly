import { useEffect, useState } from "react"
import { useDevvitListener } from "../hooks/useDevvitListener"
import { sendToDevvit } from "../utils"
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Crown, PlusIcon } from 'lucide-react';
import { LeaderboardEntry } from '../components/LeaderBoardEntry';
import { Loader } from "../components/Loader";

const Leaderboard = () => {
    const leaderboardData = useDevvitListener('LEADERBOARD_SCORE');
    const players = leaderboardData?.leaderboard || [];
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const itemsPerPage = 5;
    const pageCount = Math.ceil(players.length / itemsPerPage);
    const paginatedPlayers = players.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    useEffect(() => {
        sendToDevvit({ type: 'GET_LEADERBOARD' })
    }, [])

    if (players.length === 0) {
        return (
            <div className="w-full max-w-md mx-auto p-4 flex justify-center py-12">
                <Loader size="lg" color="secondary" label="Loading leaderboard..." />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md h-full relative py-4 m-auto"
        >
            <button
                onClick={() => { sendToDevvit({ type: 'CREATE_NEW_GAME' }); setLoading(true) }}
                className="absolute text-white text-xs top-4 right-1 p-1 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors disabled:opacity-50"
                disabled={loading}
            >
                New Game
            </button>
            <div className="max-w-md flex flex-col h-full m-auto">
                <div className="flex items-center justify-center gap-2 mb-6">
                    <Crown className="w-6 h-6 text-yellow-400" />
                    <h2 className="text-2xl font-bold text-purple-100">Leaderboard</h2>
                </div>

                <div className="space-y-2 grow">
                    {paginatedPlayers.map((player, index) => (
                        <LeaderboardEntry
                            key={index}
                            player={{
                                username: player.member,
                                score: player.score
                            }}
                            index={currentPage * itemsPerPage + index}
                        />
                    ))}
                </div>

                <div className="flex justify-center gap-2 mt-4">
                    {currentPage !== 0 && (
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                            disabled={currentPage === 0}
                            className="px-3 py-1 bg-gray-600 text-white rounded disabled:opacity-50"
                        >
                            <ChevronLeft />
                        </button>
                    )}
                    <span className="px-3 py-1 text-white">
                        Page {currentPage + 1} of {pageCount}
                    </span>
                    {currentPage !== pageCount - 1 && (
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(pageCount - 1, prev + 1))}
                            disabled={currentPage === pageCount - 1}
                            className="px-3 py-1 bg-gray-600 text-white rounded disabled:opacity-50"
                        >
                            <ChevronRight />
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    )
}

export default Leaderboard;