import React, { useState } from 'react';
import '../../css/styles.css'; // Make sure to include your styles

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the login logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <section className="login-section mb-4">
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <h2 className="section-heading">Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group mb-3">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <p className="mt-3">
              <a href="/forgot-password">Forgot password?</a>
            </p>
            <p>
              Don't have an account? <a href="/signup">Sign up here</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
