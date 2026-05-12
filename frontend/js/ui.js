export const renderProfile = (profile) => {
    if (!profile) return;
    
    document.getElementById('hero-name').textContent = profile.name;
    document.getElementById('hero-title').textContent = profile.title;
    document.getElementById('hero-bio').textContent = profile.bio;
    document.getElementById('about-text').textContent = profile.bio;
    document.getElementById('footer-name').textContent = profile.name;
    
    if (profile.avatarUrl) {
        document.getElementById('hero-avatar').src = profile.avatarUrl;
    }
};

export const renderSkills = (skills) => {
    const skillsGrid = document.getElementById('skills-grid');
    if (!skills || !skills.length) {
        skillsGrid.innerHTML = '<p>No skills added yet.</p>';
        return;
    }

    skillsGrid.innerHTML = skills.map(skill => `
        <div class="skill-card">
            <div class="skill-info" style="width: 100%;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <h3>${skill.name}</h3>
                    <span>${skill.proficiency}%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" style="width: ${skill.proficiency}%"></div>
                </div>
            </div>
        </div>
    `).join('');
};

export const renderProjects = (projects) => {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projects || !projects.length) {
        projectsGrid.innerHTML = '<p>No projects added yet.</p>';
        return;
    }

    projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card">
            <div class="project-img-wrapper">
                <img src="${project.imageUrl || 'https://via.placeholder.com/400x300'}" alt="${project.title}" class="project-img">
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-desc">${project.description}</p>
                <div class="tech-stack">
                    ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i></a>` : ''}
                    ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer"><i class="fas fa-external-link-alt"></i></a>` : ''}
                </div>
            </div>
        </div>
    `).join('');
};

export const renderSocials = (socials) => {
    const socialLinks = document.getElementById('social-links');
    if (!socials || !socials.length) return;

    socialLinks.innerHTML = socials.map(social => `
        <a href="${social.url}" target="_blank" rel="noopener noreferrer" class="social-link" title="${social.platform}">
            <i class="${social.iconUrl}"></i>
        </a>
    `).join('');
};

export const showToast = (message, type = 'success') => {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    
    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    // Trigger reflow
    void toast.offsetWidth;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
};

export const toggleLoader = (show) => {
    const loader = document.getElementById('loader');
    if (show) {
        loader.classList.remove('hidden');
    } else {
        loader.classList.add('hidden');
    }
};
