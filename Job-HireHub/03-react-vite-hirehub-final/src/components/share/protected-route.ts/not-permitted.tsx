import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NotPermitted = () => {
    const navigate = useNavigate();
    return (
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
            <div className="text-center">
                <h1 className="display-1 fw-bold text-danger">403</h1>
                <h2 className="mb-4">Access Denied</h2>
                <p className="text-muted mb-4">Sorry, you are not authorized to access this page.</p>
                <Button 
                    variant="primary" 
                    size="lg"
                    onClick={() => navigate('/')}
                    className="px-5"
                >
                    Back Home
                </Button>
            </div>
        </div>
    )
};

export default NotPermitted;