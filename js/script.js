document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('header nav a, .btn, a[href^="#"]');
    const pages = document.querySelectorAll('.page');
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');
    const logoutBtnProfile = document.getElementById('logout-btn-profile');
    const body = document.body;

    // --- Page Navigation ---
    function showPage(pageId) {
        const main = document.querySelector('main');
        const activePage = document.querySelector('.page.active');
        if (activePage) {
            main.style.minHeight = `${activePage.offsetHeight}px`;
        }

        pages.forEach(page => page.classList.remove('active'));
        const newPage = document.getElementById(pageId);
        if (newPage) {
            newPage.classList.add('active');
            setTimeout(() => { main.style.minHeight = 'auto'; }, 500);
        }
    }

    function handleNav(event) {
        const targetId = this.getAttribute('href').substring(1);
        if (document.getElementById(targetId)) {
            event.preventDefault();
            showPage(targetId);
        }
    }

    navLinks.forEach(link => {
        if (!link.id || (!link.id.includes('logout-btn'))) {
             link.addEventListener('click', handleNav);
        }
    });

    // --- Login/Logout Simulation ---
    function setLoginState(isLoggedIn) {
        if (isLoggedIn) {
            body.classList.add('logged-in');
        } else {
            body.classList.remove('logged-in');
        }
    }

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('Login attempt');
        setLoginState(true);
        showPage('profile'); // Show profile page on login
    });

    function handleLogout(event) {
        event.preventDefault();
        console.log('Logout');
        setLoginState(false);
        showPage('home'); // Show home page on logout
    }

    logoutBtn.addEventListener('click', handleLogout);
    logoutBtnProfile.addEventListener('click', handleLogout);

    // --- Initial State ---
    setLoginState(false); // Default to logged out
    const initialPageId = window.location.hash.substring(1) || 'home';
    showPage(initialPageId);
});