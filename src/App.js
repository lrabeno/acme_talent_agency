import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSkills } from './store/skills'
import { getClients } from './store/clients'
import Clients from './Clients'
import SingleClient from './SingleClient'
import Skills from './Skills'
import SingleSkill from './SingleSkill'
import { HashRouter as Router, Route, Link } from 'react-router-dom'

const Nav = (props) => {
    // console.log('router props', props)
    return (
        <nav>
       <Link to='/'>Home</Link>
        </nav>
    )
}

class App extends Component {
    constructor() {
        super()
    }
    async componentDidMount() {
        this.props.getClients()
        this.props.getSkills()
    }

    render() {
        
    return (
        <Router>
                <h1>Acme Skills</h1>
            <div>
                <Route component={ Nav } />
                <Route component={Clients} path='/' exact/>
                <Route component={Skills} path='/' exact/>
                <Route component={SingleClient} path='/client/:id' exact/>
                <Route component={SingleSkill} path='/skill/:id' exact/>
            </div>
        </Router>
    )
    }
}

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => {
    return {
       getClients: ()=> {
           dispatch(getClients())
       },
       getSkills: ()=> {
           dispatch(getSkills())
       }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
