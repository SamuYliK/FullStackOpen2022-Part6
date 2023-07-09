import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        notificationAdded(state, action){
            return `you added '${action.payload}'`
        },
        notificationVoted(state, action){
            return `you voted '${action.payload}'`
        },
        notificationReseted(){
            return null
        }
    }
})

export const { 
    notificationAdded, 
    notificationVoted,
    notificationReseted 
    } = notificationSlice.actions
export default notificationSlice.reducer