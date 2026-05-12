const Profile = require('../models/Profile');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Social = require('../models/Social');
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

exports.getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne();
    res.json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

exports.getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

exports.getSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find();
    res.json({ success: true, data: skills });
  } catch (error) {
    next(error);
  }
};

exports.getSocials = async (req, res, next) => {
  try {
    const socials = await Social.find();
    res.json({ success: true, data: socials });
  } catch (error) {
    next(error);
  }
};

exports.submitContact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    const contact = await Contact.create({ name, email, message });

    // Optional: send email to the portfolio owner
    // This requires setting up SMTP in .env
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 587,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      const info = await transporter.sendMail({
        from: `"${name}" <${email}>`,
        to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
        subject: 'New Portfolio Contact',
        text: message
      });
      
      
    }

    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    next(error);
  }
};
