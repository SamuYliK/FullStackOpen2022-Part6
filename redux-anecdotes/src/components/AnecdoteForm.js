import { useDispatch } from "react-redux";
import { addNewAnecdote } from '../reducers/anecdoteReducer'
import { notificationAdded, notificationReseted } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(addNewAnecdote(content))
        dispatch(notificationAdded(content))
        setTimeout(() => { dispatch(notificationReseted())}, 5000)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote'/></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm