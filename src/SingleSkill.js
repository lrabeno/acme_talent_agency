import React, { Component } from 'react'
import { connect } from 'react-redux'


class SingleSkill extends Component {
    constructor() {
        super()
    }
    
    render() {
       const id = this.props.match.params.id * 1
       const skills = this.props.skills
       const skill = skills.find(skill => skill.id === id)
       if (!skill) {
           return null
       }

        return (
            <div>
                <h5>Skill details about {skill.name}</h5>
            </div>
        )
    }
}

const mapStateToProps = (state, otherProps) => {
    // console.log('YOOOO OTHER PROPS', otherProps)
    return state
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         clients: ()=> dispatch(getClients())
//     }
// }
export default connect(mapStateToProps)(SingleSkill)
