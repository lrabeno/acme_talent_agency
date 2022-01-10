import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { deleteSkill } from './store/clients'
import { getClientSkills } from './store/clientskill'
import { deleteClientSkill } from './store/clientskill'


class SingleClient extends Component {
    constructor() {
        super()
    }
    async componentDidMount() {
        this.props.getClientSkills()
    }

    // componentDidUpdate(prevProps) {
    //     console.log('HELOOOOO PREV PROPS',prevProps)
    // }

    render() {
       const { byeSkill, history } = this.props
    //    console.log('HERE ARE THIS>PROPS',this.props)
       const id = this.props.match.params.id * 1
       const clients = this.props.clients
       const client = clients.find(client => client.id === id)
       if (!client) {
           return null
       }

    //    console.log('CLIENT FRON SINGLE CLIENT', client)
    return (
        <div>
            <h3>{client.name} has these fighting skills.</h3>
                <ul>
                    {client.clientskills.map(
                        clientskill => 
                        <li key={clientskill.id}>
                            {console.log('HERES YOUR CLIENT SKILL ID', clientskill.id)}
                            {clientskill.name}
                            {console.log('CLIENT ID',clientskill.clientId)}
                            {console.log('SKILL ID',clientskill.skillId)}
                            {/* <button onClick={()=> byeSkill(clientskill.id)}>DELETE</button> */}
                            <button onClick={()=> byeSkill(clientskill.clientId, clientskill.skillId)}>DELETE</button>
                        </li>)}
                </ul>
        </div>
    )
    }
}

const mapStateToProps = (state) => {
    return {
        clients: state.clients,
        skills: state.skills
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getClientSkills: () => {
            dispatch(getClientSkills())
        },
        byeSkill: (clientId, skillId)=> {
            dispatch(deleteClientSkill(clientId, skillId))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleClient)