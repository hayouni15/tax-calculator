import React from 'react'
import TaxSummary from './components/TaxSummary/TaxSummary'
import NavBar from './components/NavBar/NavBar'
import Help from './components/Help/Help'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {

    const [tab, setTab] = React.useState('1');

    return (
        <Router>
            <div style={{ background: '#f5f5f5' }}>
                <NavBar tab={tab} setTab={setTab}></NavBar>

                <Routes>
                    <Route exact path="/" element={
                        <div>
                            {tab === '1' && <TaxSummary></TaxSummary>}
                            {tab === '2' && <Help></Help>}
                        </div>} />
                </Routes>
            </div>
        </Router >
    )
}

export default App