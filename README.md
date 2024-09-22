# Full Stack Quiz App

## Overview
The Full Stack Quiz App is a web application that allows users to take quizzes, track their scores, and manage their profiles. The app features user authentication, email verification, and an auto-login mechanism that uses local storage for session management.
![Architecture](/asset/QuizArchitecture.png)
![Signin](/asset/quizSignin.png)
![Login](/asset/quizLogin.png)
![start](/asset/quizStart.png)
![Live](/asset/QuizLive.png)
![score](/asset/quizScore.png)
## Features
- **User Authentication**: Supports login and signup functionality.
- **Email Verification**: Verifies user email addresses to ensure validity.
- **Score Tracking**: Users can view their scores for all quizzes taken.
- **Auto-login**: Users are automatically logged in for up to 1 day using local storage.
- **Quiz Timer**: Each quiz has a timer to enhance the challenge.
- **Secure Quiz Questions**: Quiz questions are fetched from the backend to prevent answer sharing.

## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Email Service**: Nodemailer
- **State Management**: Context API
- **Styling**: CSS