// Admin Page — Firebase Auth Stub
document.addEventListener('DOMContentLoaded', () => {
    const loginView = document.getElementById('adminLogin');
    const dashboardView = document.getElementById('adminDashboard');
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');

    // Stub login — in production, replace with Firebase Auth
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Simple stub validation
        if (email && password) {
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Signing in...';
            submitBtn.disabled = true;

            setTimeout(() => {
                loginView.style.display = 'none';
                dashboardView.classList.add('is-visible');
            }, 1000);
        }
    });

    // Logout
    logoutBtn.addEventListener('click', () => {
        dashboardView.classList.remove('is-visible');
        loginView.style.display = '';
        loginForm.reset();
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Sign In';
        submitBtn.disabled = false;
    });

    // Sidebar navigation
    const sidebarLinks = document.querySelectorAll('.admin-sidebar__link:not(#logoutBtn)');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            sidebarLinks.forEach(l => l.classList.remove('is-active'));
            link.classList.add('is-active');
        });
    });
});
