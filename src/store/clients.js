import axios from "axios";
import { clientskills } from "./clientskill";

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

const _deleteClientSkill = (clientId, skillId) => {
    return {
        type: DELETE_CLIENT_SKILL,
        clientId,
        skillId
    }
}
// const _deleteSkill = (clients) => {
//     return {
//         type: DELETE_CLIENT_SKILL,
//         clients
//     }
// }

//---------- CLIENT THUNKS----------
export const getClients = () => {
    return async (dispatch) => {
        const clients = (await axios.get('/clients')).data
        dispatch(_getClients(clients))
    }
}

export const deleteClientSkill = (clientId, skillId) => {
    return async(dispatch) => {
       await axios.delete(`/client/${clientId}/${skillId}`)
    //    const {data: clients} = (await axios.get('/clients'))
        dispatch(_deleteClientSkill(clientId, skillId))
    }
}


//--------- CLIENT REDUCER---------
export const clients = (state = [], action) => {
    switch(action.type) {
        case GET_CLIENTS:
          return action.clients
        case DELETE_CLIENT_SKILL:
            console.log('STATE FROM THE STORE',state)
        return state.map((client) => {
            if (client.id === action.clientId) {
                client.clientskills = client.clientskills.filter(clientskill => clientskill.id !== action.skillId )
            }
            return client
        })
        
        default:
          return state
        
    }
}