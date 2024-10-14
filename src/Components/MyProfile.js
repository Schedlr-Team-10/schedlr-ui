import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyProfile = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [userid, setUserid] = useState('1');
    
    // State for password reset fields
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const buildLinkedInAuthUrl = () => {
        const linkedInAuthUrl = 'https://www.linkedin.com/oauth/v2/authorization';
        const params = {
            response_type: 'code',
            client_id: '862ar2q201lf2i', 
            client_secret: 'WPL_AP1.xXWyOLBXLlP9NFfF.Fi6kBg==',
            redirect_uri: 'http://localhost:3000/myprofile', 
            state: 'DCEeFWf45A53sdfKef424', 
            scope: 'openid profile email w_member_social'
        };
        const queryParams = new URLSearchParams(params).toString();
        return `${linkedInAuthUrl}?${queryParams}`;
    };

    const handleLinkedInLogin = () => {
        const authUrl = buildLinkedInAuthUrl();
        window.location.href = authUrl; // Redirect to the LinkedIn authorization URL
    };

    const sendCodeToBackend = async (code, state, userId) => {
        try {
            console.log("Calling SPRING BOOT API");
            const response = await axios.post('http://localhost:8081/linkedin/authCode', {
                code,
                state,
                userId
            });
            console.log('Response from backend:', response.data);
        } catch (error) {
            console.error('Error sending code to backend:', error);
        }
    };

    const fetchUserInfo = async (id) => {
        console.log("Id : " + id);
        const url = `http://localhost:8081/myProfile/userInfo?userId=${id.toString()}`;

        try {
            const response = await fetch(url); // Adjust the URL as needed
            const data = await response.json();
            console.log(data);
            setUserName(data.username);
            setEmail(data.email);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            alert('New Password and Confirm Password do not match!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8081/myProfile/changePassword', {
                password: newPassword,
                userId: userid
            });

            if (response.status === 200) {
                alert('Password changed successfully');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                alert('Failed to change password');
            }
        } catch (error) {
            console.error('Error changing password:', error);
            alert('Error changing password');
        }
    };

    useEffect(() => {
        const id = localStorage.getItem("userId");
        setUserid(id);

        fetchUserInfo(id);
        
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');

        if (code && state) {
            sendCodeToBackend(code, state, userid);
        }
    }, []);

    return (
        <div>
            <div id="myprofile" className="flex justify-center bg-[#ECF0F1] py-5">
                <div id="center container bg-[#d5e6eb] flex">
                    {/* Profile Section */}
                    <div className="w-[250px] bg-white border border-gray-300 rounded-lg p-5 shadow-lg mr-5">
                        <img 
                            src="https://via.placeholder.com/150" // Replace with actual image URL or use a static path
                            alt="Profile" 
                            className="rounded-full mx-auto w-28 h-28"
                        />
                        <h2 className="text-center text-xl font-bold mt-5">{userName || 'User Name'}</h2>
                        <p className="text-center text-gray-600">{email || 'user@example.com'}</p>
                        <div className='flex justify-around mt-7'>
                            <div className="bg-[#4267B]"><i class="fa-brands fa-twitter fa-xl 2]"></i></div>
                            <div className="bg-[#4267B]"><i class="fa-brands fa-facebook fa-xl"></i></div>
                            <div className="bg-[#4267B]"><i class="fa-brands fa-linkedin fa-xl"></i></div>
                            <div className="bg-[#4267B]"><i class="fa-brands fa-instagram fa-xl"></i></div>
                        </div>
                        <div className="my-8">
                            <label className="block text-gray-600">Website Completion</label>
                            <div className="w-full bg-gray-300 rounded-full h-4 mt-2">
                                <div className="bg-blue-600 h-4 rounded-full" style={{ width: '80%' }}>
                                    <span className="block text-center text-white text-xs">80%</span>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    </div>
                    {/* User Info and Password Section */}
                    <div>
                        <div className="border w-[600px] py-8 px-5 mb-5 rounded-lg shadow-2xl bg-[#f6f6f7]">
                            <h1 className="text-center mb-10 font-rajdhani text-2xl font-medium">Checkin your Social Media Accounts</h1>
                            <div className="grid grid-cols-3 gap-4 px-10">
                                <button className="border border-black bg-[#4267B2] text-white p-1 col-span-3">Facebook</button>
                                <button className="border border-black bg-[#d62976] text-white p-1 col-span-3">Instagram</button>
                                <button className="border border-black bg-[#0C63BC] text-white p-1 col-span-3" onClick={handleLinkedInLogin}>Linkedin</button>
                                <button className="border border-black bg-[#1da1f2] text-white p-1 col-span-3 ">Twitter</button>
                            </div>
                        </div>

                        

                        <div className="border w-[600px]  py-8 px-5 my-5 rounded-lg bg-[#f6f6f7] shadow-2xl">
                            <h1 className="text-center mb-10 font-rajdhani text-2xl font-medium">Reset your Password</h1>
                            <div className="grid grid-cols-3 gap-4">
                                <label className="text-left pl-5">Current Password</label>
                                <input 
                                    type="password" 
                                    value={currentPassword} 
                                    onChange={(e) => setCurrentPassword(e.target.value)} 
                                    className="rounded-sm col-span-2 pl-1" 
                                />
                                <label className="text-left pl-5">New Password</label>
                                <input 
                                    type="password" 
                                    value={newPassword} 
                                    onChange={(e) => setNewPassword(e.target.value)} 
                                    className="rounded-sm col-span-2 pl-1" 
                                />
                                <label className="text-left pl-5">Confirm Password</label>
                                <input 
                                    type="password" 
                                    value={confirmPassword} 
                                    onChange={(e) => setConfirmPassword(e.target.value)} 
                                    className="rounded-sm col-span-2 pl-1" 
                                />
                                <div className="col-span-1"></div>
                                <input 
                                    type="button" 
                                    value="Change Password" 
                                    onClick={handleChangePassword} 
                                    className="bg-[#5c81a6] rounded-sm text-white p-1 cursor-pointer" 
                                />
                            </div>
                        </div>
                    </div>
                    <div id="center container bg-[#d5e6eb] flex">
                    {/* Profile Section */}
                    <div className=" w-[380px] bg-white border border-gray-300 rounded-lg p-5 shadow-lg ml-5 mb-5">
                        <div className='flex justify-center'>
                            <button className='bg-[#4b8bf2] py-1 px-5 rounded-lg text-white'>Create New Post</button>
                        </div>
                        <div className='flex flex-wrap justify-center mt-5 gap-1'>
                            <img className='w-[100px] h-[100px]' src='https://preview.redd.it/what-are-you-most-hoping-to-see-in-avengers-doomsday-v0-tw06u6yzhdhd1.jpeg?width=1080&crop=smart&auto=webp&s=ba5c100d80f3650d22d6744fea4eebcd0b2d5546'/>
                            <img className='w-[100px] h-[100px] ' src='https://preview.redd.it/what-are-you-most-hoping-to-see-in-avengers-doomsday-v0-tw06u6yzhdhd1.jpeg?width=1080&crop=smart&auto=webp&s=ba5c100d80f3650d22d6744fea4eebcd0b2d5546'/>
                            <img className='w-[100px] h-[100px] ' src='https://preview.redd.it/what-are-you-most-hoping-to-see-in-avengers-doomsday-v0-tw06u6yzhdhd1.jpeg?width=1080&crop=smart&auto=webp&s=ba5c100d80f3650d22d6744fea4eebcd0b2d5546'/>
                            
                        </div>
                    </div>
                    <div className="w-[380px] bg-white border border-gray-300 rounded-lg p-5 shadow-lg ml-5">
                        <div className="bg-[#4267B] my-2"><i class="fa-brands fa-twitter fa-xl 2]"></i></div>
                        <div className="bg-[#4267B] my-2"><i class="fa-brands fa-facebook fa-xl"></i></div>
                        <div className="bg-[#4267B] my-2"><i class="fa-brands fa-linkedin fa-xl"></i></div>
                        <div className="bg-[#4267B] my-2"><i class="fa-brands fa-instagram fa-xl"></i></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
