
const urlParams = new URLSearchParams(window.location.search);

if (urlParams.get('signup') === 'success') {
    // Remove "Sign In" and "Sign Up" from the navigation links
    const navLinks = document.querySelector('.nav-links ul');
    const signInLink = document.querySelector('a[href="/signin"]');
    const signUpLink = document.querySelector('a[href="/signup"]');
    
    navLinks.removeChild(signInLink.parentNode); // Remove "Sign In"
    navLinks.removeChild(signUpLink.parentNode); // Remove "Sign Up"

    // Create "Your Account" link
    const yourAccountLink = document.createElement('li');
    yourAccountLink.innerHTML = '<a href="#" onclick="toggleSidebar()">Your Account</a>';
    
    // Add "Your Account" to the navigation links
    navLinks.appendChild(yourAccountLink);
}

// Function to toggle the sidebar
function toggleSidebar() {
    // Add your code to open/close the sidebar menu
    // You can use a library like Bootstrap or create your custom sidebar logic
    console.log('Toggle Sidebar');
}
