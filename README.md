# Global Film Festival 2025 - Web Application

## Overview
This is a modern, cinematic, and fully functional web application for the "Global Film Festival 2025" - an international short film competition hosted in Dubai. The application supports autonomous submission, payment integration, file uploads, and is ready for deployment.

## Features

### 🔹 Homepage
- Hero banner with Dubai skyline
- Title: Global Film Festival 2025 – Dubai
- CTA: "Submit Your Film Now"
- Countdown to July 5, 2025

### 🔹 About Section
- Description, eligibility, theme, and event goals

### 🔹 Submission Form (Functional)
- Personal details: Full Name, Email, Phone
- Film details: Title, Synopsis
- File uploads: Film Upload (or YouTube/Vimeo link), Poster/Thumbnail Upload
- Dynamic Fee based on date:
  - 🐦 Early Bird: ₹1,999 → May 1 to May 15
  - 📌 Regular Entry: ₹2,999 → May 16 to June 27
  - ⏰ Late Entry: ₹4,999 → June 28 to July 5
- Razorpay payment integration
- Auto-confirmation screen and email

### 🔹 Awards Section
- Best Film – ₹5,00,000
- Best Director – ₹2,00,000
- Audience Choice Award – ₹1,00,000
- Selected Short Films will be screened at the festival in Dubai
- Grand Prize: The winner will get an opportunity to create an IconStreamz Original Series

### 🔹 Contact Page
- Email: info@globalfilmfest2025.com
- Social media icons
- Contact form

## Design Style
- Modern & cinematic
- Fonts: Montserrat
- Colors: Black, Gold, White
- Animated transitions and responsive layout

## Technical Implementation

### Frontend
- HTML5, CSS3, JavaScript
- Responsive design for all devices
- Animations and transitions
- Form validation

### Backend (To be implemented)
- Store submissions in Supabase, Airtable, or Google Sheets
- Upload files to Firebase/S3
- Email notifications for admin and participants
- Submission management system

## Setup Instructions

### Local Development
1. Clone the repository
2. Open `index.html` in your browser

### Payment Integration
1. Create a Razorpay account at [razorpay.com](https://razorpay.com)
2. Replace the test key in `script.js` with your actual Razorpay key

### File Storage (To be implemented)
1. Create a Firebase or AWS S3 account
2. Configure storage rules and permissions
3. Update the file upload handlers in the backend code

### Database Setup (To be implemented)
1. Set up Supabase, Airtable, or Google Sheets for storing submission data
2. Configure API endpoints for data storage and retrieval

## Deployment

### Hosting Options
- Firebase Hosting
- Netlify
- Vercel
- AWS Amplify

### Steps for Deployment
1. Build the project (if using a build process)
2. Upload files to your chosen hosting platform
3. Configure domain settings
4. Set up SSL certificate

## Future Enhancements
- User accounts and dashboards
- Admin panel for submission management
- Multi-language support
- Integration with social media platforms
- Analytics and reporting

## Credits
- Font Awesome for icons
- Google Fonts for Montserrat font
- Unsplash for stock images
- Razorpay for payment processing