import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/home';

function App() {
    return (
        <div className="max-w-screen-2xl mx-auto">
            {/* <div className="mx-14"> */}
            <div className="relative" style={{ backgroundColor: '#262626' }}>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </Router>
                {/* </div> */}
            </div>
        </div>
    );
}

export default App;
