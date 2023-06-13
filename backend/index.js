const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();
app.use(cors());


const uri = require('./config')
app.use(express.json())

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const contactSchema = new mongoose.Schema({
  email: String,
  phoneNumber: String,
});
const Contact = mongoose.model('Contact', contactSchema);


app.post('/upload', async (req, res) => {
  try {
    const { email, phone } = req.body;
    console.log(req.body)
    const contact = new Contact({
      email : req.body.email,
      phoneNumber:req.body.phone

    })
    contact.save()

    /////// emal implementation
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: '',
    //     pass: '',
    //   },
    // });

    // const mailOptions = {
    //   from: '',
    //   to: '',
    //   subject: 'New Contact Form Submission',
    //   text: `Email: ${email}\nPhone: ${phone}`,
    // };

    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     console.error(error);
    //     res.status(500).send('Error sending email');
    //   } else {
    //     console.log('Email sent: ' + info.response);
    //     res.send('Email sent successfully');
    //   }
    // });
    res.status(200).json("done");
  } catch (error) {
    console.error('Error uploading information:', error);
    res.status(500).json({ error: 'Failed to upload information' });
  }
});

// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
