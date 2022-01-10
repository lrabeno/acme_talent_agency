import axios from "axios";

//----------CLIENT ACTIONS-----------
const GET_CLIENTS = 'GET_CLIENTS'
const DELETE_CLIENT_SKILL = 'DELETE_CLIENT_SKILL'

//------ CLIENT ACTION CREATORS-------
const _getClients = (clients)=> {
    return {
        type: GET_CLIENTS,
        clients
    }
}

const _deleteSkill = (clients) => {
    return {
        type: DELETE_CLIENT_SKILL,
        clients
    }
}

//---------- CLIENT THUNKS----------
export const getClients = () => {
    return async (dispatch) => {
        const clients = (await axios.get('/clients')).data
        dispatch(_getClients(clients))
    }
}

export const deleteSkill = (clientId, skillId) => {
    return async(dispatch) => {
       const clients = (await axios.delete(`/clients/${clientId}/${skillId}`)).data
        dispatch(_deleteSkill(clients))
    }
}


//--------- CLIENT REDUCER---------
export const clients = (state = [], action) => {
    switch(action.type) {
        case GET_CLIENTS:
        state = action.clients
        case DELETE_CLIENT_SKILL:
            return action.clients
        default:
          return state
        
    }
}