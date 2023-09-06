import { createContext, useReducer, useContext } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'CREATE':
            return `anecdote '${action.payload}' created`
        case 'VOTE':
            return `anecdote '${action.payload}' voted`
        case 'ERASE':
            return null
        case 'CREATE_ERROR':
            return 'too short anecdote, must have length 5 or more'
        default:
            return null
    }
}

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch] }>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext