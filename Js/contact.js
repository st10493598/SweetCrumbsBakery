// Contact-specific JavaScript for Sweet Crumbs Bakery
// Handles contact form validation and submission

$(document).ready(function() {
    // Handle contact form submission
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();

        var errorMessages = $('#errorMessages');
        var form = $(this);
        var confirmation = $('#emailConfirmation');
        errorMessages.empty();

        // Get form data
        var formData = {
            name: $('#name').val().trim(),
            email: $('#email').val().trim(),
            messageType: $('#messageType').val(),
            subject: $('#subject').val().trim(),
            message: $('#message').val().trim()
        };

        // Enhanced validation
        var errors = [];

        if (!formData.name) {
            errors.push('Name is required.');
        } else if (formData.name.length < 2) {
            errors.push('Name must be at least 2 characters.');
        } else if (formData.name.length > 50) {
            errors.push('Name must be less than 50 characters.');
        }

        if (!formData.email) {
            errors.push('Email is required.');
        } else {
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                errors.push('Please enter a valid email address.');
            }
        }

        if (!formData.messageType) {
            errors.push('Please select a message type.');
        }

        if (!formData.subject) {
            errors.push('Subject is required.');
        } else if (formData.subject.length < 5) {
            errors.push('Subject must be at least 5 characters.');
        } else if (formData.subject.length > 100) {
            errors.push('Subject must be less than 100 characters.');
        }

        if (!formData.message) {
            errors.push('Message is required.');
        } else if (formData.message.length < 10) {
            errors.push('Message must be at least 10 characters.');
        } else if (formData.message.length > 1000) {
            errors.push('Message must be less than 1000 characters.');
        }

        if (errors.length > 0) {
            errorMessages.html('<ul>' + errors.map(function(error) { return '<li>' + error + '</li>'; }).join('') + '</ul>');
            return;
        }

        // Simulate submission (for production, integrate with EmailJS or Formspree)
        console.log('Contact form submitted:', formData);
        form.hide();
        confirmation.show();
    });
});
