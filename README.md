# JobConnect - Employment Website

JobConnect is a free employment website where employers can register and post jobs, and job seekers can find and apply for opportunities.

## Features

- Employer registration and authentication
- Job posting functionality
- Employer dashboard
- Responsive design for all devices
- Firebase integration for database and authentication

## Setup Instructions

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the setup wizard
3. Once your project is created, click on "Web" to add a web app to your project
4. Register your app with a nickname (e.g., "JobConnect")
5. Copy the Firebase configuration object (we'll need this later)

### 2. Enable Firebase Authentication

1. In the Firebase Console, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Enable the "Email/Password" sign-in method

### 3. Set Up Firestore Database

1. In the Firebase Console, go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Start in production mode or test mode (you can change this later)
4. Choose a location for your database (pick the one closest to your users)
5. Wait for the database to be created

### 4. Update Firebase Configuration

1. Open the `js/firebase-config.js` file
2. Replace the placeholder configuration with your Firebase project's configuration:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 5. Deploy to GitHub Pages (Free Hosting)

1. Create a GitHub account if you don't have one: [GitHub](https://github.com/)
2. Create a new repository for your project
3. Push your code to the repository:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial commit"

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git push -u origin main
```

4. In your GitHub repository, go to "Settings" > "Pages"
5. Under "Source", select "main" branch and click "Save"
6. Wait a few minutes, and your site will be live at `https://yourusername.github.io/your-repo-name/`

## Project Structure

```
employment-site/
├── css/
│   ├── styles.css
│   └── dashboard.css
├── js/
│   ├── script.js
│   ├── firebase-config.js
│   ├── employer-register.js
│   ├── login.js
│   └── employer-dashboard.js
├── index.html
├── employer-register.html
├── login.html
├── employer-dashboard.html
└── README.md
```

## Customization

You can customize the website by:

1. Changing colors in `css/styles.css` (look for the `:root` section)
2. Updating the logo and company name
3. Modifying the content on the homepage
4. Adding more features as needed

## Additional Pages to Create

To complete the website, you may want to create these additional pages:

1. Job seeker registration
2. Job posting form
3. Job listing page
4. Job detail page
5. Job application form
6. About page
7. Contact page

## Need Help?

If you need assistance with setting up or customizing your JobConnect website, feel free to reach out!

## License

This project is open source and available for personal and commercial use.