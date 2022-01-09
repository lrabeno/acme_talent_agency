import axios from "axios";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk"
import logger from "redux-logger";


//----------CLIENT ACTIONS-----------
const GET_CLIENTS = 'GET_CLIENTS'

//------ CLIENT ACTION CREATORS-------
const _getClients = (clients)=> {
    return {
        type: GET_CLIENTS,
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

//--------- CLIENT REDUCER---------
const clients = (state = [], action) => {
    switch(action.type) {
        case GET_CLIENTS:
        state = action.clients
    }
    return state
}

//----------SKILL ACTIONS-----------
const GET_SKILLS = 'GET_SKILLS'
const DELETE_SKILL = 'DELETE_SKILL'

//------ SKILL ACTION CREATORS-------
const _getSkills = (skills) => {
    return {
        type: GET_SKILLS,
        skills
    }
}

const _deleteSkill = (clientId, skillId) => {
    return {
        type: DELETE_SKILL,
        clientId,
        skillId
    }
}

//---------- SKILL THUNKS----------
export const getSkills = () => {
    return async (dispatch) => {
        const skills = (await axios.get('/skills')).data
        dispatch(_getSkills(skills))
    }
}

export const deleteSkill = (clientId, skillId) => {
    return async(dispatch) => {
       const client = (await axios.delete(`/clients/${clientId}/${skillId}`))
    //    const {data: clients} = (await axios.get('/clients'))
        dispatch(_deleteSkill(client))
    }
}

//--------- SKILL REDUCER---------
const skills = (state = [], action) => {
    switch(action.type) {
        case GET_SKILLS:
            state = action.skills
        case DELETE_SKILL:
            console.log('STATE FROM THE STORE',state)
            state = state.filter((skill) => skill.id !== action.id)
            
    }
    return state
}

// const GET_CLIENT_SKILLS = 'GET_CLIENT_SKILLS'

// const _getClientSkills = (clientskills) => {
//     return {
//         type: GET_CLIENT_SKILLS,
//         clientskills
//     }
// }

// export const getClientSkills = () => {
//     return async (dispatch) => {
//         const clientskills = (await axios.get('/clientskills')).data
//         dispatch(_getClientSkills(clientskills))
//     }
// }

// const clientSkillReducer = (state = [], action) => {
//     switch(action.type) {
//         case GET_CLIENT_SKILLS:
//         state = action.clientskills
//     }
//     return state
// }

const reducer = combineReducers({
    clients,
    skills,
    // clientSkillReducer
})


const store = createStore(reducer, applyMiddleware(thunk, logger))

export default store