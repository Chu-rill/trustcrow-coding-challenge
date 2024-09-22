// const nodemailer = require("nodemailer");
// const fs = require("fs").promises;
// const handlebars = require("handlebars");
// const path = require("path");
// require("dotenv").config();

// // Nodemailer setup
// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_PROVIDER,
//   port: process.env.SERVICE_PORT,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // Read the template file
// const welcomeTemplatePath = path.join(__dirname, "../views/welcome.hbs");
// const readTemplateFile = async () => {
//   try {
//     return await fs.readFile(welcomeTemplatePath, "utf-8");
//   } catch (error) {
//     throw new Error(`Error reading email template file: ${error}`);
//   }
// };

// // Send email without a template
// exports.sendEmail = async (email, data) => {
//   try {
//     const info = await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: data.subject,
//       text: data.text || "", // Optional plain text fallback
//       // html: data.html, // Uncomment if you want to use html directly
//     });
//     console.log(`Message sent: ${info.response}`);
//   } catch (error) {
//     console.error(`Error sending email: ${error.message}`);
//   }
// };

// // Send email with template
// exports.sendEmailWithTemplate = async (email, data) => {
//   try {
//     // Read the template file
//     const templateSource = await readTemplateFile();
//     // Compile the template
//     const emailTemplate = handlebars.compile(templateSource);

//     const info = await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: data.subject,
//       html: emailTemplate({
//         PlatformName: "Express Template",
//         Username: data.username,
//         title: "Welcome Email",
//       }),
//     });

//     console.log(`Message sent: ${info.response}`);
//   } catch (error) {
//     console.error(`Error sending email with template: ${error.message}`);
//   }
// };

const nodemailer = require("nodemailer");
const fs = require("fs").promises;
const handlebars = require("handlebars");
const path = require("path");
require("dotenv").config();

class EmailService {
  constructor() {
    // Set up Nodemailer transport
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_PROVIDER,
      port: process.env.SERVICE_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Define the path to the email template
    this.welcomeTemplatePath = path.join(__dirname, "../views/welcome.hbs");
  }

  // Method to read the email template file
  async readTemplateFile() {
    try {
      return await fs.readFile(this.welcomeTemplatePath, "utf-8");
    } catch (error) {
      throw new Error(`Error reading email template file: ${error}`);
    }
  }

  // Method to send an email without using a template
  async sendEmail(email, data) {
    try {
      const info = await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: data.subject,
        text: data.text || "", // Optional plain text fallback
      });
      console.log(`Message sent: ${info.response}`);
    } catch (error) {
      console.error(`Error sending email: ${error.message}`);
    }
  }

  // Method to send an email using a template
  async sendEmailWithTemplate(email, data) {
    try {
      // Read and compile the template
      const templateSource = await this.readTemplateFile();
      const emailTemplate = handlebars.compile(templateSource);

      const info = await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: data.subject,
        html: emailTemplate({
          PlatformName: "Express Template",
          Username: data.username,
          title: "Welcome Email",
        }),
      });

      console.log(`Message sent: ${info.response}`);
    } catch (error) {
      console.error(`Error sending email with template: ${error.message}`);
    }
  }
}

module.exports = new EmailService();
