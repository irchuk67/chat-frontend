import PropTypes from 'prop-types';

const ErrorMessage = ({ message }) => {
    return (
        <div>
            <h1 style={{ textAlign: 'center', color: '#B80C09' }}>{message}</h1>
        </div>
    );
};

ErrorMessage.propTypes = {
    message: PropTypes.string,
};
export default ErrorMessage;