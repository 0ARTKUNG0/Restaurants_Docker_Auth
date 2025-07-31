import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Component/Navbar';
import authService from '../service/auth.service';
import Swal from 'sweetalert2';

const LoginRestaurant = () => {
  const [values, setValues] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authService.login(values.username, values.password);
      
      if (response.data && response.data.accessToken) {
        // Show success popup with animation
        await Swal.fire({
          title: 'Welcome Back! 🎉',
          text: `Hello ${response.data.username}! You have successfully logged in.`,
          icon: 'success',
          confirmButtonText: 'Let\'s Go!',
          confirmButtonColor: '#10B981',
          background: '#1f2937',
          color: '#ffffff',
          showClass: {
            popup: 'animate__animated animate__fadeInUp'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutDown'
          },
          timer: 3000,
          timerProgressBar: true
        });
        navigate('/');
      } else {
        setError(response.data?.message || 'Login failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Network error or server is not running');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className='container mx-auto'>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="text-center mb-6">
                <h1 className="text-4xl font-bold text-primary mb-2">Welcome Back!</h1>
                <p className="text-base-content/70">Sign in to your Grab Restaurant account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Username</span>
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                {error && (
                  <div className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                  </div>
                )}

                <div className="form-control mt-6">
                  <button 
                    type="submit" 
                    className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </button>
                </div>
              </form>

              <div className="divider">OR</div>

              <div className="text-center">
                <p className="text-base-content/70">
                  Don't have an account?{' '}
                  <button 
                    onClick={() => navigate('/register')}
                    className="link link-primary font-semibold"
                  >
                    Create one here
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRestaurant;