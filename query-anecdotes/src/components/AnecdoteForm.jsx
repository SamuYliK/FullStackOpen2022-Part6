import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'

import { useNotificationDispatch } from '../NotificationContext'
import { createAnecdote } from '../requests'

const AnecdoteForm = () => {
  
  const dispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(
    createAnecdote, 
    { onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    }
  )

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 },
      { onSuccess: ({ content }) => {
        dispatch({ type: 'CREATE', payload: content })
        setTimeout(() => {dispatch({ type: 'ERASE' })}, 5000)
      },
        onError: () => {
          dispatch({ type: 'CREATE_ERROR', payload: content })
          setTimeout(() => {dispatch({ type: 'ERASE' })}, 5000)
        }
      })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
