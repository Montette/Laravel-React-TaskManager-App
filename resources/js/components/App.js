
    import React, { Component } from 'react'
    import ReactDOM from 'react-dom'
    import { BrowserRouter, Route, Switch } from 'react-router-dom'
    import Header from './Header'
    import ProjectsList from './ProjectsList'
    import NewProject from './NewProject';
    import Project from './Project';
    import UsersList from './UsersList'

    class App extends Component {
      render () {
        return (
          <BrowserRouter>
            <div>
              <Header />
              <Switch>
                <Route exact path='/' component={ProjectsList} />
                <Route path='/create' component={NewProject} />
                <Route path='/users' component={UsersList} />
                <Route path='/:id' component={Project} />
                
 
              </Switch>
            </div>
          </BrowserRouter>
        )
      }
    }

    ReactDOM.render(<App />, document.getElementById('app'))