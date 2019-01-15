import axios from 'axios'
import React, { Component } from 'react'

class SingleProject extends Component {
  constructor (props) {
    super(props)
    this.state = {
      project: {},
    //   user: {
    //       name: '',
    //       id: ''
    //   },
      user_id: 0,
      userName: '',
      tasks: [],
      completedTasks: [],
      title: '',
      errors: []
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleAddNewTask = this.handleAddNewTask.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
  }

  componentDidMount () {
    const projectId = this.props.match.params.id

    axios.get(`/api/projects/${projectId}`).then(response => {
      this.setState({
        project: response.data,
        tasks: response.data.tasks.filter(task => !task.is_completed),
        completedTasks: response.data.tasks.filter(task => task.is_completed),
      })
    })
  }

  handleFieldChange (event) {
      console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
      
    });
    if(event.target.tagName.toLowerCase() === 'select') {
        this.setState({
            user_id: event.target.options[event.target.selectedIndex].id
        });
        console.log(event.target);
        console.log(event.target.options);
        console.log(event.target.selectedIndex)
    }
    console.log(this.state.user_id);
  }

  handleAddNewTask (event) {
    event.preventDefault()

    const task = {
      title: this.state.title,
      project_id: this.state.project.id,
      user_id: Number(this.state.user_id)
    }

    axios.post('/api/tasks', task)
      .then(response => {
        // clear form input
        this.setState({
          title: '',
          user_id: '',
          userName: ''
        })
        // add new task to list of tasks
        this.setState(prevState => ({
          tasks: prevState.tasks.concat(response.data)
        }))
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
        })
      })
  }

  handleMarkTaskAsCompleted (completedTask) {
    const completedTasks = [...this.state.completedTasks];
    completedTasks.push(completedTask);
    axios.put(`/api/tasks/${completedTask.id}`).then(response => {
      this.setState(prevState => ({
        tasks: prevState.tasks.filter(task => {
          return task.id !== completedTask.id
        }),
         completedTasks
      }))
    })
  }

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

  handleMarkProjectAsCompleted () {
    const { history } = this.props

    axios.put(`/api/projects/${this.state.project.id}`)
      .then(response => history.push('/'))
  }

  deleteTask (taskToDelete) {
      let kindOftasks = taskToDelete.is_completed ? 'completedTasks' : 'tasks';
      axios.delete(`/api/tasks/${taskToDelete.id}`)
      .then(response => {
        this.setState(prevState => ({
            [kindOftasks]: prevState[kindOftasks].filter(task => {
              return task.id !== taskToDelete.id
            }),
            
          }))
      })
  }

  render () {
    const { project, tasks, completedTasks } = this.state

    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-header'>{project.name}</div>
              <div className='card-body'>
                <p>{project.description}</p>

                <button  onClick={this.handleMarkProjectAsCompleted} className='btn btn-primary btn-sm'>
                  Mark as completed
                </button>

                <hr />
                <form onSubmit={this.handleAddNewTask}>
                    <div className='input-group'>
                        <input
                        type='text'
                        name='title'
                        className={`form-control ${this.hasErrorFor('title') ? 'is-invalid' : ''}`}
                        placeholder='Task title'
                        value={this.state.title}
                        onChange={this.handleFieldChange}
                        />
                     
                       
                        {this.renderErrorFor('title')}
                    </div>
                    
                    <div class="form-group">
                        <label for="userName">Assign user</label>
                        <select class="form-control" id="userName"  name="userName"
                        onChange={ this.handleFieldChange} value={this.state.userName}>
                       {this.props.users.map(user => (
                           <option id={user.id}>{user.name}</option>
                       ))}
                        </select>
                    </div>     
                    


                     <div className='input-group-append'>
                        <button className='btn btn-primary'>Add</button>
                        </div>

                    </form>
                <ul className='list-group mt-3'>
                  {tasks.map(task => (
                    <li
                      className='list-group-item d-flex justify-content-between align-items-center'
                      key={task.id}
                    >
                      {task.title}
                    <div>
                      <button
                            className='btn btn-primary btn-sm'
                            onClick={this.handleMarkTaskAsCompleted.bind(this,task)}
                            >
                            Mark as completed
                        </button>
                        <button
                            className='btn btn-primary btn-sm'
                            onClick={this.deleteTask.bind(this, task)}
                            >
                            Delete
                        </button>
                        </div>
                    </li>
                  ))}
                </ul>
                <hr />
                <p>Completed tasks</p>
                <ul className='list-group mt-3'>
                  {completedTasks.map(task => (
                    <li
                      className='list-group-item d-flex justify-content-between align-items-center'
                      key={task.id}
                    >
                      {task.title}
                      <button
                            className='btn btn-primary btn-sm'
                            onClick={this.deleteTask.bind(this, task)}
                            >
                            Delete
                        </button>

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

export default SingleProject