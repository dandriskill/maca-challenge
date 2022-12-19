import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import NavBar from './Navbar';

function Layout() {
    return (
        <>
            <NavBar />
            <Container maxWidth="lg">
                <Outlet />
            </Container>
        </>
    );
}

export default Layout;
