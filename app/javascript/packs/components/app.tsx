import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Contact } from './contact'
import { Home } from './home'

class App extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/contact" component={Contact} />
                </Switch>
            </div>
        )
    }
}

export default App;