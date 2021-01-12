import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Contact } from './contact'
import { Home } from './home'
import { Post } from './post'

class App extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/contact" component={Contact} />
                    <Route exact path="/secret/:slug" component={Post} />
                </Switch>
            </div>
        )
    }
}

export default App;