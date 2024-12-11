import { useEffect } from "react"
import { useDevvitListener } from "../hooks/useDevvitListener"
import { sendToDevvit } from "../utils"

const Leaderboard = ()=>{
    const leaderboardData = useDevvitListener('LEADERBOARD_SCORE')

    useEffect(()=>{
        sendToDevvit({type: 'GET_LEADERBOARD'})
    },[])
    
    useEffect(()=>{
        if(leaderboardData){
            console.log(leaderboardData)
        }
    },[leaderboardData])

    return(
        <div>
            <h1>Leaderboard</h1>
        </div>
    )
}

export default Leaderboard;