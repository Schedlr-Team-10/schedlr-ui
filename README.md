SCHEDLR - AI-Powered Social Media Scheduling & Collaboration Tool

Live at: http://52.64.225.94:3000/

Implemented Features:

1. User Authentication: Developed a seamless login and registration page with added functionality for password recovery via OTP, ensuring a smooth user experience.
2. My Profile Page: Created a dynamic profile page where users can update their profile picture, bio, and social media URLs. Users also have the ability to grant platform access (LinkedIn and Pinterest) and change their passwords.
3. Create Post Feature: Designed an intuitive post creation feature allowing users to upload posts across multiple social media platforms simultaneously.
4. AI Content Assistant: Integrated an AI-powered description generator, enabling users to generate post descriptions instantly for their social media content.
5. Post Scheduling: Developed a scheduling feature that lets users set specific dates and times to automatically post on their chosen platforms, ensuring timely content delivery.
6. Platform Analytics: Implemented analytics dashboards for LinkedIn and Pinterest, providing users with static data insights to track post performance.
7. Marketplace for Collaboration: Introduced a marketplace for regular users to collaborate with influencers by sending personalized collaboration requests, including a description of the desired post.
8. Influencer Marketplace: Designed a marketplace where influencers can review and accept or reject collaboration requests, streamlining the partnership process.
9. Collaboration Code: Implemented an innovative collaboration code system, where once an influencer approves a collaboration request and the payment is processed, a unique code is generated for the normal user. This code gives the normal user the ability to post on both their own platform and the influencer's platform simultaneously. By applying the code during post creation, the normal user can instantly share content on both accounts, enabling effortless cross-platform collaboration.


Database Setup:

The database for SCHEDLR was structured with several interrelated tables to manage user information, social media profiles, posts, and collaborations:

1. Users Table: Stores user information such as username, email, password, profile picture, bio, and account type (Personal or Influencer). It also includes an OTP field for password recovery.

2. Profiles Table: Holds social media access tokens for users, enabling integration with platforms like LinkedIn and Pinterest. The table tracks token expiration dates and links the profiles to user accounts.

3. Post Upload Table: Stores details of user-uploaded posts, including images, descriptions, and platform-specific post IDs (e.g., Pinterest, LinkedIn), along with the upload timestamp.

4. Schedule Post Upload Table: Allows users to schedule posts for future uploads on selected platforms (Pinterest, LinkedIn), including the scheduled time for each post.

5. Influencers Table: Stores influencer-specific data, including their social media profiles, pricing, and tags, linked to the users table to ensure proper referencing.

6. Collaboration Table: Manages collaboration requests between regular users and influencers, including messages, collaboration status (e.g., Pending, Accepted, Rejected, Payment Pending, Completed), and a unique collaboration token. This token enables cross-platform posting when collaboration is accepted and payment is completed.

These tables are interlinked through foreign keys, ensuring data consistency and referential integrity across the system.


Constraints:

1. We have tried to get the real time analytics from LinkedIn and Pinterest platforms but we didn't got the permission those platforms which resulted in implementing with the static data.

Live App:
http://52.64.225.94:3000/


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
