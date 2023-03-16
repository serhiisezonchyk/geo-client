import Spinner from 'react-bootstrap/Spinner';

function LoadingSpinner() {
    return <Spinner animation="border" id='loader' style={{zIndex: 500, position:'fixed'}}/>;
  }
  
  export default LoadingSpinner;