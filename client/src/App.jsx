import { Container } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import HeaderAdmin from './components/Admin/components/HeaderAdmin';
import HeaderAgency from './components/Agency/components/HeaderAgency';
import HeadeFactory from './components/Factory/components/HeadeFactory';
import HeaderGuarantee from './components/Guarantee/components/HeaderGuarantee';
import {
    privateAdminRoutes,
    privateAgencyRoutes,
    privateFactoryRoutes,
    privateGuaranteeRoutes,
    publicRoutes,
} from './routes';

function App() {
    return (
        <Router>
            <div className="App">
                {localStorage.getItem('role') === 'admin' ? (
                    <Container sx={{ marginTop: '70px' }}>
                        <HeaderAdmin />
                        <Routes>
                            {privateAdminRoutes.map((route, i) => {
                                return <Route key={i} path={route.path} element={<route.component />} />;
                            })}
                        </Routes>
                    </Container>
                ) : localStorage.getItem('role') === 'agency' ? (
                    <Container sx={{ marginTop: '70px' }}>
                        <HeaderAgency />
                        <Routes>
                            {privateAgencyRoutes.map((route, i) => {
                                return <Route key={i} path={route.path} element={<route.component />} />;
                            })}
                        </Routes>
                    </Container>
                ) : localStorage.getItem('role') === 'guarantee' ? (
                    <Container sx={{ marginTop: '70px' }}>
                        <HeaderGuarantee />
                        <Routes>
                            {privateGuaranteeRoutes.map((route, i) => {
                                return <Route key={i} path={route.path} element={<route.component />} />;
                            })}
                        </Routes>
                    </Container>
                ) : localStorage.getItem('role') === 'factory' ? (
                    <Container sx={{ marginTop: '70px' }}>
                        <HeadeFactory />
                        <Routes>
                            {privateFactoryRoutes.map((route, i) => {
                                return <Route key={i} path={route.path} element={<route.component />} />;
                            })}
                        </Routes>
                    </Container>
                ) : (
                    <Routes>
                        {publicRoutes.map((route, i) => {
                            return <Route key={i} path={route.path} element={<route.component />} />;
                        })}
                    </Routes>
                )}
            </div>
        </Router>
    );
}

export default App;
