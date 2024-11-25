import { changePassword } from "./util/Util";
import { useState } from "react";

const PasswordRest = () => {

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Password Change Logic
    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            alert("New Password and Confirm Password do not match!");
            return;
        }
        try {
            const userid = localStorage.getItem("userId");
            const response = changePassword(userid, newPassword);
            if (response) {
                alert("Password changed successfully");
            } else {
                alert("Failed to change password");
            }
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            console.error("Error changing password:", error);
        }
    };


    return (
        <div>
            {/* Password Reset Section */}
            <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-8 mt-8">
                <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
                <div className="grid grid-cols-3 gap-4">
                <label className="col-span-1 text-right pr-4">Current Password:</label>
                <input
                    type="password"
                    className="col-span-2 border border-gray-300 rounded-lg px-2 py-1"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <label className="col-span-1 text-right pr-4">New Password:</label>
                <input
                    type="password"
                    className="col-span-2 border border-gray-300 rounded-lg px-2 py-1"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <label className="col-span-1 text-right pr-4">Confirm Password:</label>
                <input
                    type="password"
                    className="col-span-2 border border-gray-300 rounded-lg px-2 py-1"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div className="col-span-3 flex justify-center">
                    <button
                    onClick={handleChangePassword}
                    className="bg-blue-600 text-white py-2 px-6 rounded shadow-md hover:bg-blue-700 transition"
                    >
                    Change Password
                    </button>
                </div>
                </div>
            </div>

        </div>
    );
}

export default PasswordRest;