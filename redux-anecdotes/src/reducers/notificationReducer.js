import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        makeNotification(state, action){
            return action.payload
        },
        notificationReseted(){
            return null
        }
    }
})

export const setNotification = (notification, time) => {
    return async dispatch => {
        dispatch(makeNotification(notification))
        setTimeout(() => {
            dispatch(notificationReseted())
        }, time*1000)
    }
}

export const { 
    makeNotification, 
    notificationReseted 
    } = notificationSlice.actions
export default notificationSlice.reducer