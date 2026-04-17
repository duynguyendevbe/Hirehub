import { Button, Form, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { callRegister } from 'config/api';
import styles from 'styles/auth.module.css';
import { IUser } from '@/types/backend';
import { FiUser, FiMail, FiLock, FiCalendar, FiMapPin } from 'react-icons/fi';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        age: '',
        gender: 'MALE',
        address: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!formData.name || !formData.email || !formData.password || !formData.age || !formData.gender || !formData.address) {
            setError('Please fill in all fields');
            return;
        }

        setIsSubmit(true);
        setError('');
        const res = await callRegister(
            formData.name,
            formData.email,
            formData.password,
            +formData.age,
            formData.gender,
            formData.address
        );
        setIsSubmit(false);
        
        if (res?.data?.id) {
            navigate('/login')
        } else {
            const errorMsg = res.message && Array.isArray(res.message) ? res.message[0] : res.message;
            setError(errorMsg || 'Registration failed');
        }
    };

    return (
        <div className={styles["registerPage"]}>
            <Container>
                <Row className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', padding: '20px' }}>
                    <Col md={6} sm={8} xs={12}>
                        <Card className="shadow-lg">
                            <Card.Body className="p-5">
                                <h2 className={styles.heading}>Create Account</h2>
                                <p className={styles.subheading}>Join our community today</p>
                                
                                {error && <Alert variant="danger">{error}</Alert>}

                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            placeholder="Enter your full name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            placeholder="Enter your password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Age</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="age"
                                            placeholder="Enter your age"
                                            value={formData.age}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="MALE">Male</option>
                                            <option value="FEMALE">Female</option>
                                            <option value="OTHER">Other</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="address"
                                            placeholder="Enter your address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Button 
                                        variant="primary" 
                                        type="submit" 
                                        className="w-100 mb-3"
                                        disabled={isSubmit}
                                    >
                                        {isSubmit ? 'Creating account...' : 'Sign Up'}
                                    </Button>
                                </Form>

                                <hr />

                                <p className={styles.footer}>
                                    Already have an account? <Link to="/login" className={styles.link}>Sign in</Link>
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default RegisterPage;