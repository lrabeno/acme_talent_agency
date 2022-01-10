import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteSkill } from './store/clients'


class SingleClient extends Component {
    constructor() {
        super()
    }
    // async componentDidMount() {
    //     // store.dispatch(getClients())
    //     store.dispatch(getSkills())
    // }

    // componentDidUpdate(prevProps) {
    //     console.log('HELOOOOO PREV PROPS',prevProps)
    // }

    render() {
       const { byeSkill, history } = this.props
       console.log('HERE ARE THIS>PROPS',this.props)
       const id = this.props.match.params.id * 1
       const clients = this.props.clients
       const client = clients.find(client => client.id === id)
       if (!client) {
           return null
       }

    return (
        
        <div>
            <h3>{client.name} has these fighting skills.</h3>
                <ul>
                    {client.skills.map(
                        skill => 
                        <li key={skill.id}>
                            {skill.name}
                            {console.log('CLIENT ID',skill.clientskills.clientId)}
                            {console.log('SKILL ID',skill.clientskills.skillId)}
                            <button onClick={()=> byeSkill(skill.clientskills.clientId, skill.clientskills.skillId)}>DELETE</button>
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
        byeSkill: (clientId, skillId)=> {
            dispatch(deleteSkill(clientId, skillId))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleClient)