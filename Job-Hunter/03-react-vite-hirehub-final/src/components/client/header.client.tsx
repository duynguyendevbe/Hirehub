import { useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown, Offcanvas, Button } from 'react-bootstrap';
import styles from '@/styles/client.module.css';
import { isMobile } from 'react-device-detect';
import { FaReact } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { callLogout } from '@/config/api';
import { setLogoutAction } from '@/redux/slice/accountSlide';
import ManageAccount from './modal/manage.account';
import { FiLogOut, FiUser, FiLock } from 'react-icons/fi';

const Header = (props: any) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const isAuthenticated = useAppSelector(state => state.account.isAuthenticated);
    const user = useAppSelector(state => state.account.user);
    const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);
    const location = useLocation();
    const [openManageAccount, setOpenManageAccount] = useState<boolean>(false);

    const handleLogout = async () => {
        const res = await callLogout();
        if (res && +res.statusCode === 200) {
            dispatch(setLogoutAction({}));
            navigate('/')
        }
    }

    return (
        <>
            <Navbar bg="light" expand="lg" sticky="top" className="border-bottom shadow-sm">
                <Navbar.Brand as={Link} to="/" className="ms-3">
                    <FaReact size={28} color="#3498db" className="me-2" />
                    <span className={styles.brand}>JobHunter</span>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-3" />
                
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto me-3">
                        <Nav.Link 
                            as={Link}
                            to="/"
                            active={location.pathname === '/'}
                            className={styles.navLink}
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link 
                            as={Link}
                            to="/job"
                            active={location.pathname === '/job'}
                            className={styles.navLink}
                        >
                            Jobs
                        </Nav.Link>
                        <Nav.Link 
                            as={Link}
                            to="/company"
                            active={location.pathname === '/company'}
                            className={styles.navLink}
                        >
                            Companies
                        </Nav.Link>

                        {isAuthenticated === false ? (
                            <>
                                <Nav.Link 
                                    as={Link}
                                    to="/login"
                                    className={styles.navLink}
                                >
                                    <FiLock size={18} className="me-1" />
                                    Login
                                </Nav.Link>
                            </>
                        ) : (
                            <Dropdown className="ms-2">
                                <Dropdown.Toggle 
                                    variant="light" 
                                    id="user-dropdown"
                                    className={styles.userDropdown}
                                    style={{ textDecoration: 'none' }}
                                >
                                    {user?.name?.substring(0, 2)?.toUpperCase()}
                                </Dropdown.Toggle>

                                <Dropdown.Menu align="end">
                                    <Dropdown.Item 
                                        onClick={() => setOpenManageAccount(true)}
                                        className={styles.dropdownItem}
                                    >
                                        <FiUser size={16} className="me-2" />
                                        My Account
                                    </Dropdown.Item>
                                    {user?.role?.permissions && user?.role?.permissions?.length > 0 && (
                                        <>
                                            <Dropdown.Divider />
                                            <Dropdown.Item 
                                                as={Link}
                                                to="/admin"
                                                className={styles.dropdownItem}
                                            >
                                                <FiLock size={16} className="me-2" />
                                                Admin Panel
                                            </Dropdown.Item>
                                        </>
                                    )}
                                    <Dropdown.Divider />
                                    <Dropdown.Item 
                                        onClick={handleLogout}
                                        className={`${styles.dropdownItem} text-danger`}
                                    >
                                        <FiLogOut size={16} className="me-2" />
                                        Logout
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <ManageAccount
                open={openManageAccount}
                onClose={setOpenManageAccount}
            />
        </>
    )
};

export default Header;