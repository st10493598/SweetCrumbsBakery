// Enquiry-specific JavaScript for Sweet Crumbs Bakery
// Handles enquiry form validation and AJAX submission

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('enquiryForm');
    const errorMessages = document.getElementById('errorMessages');
    const response = document.getElementById('response');
    const responseText = document.getElementById('responseText');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        errorMessages.innerHTML = '';

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const enquiryType = document.getElementById('enquiryType').value;
        const details = document.getElementById('details').value.trim();

        let errors = [];

        // Name validation
        if (!name) {
            errors.push('Full Name is required.');
        } else if (name.length < 2) {
            errors.push('Full Name must be at least 2 characters.');
        } else if (name.length > 50) {
            errors.push('Full Name must be less than 50 characters.');
        }

        // Email validation
        if (!email) {
            errors.push('Email is required.');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push('Please enter a valid email address.');
        }

        // Phone validation
        if (!phone) {
            errors.push('Phone Number is required.');
        } else if (!/^\+?[0-9\s\-\(\)]{10,15}$/.test(phone)) {
            errors.push('Please enter a valid phone number (10-15 digits).');
        }

        // Enquiry type validation
        if (!enquiryType) {
            errors.push('Please select an enquiry type.');
        }

        // Details validation
        if (!details) {
            errors.push('Details are required.');
        } else if (details.length < 10) {
            errors.push('Details must be at least 10 characters.');
        } else if (details.length > 500) {
            errors.push('Details must be less than 500 characters.');
        }

        if (errors.length > 0) {
            errorMessages.innerHTML = '<ul>' + errors.map(e => '<li>' + e + '</li>').join('') + '</ul>';
            return;
        }

        // Prepare data for submission
        const formData = {
            name,
            email,
            phone,
            enquiryType,
            details
        };

        // AJAX submission using fetch
        fetch('/api/enquiry', {  // Dummy URL for simulation
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Simulate response based on enquiry type
            let responseMessage = '';
            switch (enquiryType) {
                case 'product':
                    responseMessage = 'Thank you for your enquiry about our products/services. Our prices start from R110 for cakes and R12 for muffins. We will contact you within 24 hours with more details.';
                    break;
                case 'volunteer':
                    responseMessage = 'Thank you for your interest in volunteering. We have opportunities available. Please check back soon or contact us directly for current availability.';
                    break;
                case 'sponsor':
                    responseMessage = 'Thank you for considering sponsorship. We offer various sponsorship packages. We will contact you soon to discuss options.';
                    break;
                default:
                    responseMessage = 'Thank you for your enquiry. We will get back to you soon.';
            }

            responseText.textContent = responseMessage;
            form.style.display = 'none';
            response.style.display = 'block';
        })
        .catch(error => {
            console.error('Error:', error);
            errorMessages.innerHTML = '<p>There was an error submitting your enquiry. Please try again later.</p>';
        });
    });
});
