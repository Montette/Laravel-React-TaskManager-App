import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class UsersList extends Component {
  constructor () {
    super()
    this.state = {
      users: []
    }
  }

  componentDidMount () {
    axios.get('/api/users').then(response => {
        console.log(response.data)
      this.setState({
        users: response.data
      })
    })
  }

  render () {
    const { users } = this.state
    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-header'>Users</div>
              <div className='card-body'>
              
                <ul className='list-group list-group-flush'>
                  {users.map(user => (
                 <li className="list-group-item list-group-item-action d-flex justify-content-between">
                      {user.name}, {user.position}
                      <span className='badge badge-primary badge-pill'>
                        {user.tasks_count}
                      </span>
                    
                    </li>
                  ))}

                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UsersList