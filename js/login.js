// Login JavaScript

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

// Handle login form submission
function handleLogin(e) {
    e.preventDefault();
    
    // Get form elements
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Clear previous error messages
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'none';
    
    // Validate form inputs
    if (!email || !password) {
        displayError('Please enter both email and password');
        return;
    }
    
    // Set persistence based on "Remember me" checkbox
    const persistenceType = rememberMe 
        ? firebase.auth.Auth.Persistence.LOCAL  // Remember user
        : firebase.auth.Auth.Persistence.SESSION; // Until browser is closed
    
    // Set auth persistence then sign in
    auth.setPersistence(persistenceType)
        .then(() => {
            // Sign in with email and password
            return auth.signInWithEmailAndPassword(email, password);
        })
        .then((userCredential) => {
            // Login successful
            const user = userCredential.user;
            
            // Check user type (employer or job seeker) and redirect accordingly
            return db.collection('employers').doc(user.uid).get()
                .then((doc) => {
                    if (doc.exists) {
                        // User is an employer
                        window.location.href = 'employer-dashboard.html';
                    } else {
                        // Check if user is a job seeker
                        return db.collection('jobSeekers').doc(user.uid).get()
                            .then((seekerDoc) => {
                                if (seekerDoc.exists) {
                                    // User is a job seeker
                                    window.location.href = 'jobseeker-dashboard.html';
                                } else {
                                    // User type not found
                                    displayError('Account type not found. Please contact support.');
                                    auth.signOut(); // Sign out the user
                                }
                            });
                    }
                });
        })
        .catch((error) => {
            // Handle errors
            console.error('Login error:', error);
            
            let errorMsg = 'An error occurred during login. Please try again.';
            
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                errorMsg = 'Invalid email or password. Please try again.';
            } else if (error.code === 'auth/invalid-email') {
                errorMsg = 'The email address is not valid.';
            } else if (error.code === 'auth/user-disabled') {
                errorMsg = 'This account has been disabled. Please contact support.';
            } else if (error.code === 'auth/too-many-requests') {
                errorMsg = 'Too many unsuccessful login attempts. Please try again later.';
            }
            
            displayError(errorMsg);
        });
}

// Display error message
function displayError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    
    // Scroll to error message
    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}