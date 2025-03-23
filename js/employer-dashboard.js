// Employer Dashboard JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    auth.onAuthStateChanged((user) => {
        if (user) {
            // User is signed in
            loadEmployerData(user.uid);
            setupLogout();
        } else {
            // User is not signed in, redirect to login page
            window.location.href = 'login.html';
        }
    });
});

// Load employer data from Firestore
function loadEmployerData(userId) {
    db.collection('employers').doc(userId).get()
        .then((doc) => {
            if (doc.exists) {
                const data = doc.data();
                
                // Update company name and email in the UI
                document.getElementById('companyNameDisplay').textContent = data.companyName;
                document.getElementById('userEmailDisplay').textContent = data.contactEmail;
                
                // Load employer stats
                loadEmployerStats(userId);
                
                // Load recent applications
                loadRecentApplications(userId);
                
                // Load recent jobs
                loadRecentJobs(userId);
            } else {
                console.error('No employer data found!');
                // Handle case where employer data doesn't exist
                auth.signOut().then(() => {
                    window.location.href = 'login.html';
                });
            }
        })
        .catch((error) => {
            console.error('Error getting employer data:', error);
        });
}

// Load employer statistics
function loadEmployerStats(userId) {
    // Get active jobs count
    db.collection('jobs')
        .where('employerId', '==', userId)
        .where('status', '==', 'active')
        .get()
        .then((querySnapshot) => {
            document.getElementById('activeJobsCount').textContent = querySnapshot.size;
        })
        .catch((error) => {
            console.error('Error getting active jobs count:', error);
        });
    
    // Get total applications count
    db.collection('applications')
        .where('employerId', '==', userId)
        .get()
        .then((querySnapshot) => {
            document.getElementById('applicationsCount').textContent = querySnapshot.size;
        })
        .catch((error) => {
            console.error('Error getting applications count:', error);
        });
    
    // Get job views count (placeholder - would be implemented with actual analytics)
    // For demo purposes, we'll just show a random number
    document.getElementById('jobViewsCount').textContent = Math.floor(Math.random() * 500);
    
    // Get hired count
    db.collection('applications')
        .where('employerId', '==', userId)
        .where('status', '==', 'hired')
        .get()
        .then((querySnapshot) => {
            document.getElementById('hiredCount').textContent = querySnapshot.size;
        })
        .catch((error) => {
            console.error('Error getting hired count:', error);
        });
}

// Load recent applications
function loadRecentApplications(userId) {
    const applicationsContainer = document.getElementById('recentApplications');
    
    db.collection('applications')
        .where('employerId', '==', userId)
        .orderBy('appliedAt', 'desc')
        .limit(5)
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                // No applications yet
                return;
            }
            
            // Clear empty state if exists
            const emptyState = applicationsContainer.querySelector('.empty-state');
            if (emptyState) {
                emptyState.remove();
            }
            
            // Add applications to the list
            querySnapshot.forEach((doc) => {
                const application = doc.data();
                
                // Get job title
                db.collection('jobs').doc(application.jobId).get()
                    .then((jobDoc) => {
                        if (jobDoc.exists) {
                            const job = jobDoc.data();
                            
                            // Get applicant name
                            db.collection('jobSeekers').doc(application.applicantId).get()
                                .then((applicantDoc) => {
                                    if (applicantDoc.exists) {
                                        const applicant = applicantDoc.data();
                                        
                                        // Create application item
                                        const applicationItem = document.createElement('div');
                                        applicationItem.className = 'application-item';
                                        
                                        // Format date
                                        const appliedDate = application.appliedAt.toDate();
                                        const formattedDate = appliedDate.toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        });
                                        
                                        // Set application item content
                                        applicationItem.innerHTML = `
                                            <div class="application-header">
                                                <h4>${applicant.firstName} ${applicant.lastName}</h4>
                                                <span class="application-date">${formattedDate}</span>
                                            </div>
                                            <p class="application-job">Applied for: ${job.title}</p>
                                            <div class="application-actions">
                                                <a href="view-application.html?id=${doc.id}" class="btn btn-small">View Details</a>
                                            </div>
                                        `;
                                        
                                        // Add application item to container
                                        applicationsContainer.appendChild(applicationItem);
                                    }
                                });
                        }
                    });
            });
        })
        .catch((error) => {
            console.error('Error getting recent applications:', error);
        });
}

// Load recent jobs
function loadRecentJobs(userId) {
    const jobsContainer = document.getElementById('recentJobs');
    
    db.collection('jobs')
        .where('employerId', '==', userId)
        .orderBy('postedAt', 'desc')
        .limit(5)
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                // No jobs yet
                return;
            }
            
            // Clear empty state if exists
            const emptyState = jobsContainer.querySelector('.empty-state');
            if (emptyState) {
                emptyState.remove();
            }
            
            // Add jobs to the list
            querySnapshot.forEach((doc) => {
                const job = doc.data();
                
                // Create job item
                const jobItem = document.createElement('div');
                jobItem.className = 'job-item';
                
                // Format date
                const postedDate = job.postedAt.toDate();
                const formattedDate = postedDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
                
                // Get status class
                let statusClass = '';
                switch (job.status) {
                    case 'active':
                        statusClass = 'status-active';
                        break;
                    case 'pending':
                        statusClass = 'status-pending';
                        break;
                    case 'closed':
                        statusClass = 'status-closed';
                        break;
                    default:
                        statusClass = '';
                }
                
                // Set job item content
                jobItem.innerHTML = `
                    <div class="job-header">
                        <h4>${job.title}</h4>
                        <span class="status-badge ${statusClass}">${job.status}</span>
                    </div>
                    <p class="job-location"><i class="fas fa-map-marker-alt"></i> ${job.location}</p>
                    <div class="job-meta">
                        <span><i class="far fa-calendar-alt"></i> Posted: ${formattedDate}</span>
                        <span><i class="fas fa-users"></i> Applications: ${job.applicationCount || 0}</span>
                    </div>
                    <div class="job-actions">
                        <a href="edit-job.html?id=${doc.id}" class="btn btn-small">Edit</a>
                        <a href="view-applications.html?jobId=${doc.id}" class="btn btn-small">View Applications</a>
                    </div>
                `;
                
                // Add job item to container
                jobsContainer.appendChild(jobItem);
            });
        })
        .catch((error) => {
            console.error('Error getting recent jobs:', error);
        });
}

// Setup logout functionality
function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            auth.signOut()
                .then(() => {
                    // Sign-out successful, redirect to home page
                    window.location.href = 'index.html';
                })
                .catch((error) => {
                    // An error happened
                    console.error('Error signing out:', error);
                });
        });
    }
}