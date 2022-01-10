import axios from "axios";

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

// const _deleteSkill = (clientId, skillId) => {
//     return {
//         type: DELETE_SKILL,
//         clientId,
//         skillId
//     }
// }

//---------- SKILL THUNKS----------
export const getSkills = () => {
    return async (dispatch) => {
        const skills = (await axios.get('/skills')).data
        dispatch(_getSkills(skills))
    }
}

// export const deleteSkill = (clientId, skillId) => {
//     return async(dispatch) => {
//        const client = (await axios.delete(`/clients/${clientId}/${skillId}`))
//     //    const {data: clients} = (await axios.get('/clients'))
//         dispatch(_deleteSkill(client))
//     }
// }

//--------- SKILL REDUCER---------
export const skills = (state = [], action) => {
    switch(action.type) {
        case GET_SKILLS:
            state = action.skills
        default: 
          return state
        // case DELETE_SKILL:
        //     console.log('STATE FROM THE STORE',state)
        //     state = state.filter((skill) => skill.id !== action.id)
            
    }
}