import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationVoted, notificationReseted } from '../reducers/notificationReducer'



const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote.id))
        dispatch(notificationVoted(anecdote.content))
        setTimeout(() => { dispatch(notificationReseted())}, 5000)
    }

    return (
        <div>
        {anecdotes
        .filter(el => 
            el.content.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
            </div>
            </div>
        )}
        </div>
    )
}

export default AnecdoteList