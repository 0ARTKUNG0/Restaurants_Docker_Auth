import { Navigate } from 'react-router';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (!user.accessToken) {
    // User is not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }
  
  // User is authenticated, render the protected component
  return children;
};

export default ProtectedRoute;
