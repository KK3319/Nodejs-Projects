var nodemailer=require('nodemailer');
 var transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'kedar3319@example.com',
        pass:'kedar22246'
    }
 });

 var mailOptions={
    from:'kedar3319@gmail.com',
    to:'kedar3319@gmail.com',
    subject:"This came from Nodejs",
    text:'Keep going'
 };
 transporter.sendMail(mailOptions,function(err,info){
    if(err){
        console.log(err);
    }else{
        console.log("Email Sent")
    }

 });
