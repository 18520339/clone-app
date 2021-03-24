import React from 'react';
import { Card, Footer } from './components';
import './App.css';

export default function App() {
    return (
        <div className='app'>
            <div className='app__videos'>
                <Card>
                    <Footer />
                </Card>
                <Card>
                    <Footer />
                </Card>
                <Card>
                    <Footer />
                </Card>
                <Card>
                    <Footer />
                </Card>
            </div>
        </div>
    );
}
