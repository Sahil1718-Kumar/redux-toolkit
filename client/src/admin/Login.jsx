import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css';
import apiInstance from '../utils/apiInstance';
import '@fortawesome/fontawesome-free/css/all.min.css';

const LoadingOverlay = ({ loading }) => (
  loading ? (
    <div className="loader" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '100' }}>
      <div className="spinner-border text-info" role="status" style={{ width: '50px', height: '50px' }}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  ) : null
);

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/dashboard');
  }, [navigate]);

  const sessionexpired = localStorage.getItem('sessionexpired');
  const logoutmessage = localStorage.getItem('logoutmessage');
  const resetpass = localStorage.getItem('resetpass');

  useEffect(() => {
    if (logoutmessage) {
      toast.success('Logout successfully');
      localStorage.removeItem('logoutmessage');
    } else if (resetpass) {
      toast.success('Password reset successful');
      localStorage.removeItem('resetpass');
    } else if (sessionexpired) {
      toast.error('Your session has expired. Please log in again to continue.');
      localStorage.removeItem('sessionexpired');
    }
  }, [sessionexpired, logoutmessage, resetpass]);


  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!regex.test(email) ? 'Invalid email format' : '');
  };

  const validatePassword = (password) => {
    setPasswordError(password.length < 5 || password.length > 12
      ? 'Password must be between 5 to 12 characters'
      : '');
  }

  const handleChangeEmail = (e) => {
    const value = e.target.value.trim();
    setEmail(value);
    validateEmail(value);
  };

  const handleChangePassword = (e) => {
    const value = e.target.value.trim();
    setPassword(value);
    validatePassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailError && !passwordError) {
      setLoading(true);
      try {
        const res = await apiInstance.post('/login', { email, password });
        const { token } = res.data;
        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('loginmessage', 'true');
          navigate('/dashboard');
        } else {
          toast.error(res.data?.message || "Login failed");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'An error occurred while logging in. Please try again');
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('Please fix the validation errors before submitting');
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        draggable
        pauseOnHover
      />
      <div className="bg-gray-200">
        <main className="main-content mt-0">
          <div className="page-header align-items-start min-vh-100" style={{ backgroundImage: "url('/loginBackground.jpg')" }}>
            <span className="mask bg-gradient-dark opacity-6"></span>
            <div className="container my-auto">
              <div className="row">
                <div className="col-lg-4 col-md-8 col-12 mx-auto">
                  <div className="card z-index-0 fadeIn3 fadeInBottom">
                    <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                      <div className="bg-gradient-white shadow-dark border-radius-lg py-3 pe-1">
                        <div className='text-center mt-1'>
                          <img src='/logo.png' alt='logo' style={{ height: "40px", width: "100%",padding:"0 10px" }} />
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleSubmit} className="text-start">
                        <div className="input-group input-group-outline mt-3">
                          <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={handleChangeEmail}
                            required
                            placeholder="Email"
                            autoComplete="off"
                          />

                        </div>
                        {emailError && <small className="text-danger">{emailError}</small>}

                        <div className="input-group input-group-outline mt-3 position-relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            className="form-control"
                            value={password}
                            onChange={handleChangePassword}
                            required
                            placeholder="Password"
                            autoComplete="off"
                            maxLength={12}
                          />
                          <i
                            onClick={() => setShowPassword(!showPassword)}
                            className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}
                            style={{ position: "absolute", right: '5px', top: '10px', cursor: 'pointer', zIndex: '100', color: '#57cbff' }}
                          />
                        </div>
                        {passwordError && <small className="text-danger">{passwordError}</small>}

                        <div className="text-center">
                          <button type="submit" className="btn bg-info py-2 text-white w-100 my-4 mb-2">Login</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <LoadingOverlay loading={loading} />
    </>
  );
};

export default React.memo(Login);
