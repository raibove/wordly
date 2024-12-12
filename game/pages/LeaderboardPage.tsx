import { useEffect, useState } from "react"
import { useDevvitListener } from "../hooks/useDevvitListener"
import { sendToDevvit } from "../utils"
import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';
import { LeaderboardEntry } from '../components/LeaderBoardEntry';
import { Loader } from "../components/Loader";

const Leaderboard = () => {
    const leaderboardData = useDevvitListener('LEADERBOARD_SCORE');
    const players = leaderboardData?.leaderboard || [];

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
            className="w-full max-w-md mx-auto p-4"
        >
            <div className="flex items-center justify-center gap-2 mb-6">
                <Crown className="w-6 h-6 text-yellow-400" />
                <h2 className="text-2xl font-bold text-purple-100">Leaderboard</h2>
            </div>

            <div className="space-y-2">
                {players.map((player, index) => (
                    <LeaderboardEntry
                        key={index}
                        player={{
                            username: player.member,
                            score: player.score
                        }}
                        index={index}
                    />
                ))}
            </div>
        </motion.div>
    )
}

export default Leaderboard;