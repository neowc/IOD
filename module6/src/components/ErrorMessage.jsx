import PropTypes from 'prop-types';

function ErrorMessage({ error, resetErrorBoundary }) {
    console.error(error);

    return (
        <div className="ErrorMessage">
        <p>An error occurred:</p>
        <pre>{error.message}</pre>
        <button onClick={() => resetErrorBoundary()}>Try Again?</button>
        </div>
    );
}

ErrorMessage.propTypes = {
    error: PropTypes.object.isRequired,
    resetErrorBoundary: PropTypes.func.isRequired
};

export default ErrorMessage;
