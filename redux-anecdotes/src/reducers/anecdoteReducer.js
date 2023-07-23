import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    changeAnecdote(state, action){
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const votes = anecdoteToChange.votes + 1
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: votes
      }
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : changedAnecdote)
    },
    appendAnecdote(state, action){
      state.push(action.payload)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  },
})

export const { changeAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.updateAnecdote({...anecdote, votes: anecdote.votes + 1})
    dispatch(changeAnecdote(votedAnecdote.id))
  }
}

export default anecdoteSlice.reducer
