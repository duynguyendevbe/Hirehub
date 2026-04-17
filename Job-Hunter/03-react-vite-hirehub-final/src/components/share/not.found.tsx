import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
            <div className="text-center">
                <h1 className="display-1 fw-bold text-primary">404</h1>
                <h2 className="mb-4">Page Not Found</h2>
                <p className="text-muted mb-4">Sorry, the page you visited does not exist.</p>
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
}

export default NotFound;