import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Add from './scripts/Components/Add';
import Edit from './scripts/Components/Edit';
import Home from './scripts/Components/Home';
import NotFound from './scripts/Components/NotFound';

function App() {
    return (
        <Router>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/edit/:user" element={<Edit />} />
                <Route path="/add" element={<Add />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
