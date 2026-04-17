import React, { useState } from 'react';
import { Container, Navbar, Nav, Dropdown, Button, Offcanvas } from 'react-bootstrap';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { callLogout } from 'config/api';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { isMobile } from 'react-device-detect';
import { setLogoutAction } from '@/redux/slice/accountSlide';
import { ALL_PERMISSIONS } from '@/config/permissions';
import styles from './layout.admin.module.css';
import { FiMenu, FiHome, FiUsers, FiBriefcase, FiFileText, FiSettings, FiLogOut } from 'react-icons/fi';

interface MenuItem {
    label: string;
    path: string;
    icon: JSX.Element;
}

const LayoutAdmin = () => {
    const location = useLocation();
    const [showSidebar, setShowSidebar] = useState(false);
    const user = useAppSelector(state => state.account.user);
    const permissions = useAppSelector(state => state.account.user.role.permissions);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        const res = await callLogout();
        if (res && +res.statusCode === 200) {
            dispatch(setLogoutAction({}));
            navigate('/');
        }
    }

    // Build menu items based on permissions
    const getMenuItems = (): MenuItem[] => {
        const ACL_ENABLE = import.meta.env.VITE_ACL_ENABLE;
        const items: MenuItem[] = [
            {
                label: 'Dashboard',
                path: '/admin',
                icon: <FiHome size={18} />,
            }
        ];

        const viewCompany = permissions?.find(item =>
            item.apiPath === ALL_PERMISSIONS.COMPANIES.GET_PAGINATE.apiPath
            && item.method === ALL_PERMISSIONS.COMPANIES.GET_PAGINATE.method
        );

        if (viewCompany || ACL_ENABLE === 'false') {
            items.push({
                label: 'Company',
                path: '/admin/company',
                icon: <FiBriefcase size={18} />,
            });
        }

        const viewUser = permissions?.find(item =>
            item.apiPath === ALL_PERMISSIONS.USERS.GET_PAGINATE.apiPath
            && item.method === ALL_PERMISSIONS.USERS.GET_PAGINATE.method
        );

        if (viewUser || ACL_ENABLE === 'false') {
            items.push({
                label: 'User',
                path: '/admin/user',
                icon: <FiUsers size={18} />,
            });
        }

        const viewJob = permissions?.find(item =>
            item.apiPath === ALL_PERMISSIONS.JOBS.GET_PAGINATE.apiPath
            && item.method === ALL_PERMISSIONS.JOBS.GET_PAGINATE.method
        );

        if (viewJob || ACL_ENABLE === 'false') {
            items.push({
                label: 'Job',
                path: '/admin/job',
                icon: <FiBriefcase size={18} />,
            });
        }

        const viewResume = permissions?.find(item =>
            item.apiPath === ALL_PERMISSIONS.RESUMES.GET_PAGINATE.apiPath
            && item.method === ALL_PERMISSIONS.RESUMES.GET_PAGINATE.method
        );

        if (viewResume || ACL_ENABLE === 'false') {
            items.push({
                label: 'Resume',
                path: '/admin/resume',
                icon: <FiFileText size={18} />,
            });
        }

        const viewRole = permissions?.find(item =>
            item.apiPath === ALL_PERMISSIONS.ROLES.GET_PAGINATE.apiPath
            && item.method === ALL_PERMISSIONS.ROLES.GET_PAGINATE.method
        );

        if (viewRole || ACL_ENABLE === 'false') {
            items.push({
                label: 'Role',
                path: '/admin/role',
                icon: <FiSettings size={18} />,
            });
        }

        const viewPermission = permissions?.find(item =>
            item.apiPath === ALL_PERMISSIONS.PERMISSIONS.GET_PAGINATE.apiPath
            && item.method === ALL_PERMISSIONS.PERMISSIONS.GET_PAGINATE.method
        );

        if (viewPermission || ACL_ENABLE === 'false') {
            items.push({
                label: 'Permission',
                path: '/admin/permission',
                icon: <FiSettings size={18} />,
            });
        }

        return items;
    };

    const menuItems = getMenuItems();
    const isActive = (path: string) => location.pathname === path;

    if (isMobile) {
        return (
            <>
                <Navbar bg="light" expand="lg" sticky="top" className="border-bottom">
                    <Container fluid>
                        <Navbar.Brand as={Link} to="/admin">
                            <strong>ADMIN</strong>
                        </Navbar.Brand>
                        <Button 
                            variant="light" 
                            onClick={() => setShowSidebar(true)}
                            className="ms-auto"
                        >
                            <FiMenu size={20} />
                        </Button>
                    </Container>
                </Navbar>

                <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} placement="start">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Menu</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="flex-column">
                            {menuItems.map((item) => (
                                <Nav.Link 
                                    key={item.path}
                                    as={Link}
                                    to={item.path}
                                    className={`py-2 ${isActive(item.path) ? 'bg-primary text-white' : ''}`}
                                    onClick={() => setShowSidebar(false)}
                                >
                                    {item.icon} <span className="ms-2">{item.label}</span>
                                </Nav.Link>
                            ))}
                            <hr />
                            <Nav.Link 
                                as={Link}
                                to="/"
                                className="py-2"
                                onClick={() => setShowSidebar(false)}
                            >
                                <FiHome size={18} /> <span className="ms-2">Home</span>
                            </Nav.Link>
                            <Nav.Link 
                                className="py-2 text-danger"
                                onClick={() => {
                                    handleLogout();
                                    setShowSidebar(false);
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                <FiLogOut size={18} /> <span className="ms-2">Logout</span>
                            </Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Offcanvas>

                <Container fluid className="py-4">
                    <Outlet />
                </Container>
            </>
        );
    }

    return (
        <div className={styles.adminLayout}>
            <div className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <h5 className="mb-0">
                        <FiSettings size={20} className="me-2" />
                        ADMIN
                    </h5>
                </div>
                <nav className={styles.sidebarNav}>
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`${styles.navItem} ${isActive(item.path) ? styles.active : ''}`}
                            title={item.label}
                        >
                            <span className={styles.navIcon}>{item.icon}</span>
                            <span className={styles.navLabel}>{item.label}</span>
                        </Link>
                    ))}
                </nav>
            </div>

            <div className={styles.mainContent}>
                <div className={styles.topbar}>
                    <div className={styles.topbarRight}>
                        <span className={styles.welcome}>Welcome, {user?.name}</span>
                        <Dropdown className="ms-3">
                            <Dropdown.Toggle 
                                variant="light" 
                                id="dropdown-basic"
                                className={styles.userDropdown}
                            >
                                {user?.name?.substring(0, 2)?.toUpperCase()}
                            </Dropdown.Toggle>

                            <Dropdown.Menu align="end">
                                <Dropdown.Item as={Link} to="/">
                                    <FiHome size={16} className="me-2" />
                                    Home
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={handleLogout} className="text-danger">
                                    <FiLogOut size={16} className="me-2" />
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>

                <Container fluid className={styles.content}>
                    <Outlet />
                </Container>
            </div>
        </div>
    );
};
export default LayoutAdmin;