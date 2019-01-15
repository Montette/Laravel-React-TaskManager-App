import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'




class User extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {},
      tasks: [],
      completedTasks: [],
      errors: []
    }
    // this.handleFieldChange = this.handleFieldChange.bind(this)
    // this.handleAddNewTask = this.handleAddNewTask.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
  }

//   componentDidMount () {
//     const userId = this.props.match.params.id

//     axios.get(`/api/users/${userId}`).then(response => {
//       this.setState({
//         user: response.data,
//         // tasks: response.data.tasks.filter(task => !task.is_completed),
//         // completedTasks: response.data.tasks.filter(task => task.is_completed),
//       })
//     })
//   }

//   handleFieldChange (event) {
//     this.setState({
//       title: event.target.value
//     })
//   }

//   handleAddNewTask (event) {
//     event.preventDefault()

//     const task = {
//       title: this.state.title,
//       project_id: this.state.project.id
//     }

//     axios.post('/api/tasks', task)
//       .then(response => {
//         // clear form input
//         this.setState({
//           title: ''
//         })
//         // add new task to list of tasks
//         this.setState(prevState => ({
//           tasks: prevState.tasks.concat(response.data)
//         }))
//       })
//       .catch(error => {
//         this.setState({
//           errors: error.response.data.errors
//         })
//       })
//   }

//   handleMarkTaskAsCompleted (completedTask) {
//     const completedTasks = [...this.state.completedTasks];
//     completedTasks.push(completedTask);
//     axios.put(`/api/tasks/${completedTask.id}`).then(response => {
//       this.setState(prevState => ({
//         tasks: prevState.tasks.filter(task => {
//           return task.id !== completedTask.id
//         }),
//          completedTasks
//       }))
//     })
//   }

  hasErrorFor (field) {
    return !!this.state.errors[field]
  }

  renderErrorFor (field) {
    if (this.hasErrorFor(field)) {
      return (
        <span className='invalid-feedback'>
          <strong>{this.state.errors[field][0]}</strong>
        </span>
      )
    }
  }

//   handleMarkProjectAsCompleted () {
//     const { history } = this.props

//     axios.put(`/api/projects/${this.state.project.id}`)
//       .then(response => history.push('/'))
//   }

//   deleteTask (taskToDelete) {
//       let kindOftasks = taskToDelete.is_completed ? 'completedTasks' : 'tasks';
//       axios.delete(`/api/tasks/${taskToDelete.id}`)
//       .then(response => {
//         this.setState(prevState => ({
//             [kindOftasks]: prevState[kindOftasks].filter(task => {
//               return task.id !== taskToDelete.id
//             }),
            
//           }))
//       })
//   }

  render () {
    const user = this.props.data;

    return (
                      <li className="list-group-item list-group-item-action">
                  <div className="d-flex justify-content-between">
                      {user.name}, {user.position}
                      <span className='badge badge-primary badge-pill'>
                        {user.tasks_count}
                      </span>
                      </div>

                      <ul className='list-group list-group-flush'>
                         Active tasks:
                         {user.tasks.filter(task => !task.is_completed).map(task => (
                           <li className="list-group-item list-group-item-action">
                             {task.title}
                           </li>
                         ))}
                      </ul>
                 
                    
                    </li>
    )
  }
}

export default User