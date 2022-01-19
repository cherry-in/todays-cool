import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <img className="mb-5" src={process.env.PUBLIC_URL + '/ku-tiger.png'} alt="어흥이" />
            <h2>Oops! Page Not Be Found</h2>
            <p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable</p>
            <Link to="/login" style={{ color: "crimson" }}>Back to login</Link>
        </div>
    )
}

export default ErrorPage