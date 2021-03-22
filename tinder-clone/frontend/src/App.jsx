import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Header, Cards, Inboxes, Chat, SwipeButtons } from './components';

export default function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/'>
                        <Header />
                        <Cards />
                        <SwipeButtons />
                    </Route>
                    <Route exact path='/chat'>
                        <Header back='/' />
                        <Inboxes />
                    </Route>
                    <Route exact path='/chat/:person'>
                        <Header back='/chat' />
                        <Chat />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}
