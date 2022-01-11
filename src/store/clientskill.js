import axios from "axios";

//----------CLIENT SKILL ACTIONS-----------
const GET_CLIENT_SKILLS = 'GET_CLIENT_SKILLS'
// const DELETE_CLIENT_SKILL = 'DELETE_SKILL'

//------ CLIENT SKILL ACTION CREATORS-------
const _getClientSkills = (clientskills)=> {
    return {
        type: GET_CLIENT_SKILLS,
        clientskills
    }
}

// const _deleteClientSkill = (clientId, skillId) => {
//     return {
//         type: DELETE_CLIENT_SKILL,
//         clientId,
//         skillId
//     }
// }


//---------- CLIENT SKILL THUNKS----------
export const getClientSkills = () => {
    return async (dispatch) => {
        const clientskills = (await axios.get('/clientSkills')).data
        dispatch(_getClientSkills(clientskills))
    }
}

// export const deleteClientSkill = (clientId, skillId) => {
//     return async(dispatch) => {
//        await axios.delete(`/client/${clientId}/${skillId}`)
//     //    const {data: clients} = (await axios.get('/clients'))
//         dispatch(_deleteClientSkill(clientId, skillId))
//     }
// }

//--------- CLIENT SKILL REDUCER---------
export const clientskills = (state = [], action) => {
    switch(action.type) {
        case GET_CLIENT_SKILLS:
            state = action.clientskills
        // case DELETE_CLIENT_SKILL:
        //     console.log('STATE FROM THE STORE',state)
        //     state = state.filter((clientskill) => clientskill.id !== action.id)
        default: 
          return state
    }
}
