import React from 'react'
import TaxSummary from './components/TaxSummary/TaxSummary'
import NavBar from './components/NavBar/NavBar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {

    return (
        <Router>
            <div style={{ background: '#f5f5f5' }}>
                <NavBar></NavBar>

                <Routes>
                    <Route exact path="/" element={

                        <div>
                            <TaxSummary></TaxSummary>
                        </div>} />
                </Routes>
            </div>
        </Router >


    )
}

export default App