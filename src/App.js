import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/home';
import { Header } from './components/header';
import Catalog from './views/catalog';
import Footer from './components/footer';
import PlayMovie from './views/playMovie';

function App() {
    return (
        <div style={{ backgroundColor: '#262626' }}>
            <div className="max-w-screen-2xl mx-auto">
                <div className="relative min-h-screen">
                    <Router>
                        <Header />
                        <Routes>
                            <Route path="/:category" element={<Catalog />} />
                            <Route
                                path="/:category/:id/play"
                                element={<PlayMovie />}
                            />
                            <Route path="/" element={<Home />} />
                        </Routes>
                        <Footer />
                    </Router>
                </div>
            </div>
        </div>
    );
}

export default App;
