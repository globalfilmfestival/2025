document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        }
    });
    
    // Countdown Timer
    const countdownDate = new Date('July 5, 2025 23:59:59').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('days').innerText = '00';
            document.getElementById('hours').innerText = '00';
            document.getElementById('minutes').innerText = '00';
            document.getElementById('seconds').innerText = '00';
        }
    }
    
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    // Dynamic Fee Calculation based on date
    function updateSubmissionFee() {
        const now = new Date();
        const earlyBirdStart = new Date('May 1, 2025');
        const regularStart = new Date('May 16, 2025');
        const lateStart = new Date('June 28, 2025');
        const submissionEnd = new Date('July 6, 2025');
        
        let fee = '₹1,999';
        let period = 'Early Bird Period';
        
        // For testing purposes, we'll use the current date to determine the fee
        // In production, uncomment the actual date checks
        
        // Simulating different periods for testing
        const currentPeriod = document.querySelector('body').getAttribute('data-test-period') || 'early';
        
        if (currentPeriod === 'regular' || (now >= regularStart && now < lateStart)) {
            fee = '₹2,999';
            period = 'Regular Entry Period';
            document.getElementById('early-bird').style.opacity = '0.5';
            document.getElementById('regular-entry').style.opacity = '1';
            document.getElementById('late-entry').style.opacity = '0.5';
        } else if (currentPeriod === 'late' || (now >= lateStart && now < submissionEnd)) {
            fee = '₹4,999';
            period = 'Late Entry Period';
            document.getElementById('early-bird').style.opacity = '0.5';
            document.getElementById('regular-entry').style.opacity = '0.5';
            document.getElementById('late-entry').style.opacity = '1';
        } else {
            document.getElementById('early-bird').style.opacity = '1';
            document.getElementById('regular-entry').style.opacity = '0.5';
            document.getElementById('late-entry').style.opacity = '0.5';
        }
        
        document.getElementById('submissionFee').innerText = fee;
        document.getElementById('feePeriod').innerText = period;
        
        return fee.replace('₹', '').replace(',', '');
    }
    
    updateSubmissionFee();
    
    // File Upload Handling
    const filmUpload = document.getElementById('filmUpload');
    const filmUploadName = document.getElementById('filmUploadName');
    const posterUpload = document.getElementById('posterUpload');
    const posterUploadName = document.getElementById('posterUploadName');
    
    if (filmUpload) {
        filmUpload.addEventListener('change', function() {
            if (this.files.length > 0) {
                const fileName = this.files[0].name;
                filmUploadName.textContent = fileName;
                
                // Validate file size (max 500MB for demo purposes)
                const fileSize = this.files[0].size / 1024 / 1024; // in MB
                if (fileSize > 500) {
                    alert('File size exceeds 500MB. Please upload a smaller file or provide a link instead.');
                    this.value = '';
                    filmUploadName.textContent = '';
                }
            } else {
                filmUploadName.textContent = '';
            }
        });
    }
    
    if (posterUpload) {
        posterUpload.addEventListener('change', function() {
            if (this.files.length > 0) {
                const fileName = this.files[0].name;
                posterUploadName.textContent = fileName;
                
                // Validate file size (max 5MB)
                const fileSize = this.files[0].size / 1024 / 1024; // in MB
                if (fileSize > 5) {
                    alert('Poster file size exceeds 5MB. Please upload a smaller file.');
                    this.value = '';
                    posterUploadName.textContent = '';
                }
            } else {
                posterUploadName.textContent = '';
            }
        });
    }
    
    // Payment Integration with QR Code
    const razorpayButton = document.getElementById('razorpay-button');
    const paymentQrModal = document.getElementById('payment-qr-modal');
    const paymentAmount = document.getElementById('payment-amount');
    const paymentQrImg = document.getElementById('payment-qr-img');
    const paymentCompletedBtn = document.getElementById('payment-completed');
    
    if (razorpayButton) {
        razorpayButton.addEventListener('click', function() {
            // Basic form validation
            const form = document.getElementById('submission-form');
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!isValid) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Get current fee with ₹ symbol
            const feeWithSymbol = document.getElementById('submissionFee').innerText;
            const fee = updateSubmissionFee();
            
            // Set payment amount in the modal
            paymentAmount.innerText = feeWithSymbol;
            
            // Use the global film festival jpeg image for payment QR code
            // This is a static QR code for the payment system
            paymentQrImg.src = "global film festival.jpeg"; // Using the provided jpeg image
            
            // Update the direct payment link with the fee amount
            const paymentLink = document.querySelector('.payment-link');
            if (paymentLink) {
                // Append the fee to the payment URL as a parameter
                paymentLink.href = `https://rzp.io/i/payment?amount=${fee}`;
            }
            
            // Show payment QR code modal
            paymentQrModal.style.display = 'flex';
        });
    }
    
    // Handle payment completion
    if (paymentCompletedBtn) {
        paymentCompletedBtn.addEventListener('click', function() {
            // Close payment QR modal
            paymentQrModal.style.display = 'none';
            
            // Get form data
            const form = document.getElementById('submission-form');
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const filmTitle = document.getElementById('filmTitle').value;
            const synopsis = document.getElementById('synopsis').value;
            const filmLink = document.getElementById('filmLink').value;
            const submissionFee = document.getElementById('submissionFee').innerText;
            const feePeriod = document.getElementById('feePeriod').innerText;
            
            // Generate submission ID
            const submissionId = 'GFF-' + Math.floor(100000 + Math.random() * 900000);
            document.getElementById('submission-id').innerText = submissionId;
            
            // In a real implementation, this would be handled by a server-side API
            // Here we're simulating the email sending process
            
            // 1. Send submission details to festival organizers
            console.log('Sending submission details to globalfilmfestival.offl@gmail.com');
            console.log('Submission Details:');
            console.log(`Submission ID: ${submissionId}`);
            console.log(`Name: ${fullName}`);
            console.log(`Email: ${email}`);
            console.log(`Phone: ${phone}`);
            console.log(`Film Title: ${filmTitle}`);
            console.log(`Synopsis: ${synopsis}`);
            console.log(`Film Link: ${filmLink}`);
            console.log(`Submission Fee: ${submissionFee}`);
            console.log(`Fee Period: ${feePeriod}`);
            
            // 2. Send acknowledgment email to participant
            console.log(`Sending acknowledgment email to participant: ${email}`);
            console.log('Email Content:');
            console.log(`Dear ${fullName},`);
            console.log(`Thank you for submitting your film "${filmTitle}" to the Global Film Festival 2025.`);
            console.log(`Your submission ID is: ${submissionId}`);
            console.log('We have received your payment and your submission is now complete.');
            console.log('Our selection committee will review your film and we will notify you of the results by June 1, 2025.');
            console.log('If you have any questions, please contact us at globalfilmfestival.offl@gmail.com.');
            console.log('Best regards,');
            console.log('Global Film Festival Team');
            
            // In a production environment, you would use a service like EmailJS, Firebase Functions, 
            // or a backend API to handle the actual email sending
            
            // Show confirmation modal
            const confirmationModal = document.getElementById('confirmation-modal');
            confirmationModal.style.display = 'flex';
            
            // Reset form
            form.reset();
            if (filmUploadName) filmUploadName.textContent = '';
            if (posterUploadName) posterUploadName.textContent = '';
            
            // In a real implementation, you would also upload the files to Firebase/S3
            // and store the submission data in your database
        });
    }
    
    // Modal Close Buttons
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const closeConfirmation = document.getElementById('close-confirmation');
    const confirmationModal = document.getElementById('confirmation-modal');
    
    // Add event listeners to all close buttons
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Find the parent modal of this close button
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    if (closeConfirmation && confirmationModal) {
        closeConfirmation.addEventListener('click', function() {
            confirmationModal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would send the form data to your server
            // For demo purposes, we'll simulate a successful submission
            
            alert('Thank you for your message. We will get back to you soon!');
            contactForm.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.about-content, .timeline-item, .award-item, .screening-info, .grand-prize');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});