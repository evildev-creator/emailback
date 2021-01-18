const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true, // use TLS
  auth: {
    user: "support@gunstopshop.com",
    pass: "evildev450!"
  }
})

const send = ({ email, name, mes }) => {
 fom = name && email ? `${name} <${email}>` : `${name || email}`
  const message = {
    from:"support@gunstopshop.com",
    to: "support@gunstopshop.com",
    subject: `New message from ${fom}`,
    html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${mes}</p>`,
    replyTo: fom,
    
  }

  return new Promise((resolve, reject) => {
    transporter.sendMail(message, (error, info) =>
      error ? reject(error) : resolve(info)
    )
  })
}

module.exports = send