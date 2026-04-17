import { Button, Form, InputGroup, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { callLogin } from 'config/api';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserLoginInfo } from '@/redux/slice/accountSlide';
import styles from 'styles/auth.module.css';
import { useAppSelector } from '@/redux/hooks';
import { FiMail, FiLock } from 'react-icons/fi';

const LoginPage = () => {
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const isAuthenticated = useAppSelector(state => state.account.isAuthenticated);

    let location = useLocation();
    let params = new URLSearchParams(location.search);
    const callback = params?.get("callback");

    useEffect(() => {
        if (isAuthenticated) {
            window.location.href = '/';
        }
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setIsSubmit(true);
        setError('');
        const res = await callLogin(email, password);
        setIsSubmit(false);

        if (res?.data) {
            localStorage.setItem('access_token', res.data.access_token);
            dispatch(setUserLoginInfo(res.data.user))
            window.location.href = callback ? callback : '/';
        } else {
            const errorMsg = res.message && Array.isArray(res.message) ? res.message[0] : res.message;
            setError(errorMsg || 'Login failed');
        }
    };

    return (
        <div className={styles["loginPage"]}>
            <Container>
                <Row className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                    <Col md={5} sm={8} xs={12}>
                        <Card className="shadow-lg">
                            <Card.Body className="p-5">
                                <h2 className={styles.heading}>Login</h2>
                                <p className={styles.subheading}>Enter your credentials to access your account</p>
                                
                                {error && <Alert variant="danger">{error}</Alert>}

                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email Address</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FiMail />
                                            </InputGroup.Text>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter your email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Password</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FiLock />
                                            </InputGroup.Text>
                                            <Form.Control
                                                type="password"
                                                placeholder="Enter your password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </InputGroup>
                                    </Form.Group>

                                    <Button 
                                        variant="primary" 
                                        type="submit" 
                                        className="w-100 mb-3"
                                        disabled={isSubmit}
                                    >
                                        {isSubmit ? 'Logging in...' : 'Login'}
                                    </Button>
                                </Form>

                                <hr />

                                <p className={styles.footer}>
                                    Don't have an account? <Link to="/register" className={styles.link}>Sign up</Link>
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LoginPage;