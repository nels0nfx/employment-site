// Employer Registration JavaScript

document.addEventListener('DOMContentLoaded', () => {
    const employerRegisterForm = document.getElementById('employerRegisterForm');
    
    if (employerRegisterForm) {
        employerRegisterForm.addEventListener('submit', handleEmployerRegistration);
    }
});

// Handle employer registration form submission
function handleEmployerRegistration(e) {
    e.preventDefault();
    
    // Get form elements
    const companyName = document.getElementById('companyName').value.trim();
    const industry = document.getElementById('industry').value;
    const companySize = document.getElementById('companySize').value;
    const companyWebsite = document.getElementById('companyWebsite').value.trim();
    const contactName = document.getElementById('contactName').value.trim();
    const contactPosition = document.getElementById('contactPosition').value.trim();
    const contactEmail = document.getElementById('contactEmail').value.trim();
    const contactPhone = document.getElementById('contactPhone').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const companyDescription = document.getElementById('companyDescription').value.trim();
    const termsCheck = document.getElementById('termsCheck').checked;
    
    // Clear previous error messages
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
    
    // Validate form inputs
    if (!companyName || !industry || !companySize || !contactName || 
        !contactPosition || !contactEmail || !contactPhone || !password || 
        !confirmPassword || !companyDescription || !termsCheck) {
        
        displayError('Please fill in all required fields');
        return;
    }
    
    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(contactEmail)) {
        displayError('Please enter a valid email address');
        return;
    }
    
    // Validate password length
    if (password.length < 6) {
        displayError('Password must be at least 6 characters long');
        return;
    }
    
    // Check if passwords match
    if (password !== confirmPassword) {
        displayError('Passwords do not match');
        return;
    }
    
    // Create user with email and password
    auth.createUserWithEmailAndPassword(contactEmail, password)
        .then((userCredential) => {
            // User account created successfully
            const user = userCredential.user;
            
            // Save employer data to Firestore
            return db.collection('employers').doc(user.uid).set({
                companyName: companyName,
                industry: industry,
                companySize: companySize,
                companyWebsite: companyWebsite || null,
                contactName: contactName,
                contactPosition: contactPosition,
                contactEmail: contactEmail,
                contactPhone: contactPhone,
                companyDescription: companyDescription,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                accountType: 'employer'
            });
        })
        .then(() => {
            // Registration successful
            displaySuccess('Registration successful! Redirecting to dashboard...');
            
            // Redirect to employer dashboard after 2 seconds
            setTimeout(() => {
                window.location.href = 'employer-dashboard.html';
            }, 2000);
        })
        .catch((error) => {
            // Handle errors
            console.error('Registration error:', error);
            
            let errorMsg = 'An error occurred during registration. Please try again.';
            
            if (error.code === 'auth/email-already-in-use') {
                errorMsg = 'This email is already registered. Please use a different email or login.';
            } else if (error.code === 'auth/invalid-email') {
                errorMsg = 'The email address is not valid.';
            } else if (error.code === 'auth/weak-password') {
                errorMsg = 'The password is too weak. Please use a stronger password.';
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

// Display success message
function displaySuccess(message) {
    const successMessage = document.getElementById('success-message');
    successMessage.textContent = message;
    successMessage.style.display = 'block';
    
    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}