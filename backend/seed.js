require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
const mongoose = require('mongoose');
const Profile = require('./src/models/Profile');
const Project = require('./src/models/Project');
const Skill = require('./src/models/Skill');
const Social = require('./src/models/Social');

const connectDB = require('./src/config/db');

const importData = async () => {
  try {
    console.log('Connecting to DB...');
    await connectDB();
    console.log('Connected. Deleting old data...');
    await Project.deleteMany();
    await Skill.deleteMany();
    await Social.deleteMany();

    const profile = await Profile.create({
      name: 'Rohini Rajesh Wadile',
      title: 'Full Stack Developer',
      bio: 'MCA student and full stack developer intern passionate about building practical and user friendly web applications. I enjoy working on both frontend and backend development while continuously learning new technologies and improving my development skills through real projects.',
      avatarUrl: '/assets/profile.jpg',
      resumeUrl: '#',
      email: 'rohini@example.com',
      location: 'India'
    });

    const skills = await Skill.insertMany([
      { name: 'JavaScript', category: 'Frontend', proficiency: 90 },
      { name: 'React', category: 'Frontend', proficiency: 85 },
      { name: 'Node.js', category: 'Backend', proficiency: 80 },
      { name: 'Express.js', category: 'Backend', proficiency: 80 },
      { name: 'MongoDB', category: 'Database', proficiency: 75 },
      { name: 'CSS3', category: 'Frontend', proficiency: 85 },
      { name: 'HTML5', category: 'Frontend', proficiency: 95 },
      { name: 'Git', category: 'Tools', proficiency: 90 }
    ]);

    const projects = await Project.insertMany([
      {
        title: 'My Portfolio Website',
        description: 'A full stack developer portfolio website with dynamic projects, contact form integration, and MongoDB backend.',
        imageUrl: '/assets/portfolio-project.png',
        techStack: ['MongoDB', 'Express', 'React', 'Node.js'],
        githubUrl: 'https://github.com/RohiniWadile24/MyPortfolioWebsite',
        liveUrl: 'https://my-portfolio-website-eight-mu.vercel.app/',
        featured: true
      },
      {
        title: 'Taskify- Todo List App',
        description: 'A responsive todo list application allowing users to organize their tasks as per prority level and status.',
        imageUrl: '/assets/taskify-project.png',
        techStack: ['MongoDB', 'Express', 'React', 'Node.js'],
        githubUrl: 'https://github.com/RohiniWadile24/Taskify---TodoList-App-',
        liveUrl: 'https://taskify-todo-list-app-beta.vercel.app/',
        featured: true
      }
    ]);

    const socials = await Social.insertMany([
      { platform: 'GitHub', url: 'https://github.com/RohiniWadile24', iconUrl: 'fab fa-github' },
      { platform: 'LinkedIn', url: 'https://linkedin.com', iconUrl: 'fab fa-linkedin' },
      { platform: 'Twitter', url: 'https://twitter.com', iconUrl: 'fab fa-twitter' }
    ]);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error}`);
    process.exit(1);
  }
};

importData();
