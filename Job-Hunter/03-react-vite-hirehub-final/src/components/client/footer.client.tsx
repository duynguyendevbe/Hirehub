
const Footer = () => {
    return (
        <footer className="bg-light border-top py-4 mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-4 mb-md-0">
                        <h6 className="fw-bold mb-3">About JobHunter</h6>
                        <p className="text-muted small">
                            Your trusted platform for finding the perfect IT jobs and connecting with top companies.
                        </p>
                    </div>
                    <div className="col-md-4 mb-4 mb-md-0">
                        <h6 className="fw-bold mb-3">Quick Links</h6>
                        <ul className="list-unstyled">
                            <li><a href="/" className="text-muted text-decoration-none small">Home</a></li>
                            <li><a href="/job" className="text-muted text-decoration-none small">Jobs</a></li>
                            <li><a href="/company" className="text-muted text-decoration-none small">Companies</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h6 className="fw-bold mb-3">Contact</h6>
                        <p className="text-muted small">
                            Email: info@jobhunter.com<br />
                            Phone: +84 123 456 789
                        </p>
                    </div>
                </div>
                <hr className="my-4" />
                <div className="text-center">
                    <p className="text-muted small mb-0">
                        &copy; 2024 JobHunter. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;