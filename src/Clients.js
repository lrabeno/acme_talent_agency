import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


const Clients = ({clients}) => {
    
    return (
        <div>
                <h2>---CLIENTS---</h2>
                {clients.map(client => {
                    return (
                        <h4 key={client.id}>
                            <Link to={`/client/${client.id}`}>
                                {client.name} 
                                ({client.skills.length})
                            </Link>
                        </h4>)
                })}
            </div>
            )
}

const mapStateToProps = (state) => state

// const mapDispatchToProps = (dispatch) => {
//     return {
//         clients: ()=> dispatch(getClients())
//     }
// }
export default connect(mapStateToProps)(Clients)