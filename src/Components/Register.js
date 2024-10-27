import React, { useState } from 'react';
import { useAuth } from '../AuthContext'; // Importing the Auth context
import './Auth.css'; // Importing CSS styles

const Register = () => {
    const { signup } = useAuth(); // Get signup function from context
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        // Validate input
        if (!username || !email || !password || !confirmPassword) {
            setError('All fields are required.'); // Show error if fields are empty
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.'); // Show error if passwords don't match
            return;
        }

        setError(''); // Clear previous errors

        try {
            await signup(username, email, password); // Call the signup function from context
            setSuccess('Registration successful! Please log in.'); // Show success message
        } catch (error) {
            setError(error.message || 'Registration failed.'); // Set error message if signup fails
        }
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <form className="auth-form" onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
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
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit">Sign Up</button>
            </form>
            {error && <p className="error-message">{error}</p>} {/* Display error message */}
            {success && <p className="success-message">{success}</p>} {/* Display success message */}
        </div>
    );
};

export default Register;
