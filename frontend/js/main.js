import { fetchProfile, fetchProjects, fetchSkills, fetchSocials, submitContact } from './api.js';
import { renderProfile, renderProjects, renderSkills, renderSocials, showToast, toggleLoader } from './ui.js';
import { initTheme } from './theme.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Initialize Theme
    initTheme();

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Fetch and render data
    try {
        const [profileRes, skillsRes, projectsRes, socialsRes] = await Promise.all([
            fetchProfile(),
            fetchSkills(),
            fetchProjects(),
            fetchSocials()
        ]);

        if (profileRes.success) renderProfile(profileRes.data);
        if (skillsRes.success) renderSkills(skillsRes.data);
        if (projectsRes.success) renderProjects(projectsRes.data);
        if (socialsRes.success) renderSocials(socialsRes.data);

    } catch (error) {
        console.error('Failed to load portfolio data:', error);
        showToast('Failed to load data. Please try again later.', 'error');
    } finally {
        toggleLoader(false);
    }

    // Contact Form Handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button[type="submit"]');
            const btnText = btn.querySelector('.btn-text');
            const btnLoader = btn.querySelector('.btn-loader');
            
            // Loading state
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';
            btn.disabled = true;

            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };

            const response = await submitContact(data);
            
            if (response.success) {
                showToast(response.message || 'Message sent successfully!');
                contactForm.reset();
            } else {
                showToast(response.error || 'Failed to send message. Try again.', 'error');
            }

            // Reset button state
            btnText.style.display = 'inline-block';
            btnLoader.style.display = 'none';
            btn.disabled = false;
        });
    }

    // Smooth scroll for nav links (handled mostly by CSS scroll-behavior, but active state tracking added here)
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
        
        // Navbar blur effect on scroll
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = 'var(--shadow-sm)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
});
