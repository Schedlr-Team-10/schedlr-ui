import React, { useState } from 'react';
import { useAuth } from '../AuthContext'; // Importing the Auth context
import './Auth.css'; // Importing CSS styles

const Login = () => {
    const { login } = useAuth(); // Get login function from context
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        // Validate input
        if (!email || !password) {
            setError('Both fields are required.'); // Show error if fields are empty
            return;
        }

        setError(''); // Clear previous errors

        try {
            await login(email, password); // Call the login function from context
            setSuccess('Login successful! Redirecting...'); // Show success message
            // Optionally, you could navigate to the homepage or another page here
        } catch (error) {
            setError(error.message || 'Login failed.'); // Set error message if login fails
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form className="auth-form" onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Log In</button>
            </form>
            {error && <p className="error-message">{error}</p>} {/* Display error message */}
            {success && <p className="success-message">{success}</p>} {/* Display success message */}
        </div>
    );
};

export default Login;
