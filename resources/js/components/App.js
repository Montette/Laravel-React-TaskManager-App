
    import React, { Component } from 'react'
    import ReactDOM from 'react-dom'
    import { BrowserRouter, Route, Switch } from 'react-router-dom'
    import Header from './Header'
    import ProjectsList from './ProjectsList'
    import NewProject from './NewProject';
    import Project from './Project';
    import UsersList from './UsersList';
    import User from './User'

    class App extends Component {

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
        return (
          <BrowserRouter>
            <div>
              <Header />
              <Switch>
                <Route exact path='/' component={ProjectsList} />
                <Route path='/create' component={()=> <NewProject users={this.state.users}/>} />
                <Route path='/users' component={()=> <UsersList users={this.state.users}/>} />
                <Route path='/users/:id' component={User} />
                <Route path='/:id' component={(props)=> <Project {...props} users={this.state.users}/>} />
                
 
              </Switch>
            </div>
          </BrowserRouter>
        )
      }
    }

    ReactDOM.render(<App />, document.getElementById('app'))