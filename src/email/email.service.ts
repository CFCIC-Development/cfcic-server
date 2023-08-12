import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { AuthDto } from '../auth/dto';
import { AttendanceCreationDto } from 'src/attendance/attendance.types';

@Injectable()
export class EmailService {
  constructor(@InjectQueue('email') private readonly emailQueue: Queue) {}

  async sendSignUpCongratulatoryEmail(data: AuthDto): Promise<void> {
    const transporter = nodemailer.createTransport({
      // Configure your email transporter (SMTP, Gmail, etc.)
      // Example for using Gmail:
      host: 'mail.christfamilyministries.org', // Your SMTP server hostname
      port: 465, // Port for secure SMTP (587 is a common port for TLS)
      secure: true, // Use TLS (true for 465 port, false for other ports)
      auth: {
        user: 'events@christfamilyministries.org', // Your email address
        pass: 'Colo_3166', // Your email password
      },
    });

    const emailHtml = `
    <html>

    <head>
      <style>
        /* Your CSS styles for the email */
      </style>
    </head>
    
    <body>
      <div id=":1x4" class="a3s aiL msg-4777189770621954069">
        <div link="blue" vlink="#954F72" style="word-wrap:break-word" lang="EN-US">
          <div class="m_-4777189770621954069WordSection1">
            <p class="MsoNormal"><u></u>&nbsp;<u></u></p>
            <p class="MsoNormal" style="text-align:center" align="center"><span style="color:black">
            </span><b><i><span
                    style="font-family:&quot;Times New Roman&quot;,serif;color:black">Your sign up was
                    successful!!!</span></i></b><u></u><u></u></p>
            <p class="MsoNormal"><span style="font-size:12.0pt;font-family:&quot;Garamond&quot;,serif;color:black">Dear
                <b>${
                  data?.name || 'Attendee'
                }</b>,&nbsp;</span><u></u><u></u></p>
            <p class="MsoNormal"><span style="color:black"></span><u></u><u></u></p>
            <p style="margin-top:0in;line-height:18.0pt"><span
                style="font-size:12.0pt;font-family:&quot;Garamond&quot;,serif;color:black">And thank you for taking the
                time to register on&nbsp;<b>CFC&nbsp;App&nbsp;2023.</b>&nbsp;Your sign up was successful and
                we are elated. We are&nbsp;looking forward to having you around.&nbsp;It's
                going to be the best time of our lives yet and we are really excited at the transformation that you'll
                experience.</span><u></u><u></u></p>
            <p style="margin-top:0in;line-height:18.0pt"><span
                style="font-size:12.0pt;font-family:&quot;Garamond&quot;,serif;color:black">Kindly keep an eye out for our
                emails on further notifications and instructions. To avoid our mail going into your spam or promotions, do
                well to add our email to your contact list.&nbsp;You can also join the Telegram Channel (</span><span
                style="font-size:12.0pt"><a href="http://t.me/cfcic" target="_blank"
                  data-saferedirecturl="https://www.google.com/url?q=http://t.me/cfcic&amp;source=gmail&amp;ust=1691946521245000&amp;usg=AOvVaw0QKUhJu1r6vq_mHe5WHIn6"><span
                    style="font-family:&quot;Garamond&quot;,serif">t.me/cfcic</span></a></span><span
                style="font-size:12.0pt;font-family:&quot;Garamond&quot;,serif;color:black">) for quick notifications and
                messages.</span><u></u><u></u></p>
            <p style="margin-top:0in;line-height:18.0pt"><span style="font-size:12.0pt">&nbsp;</span><u></u><u></u></p>
            <p class="MsoNormal"><u></u><u></u></p>
            <p style="margin-top:0in;line-height:18.0pt"><span
                style="font-size:12.0pt;font-family:&quot;Garamond&quot;,serif;color:black">With all our
                Love,</span><u></u><u></u></p>
            <p style="margin-top:0in;line-height:18.0pt"><span
                style="font-size:12.0pt;font-family:&quot;Garamond&quot;,serif;color:black">Christ Family
                Ministry.</span><u></u><u></u></p>
            <p class="MsoNormal"><u></u>&nbsp;<u></u></p>
            <p class="MsoNormal"><u></u>&nbsp;<u></u></p>

          </div>
        </div>
      </div>
    </body>
    
    </html>    
    `;

    const mailOptions = {
      from: 'events@christfamilyministries.org', // Sender address
      to: data?.email, // Receiver address
      subject: 'Congratulations on Successful Sign Up',
      html: emailHtml,
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      console.log('Congratulatory email sent successfully');
    } catch (error) {
      console.error('Error sending congratulatory email:', error);
      throw new HttpException(
        'Failed to send email',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async sendEventCongratulatoryEmail(
    data: AttendanceCreationDto,
    attendance,
  ): Promise<void> {
    const transporter = nodemailer.createTransport({
      // Configure your email transporter (SMTP, Gmail, etc.)
      // Example for using Gmail:
      host: 'mail.christfamilyministries.org', // Your SMTP server hostname
      port: 465, // Port for secure SMTP (587 is a common port for TLS)
      secure: true, // Use TLS (true for 465 port, false for other ports)
      auth: {
        user: 'events@christfamilyministries.org', // Your email address
        pass: 'Colo_3166', // Your email password
      },
    });

    const emailHtml = `
    <html>

    <head>
      <style>
        /* Your CSS styles for the email */
      </style>
    </head>
    
    <body>
      <div id=":1x4" class="a3s aiL msg-4777189770621954069">
        <div link="blue" vlink="#954F72" style="word-wrap:break-word" lang="EN-US">
          <div class="m_-4777189770621954069WordSection1">
            <p class="MsoNormal"><u></u>&nbsp;<u></u></p>
            <p class="MsoNormal" style="text-align:center" align="center"><span style="color:black">
              </span><b><i><span style="font-family:&quot;Times New Roman&quot;,serif;color:black">Your registration was
                    successful!!!</span></i></b><u></u><u></u></p>
            <p class="MsoNormal"><span style="font-size:12.0pt;font-family:&quot;Garamond&quot;,serif;color:black">Dear
                <b>${
                  data?.user?.name || 'Attendee'
                }</b>,&nbsp;</span><u></u><u></u></p>
            <p class="MsoNormal"><span style="color:black"></span><u></u><u></u></p>
            <p style="margin-top:0in;line-height:18.0pt"><span
                style="font-size:12.0pt;font-family:&quot;Garamond&quot;,serif;color:black">And thank you for taking the
                time to register for&nbsp;<b>Faith&nbsp;Adventure&nbsp;2023.</b>&nbsp;Your registration was successful and
                we are elated. We are&nbsp;looking forward to hosting you live at the Theatre of Faith or Online.&nbsp;It's
                going to be the best time of our lives yet and we are really excited at the transformation that you'll
                experience.</span><u></u><u></u></p>
            <p style="margin-top:0in;line-height:18.0pt"><span
                style="font-size:12.0pt;font-family:&quot;Garamond&quot;,serif;color:black">If you’ll be attending onsite,
                upon arrival, you will be required to confirm your registration and receive your Welcome Package at the
                registration stand, kindly stop by!</span><u></u><u></u></p>
            <p style="margin-top:0in;line-height:18.0pt"><b><span
                  style="font-size:12.0pt;font-family:&quot;Garamond&quot;,serif;color:blue">Kindly find details of your
                  registration below:</span></b><u></u><u></u></p>
            <table cellpadding="0" border="0">
              <tbody>
                <tr>
                  <td style="padding:7.5pt 0in 7.5pt 0in">
                    <p class="MsoNormal" style="line-height:13.5pt"><span
                        style="font-size:11.5pt;font-family:&quot;Garamond&quot;,serif;color:black">Registration
                        Number:</span><u></u><u></u></p>
                  </td>
                  <td style="padding:7.5pt 0in 7.5pt 0in">
                    <p class="MsoNormal" style="line-height:13.5pt"><b><span
                          // style="font-size:11.5pt;font-family:&quot;Garamond&quot;,serif;color:black">${
                            attendance?.id
                          }</span></b><u></u><u></u>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:7.5pt 0in 7.5pt 0in">
                    <p class="MsoNormal" style="line-height:13.5pt"><span
                        style="font-size:11.5pt;font-family:&quot;Garamond&quot;,serif;color:black">Name:</span><u></u><u></u>
                    </p>
                  </td>
                  <td style="padding:7.5pt 0in 7.5pt 0in">
                    <p class="MsoNormal" style="line-height:13.5pt"><b><span
                          style="font-size:11.5pt;font-family:&quot;Garamond&quot;,serif;color:black">${
                            data?.user?.name || 'N/A'
                          }</span></b><u></u><u></u></p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:7.5pt 0in 7.5pt 0in">
                    <p class="MsoNormal"><span style="font-family:&quot;Garamond&quot;,serif">Phone:<u></u><u></u></span>
                    </p>
                  </td>
                  <td style="padding:7.5pt 0in 7.5pt 0in">
                    <p class="MsoNormal" style="line-height:13.5pt"><b><span
                          style="font-size:11.5pt;font-family:&quot;Garamond&quot;,serif;color:black">${
                            data?.user?.phone || 'N/A'
                          }</span></b><u></u><u></u>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:7.5pt 0in 7.5pt 0in">
                    <p class="MsoNormal" style="line-height:13.5pt"><span
                        style="font-size:11.5pt;font-family:&quot;Garamond&quot;,serif;color:black">Email:</span><u></u><u></u>
                    </p>
                  </td>
                  <td style="padding:7.5pt 0in 7.5pt 0in">
                    <p class="MsoNormal" style="line-height:13.5pt"><span style="font-size:11.5pt"><a
                          href="mailto:myesther97@gmailcom" target="_blank"><b><span
                              style="font-family:&quot;Garamond&quot;,serif;color:black">${
                                data?.user?.email
                              }</span></b></a></span><u></u><u></u>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:7.5pt 0in 7.5pt 0in">
                    <p class="MsoNormal" style="line-height:13.5pt"><span
                        style="font-size:11.5pt;font-family:&quot;Garamond&quot;,serif;color:black">Accommodation:</span><u></u><u></u>
                    </p>
                  </td>
                  <td style="padding:7.5pt 0in 7.5pt 0in">
                    <p class="MsoNormal" style="line-height:13.5pt"><b><span
                          style="font-size:11.5pt;font-family:&quot;Garamond&quot;,serif;color:black">${
                            data?.requires_accomodation ? 'Yes' : 'No'
                          }</span></b><u></u><u></u>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:7.5pt 0in 7.5pt 0in">
                    <p class="MsoNormal" style="line-height:13.5pt"><span
                        style="font-size:11.5pt;font-family:&quot;Garamond&quot;,serif;color:black">Feeding:</span><u></u><u></u>
                    </p>
                  </td>
                  <td style="padding:7.5pt 0in 7.5pt 0in">
                    <p class="MsoNormal" style="line-height:13.5pt"><b><span
                          style="font-size:11.5pt;font-family:&quot;Garamond&quot;,serif;color:black">${
                            data?.requires_feeding ? 'Yes' : 'No'
                          }</span></b><u></u><u></u>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:7.5pt 0in 7.5pt 0in">
                    <p class="MsoNormal" style="line-height:13.5pt"><span
                        style="font-size:11.5pt;font-family:&quot;Garamond&quot;,serif;color:black">Transportation:</span><u></u><u></u>
                    </p>
                  </td>
                  <td style="padding:7.5pt 0in 7.5pt 0in">
                    <p class="MsoNormal" style="line-height:13.5pt"><b><span
                          style="font-size:11.5pt;font-family:&quot;Garamond&quot;,serif;color:black">${
                            data?.requires_transport ? 'Yes' : 'No'
                          }</span></b><u></u><u></u>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:7.5pt 0in 7.5pt 0in">
                    <p class="MsoNormal" style="line-height:13.5pt"><span
                        style="font-size:11.5pt;font-family:&quot;Garamond&quot;,serif;color:black">Arrival
                        Date:</span><u></u><u></u></p>
                  </td>
                  <td style="padding:7.5pt 0in 7.5pt 0in">
                    <p class="MsoNormal" style="line-height:13.5pt"><b><span
                          style="font-size:11.5pt;font-family:&quot;Garamond&quot;,serif;color:black">${
                            data?.dates_attending.length > 0
                              ? new Date(data?.dates_attending[0])
                                  .toISOString()
                                  .split('T')[0]
                              : 'N/A'
                          }</span></b><u></u><u></u>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:7.5pt 0in 7.5pt 0in">
                    <p class="MsoNormal" style="line-height:13.5pt"><span
                        style="font-size:11.5pt;font-family:&quot;Garamond&quot;,serif;color:black">Departure
                        Date:</span><u></u><u></u></p>
                  </td>
                  <td style="padding:7.5pt 0in 7.5pt 0in">
                    <p class="MsoNormal" style="margin-bottom:12.0pt;line-height:13.5pt"><b><span
                          style="font-size:11.5pt;font-family:&quot;Garamond&quot;,serif;color:black">${
                            data?.dates_attending.length > 1
                              ? new Date(data?.dates_attending[1])
                                  .toISOString()
                                  .split('T')[0]
                              : 'N/A'
                          }</span></b><u></u><u></u>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <p style="margin-top:0in;line-height:18.0pt"><span
                style="font-size:12.0pt;font-family:&quot;Garamond&quot;,serif;color:black">Kindly keep an eye out for our
                emails on further notifications and instructions. To avoid our mail going into your spam or promotions, do
                well to add our email to your contact list.&nbsp;You can also join the Telegram Channel (</span><span
                style="font-size:12.0pt"><a href="http://t.me/cfcic" target="_blank"
                  data-saferedirecturl="https://www.google.com/url?q=http://t.me/cfcic&amp;source=gmail&amp;ust=1691946521245000&amp;usg=AOvVaw0QKUhJu1r6vq_mHe5WHIn6"><span
                    style="font-family:&quot;Garamond&quot;,serif">t.me/cfcic</span></a></span><span
                style="font-size:12.0pt;font-family:&quot;Garamond&quot;,serif;color:black">) for quick notifications and
                messages.</span><u></u><u></u></p>
            <p style="margin-top:0in;line-height:18.0pt"><span
                style="font-size:12.0pt;font-family:&quot;Garamond&quot;,serif;color:black">We look forward to hosting you,
                your friends and family at FA'23. If they haven’t registered, simply get them to register by sharing this
                link with them</span><u></u><u></u></p>
            <p style="margin-top:0in;line-height:18.0pt"><span
                style="font-size:12.0pt;font-family:&quot;Garamond&quot;,serif;color:black">
                <span
                style="font-size:12.0pt"><a href="https://app.christfamilyministries.org/" target="_blank"
                  data-saferedirecturl="https://www.google.com/url?q=http://t.me/cfcic&amp;source=gmail&amp;ust=1691946521245000&amp;usg=AOvVaw0QKUhJu1r6vq_mHe5WHIn6"><span
                    style="font-family:&quot;Garamond&quot;,serif">https://app.christfamilyministries.org/</span></a></span>
                </span><u></u><u></u></p>
            <p style="margin-top:0in;line-height:18.0pt"><span style="font-size:12.0pt">&nbsp;</span><u></u><u></u></p>
            <p class="MsoNormal"><u></u><u></u></p>
            <p style="margin-top:0in;line-height:18.0pt"><span
                style="font-size:12.0pt;font-family:&quot;Garamond&quot;,serif;color:black">With all our
                Love,</span><u></u><u></u></p>
            <p style="margin-top:0in;line-height:18.0pt"><span
                style="font-size:12.0pt;font-family:&quot;Garamond&quot;,serif;color:black">FA'23 Registration
                Team,</span><u></u><u></u></p>
            <p style="margin-top:0in;line-height:18.0pt"><span
                style="font-size:12.0pt;font-family:&quot;Garamond&quot;,serif;color:black">Christ Family
                Ministry.</span><u></u><u></u></p>
            <p class="MsoNormal"><u></u>&nbsp;<u></u></p>
            <p class="MsoNormal"><u></u>&nbsp;<u></u></p>
          </div>
        </div>
      </div>
    </body>
    
    </html>
    `;

    const mailOptions = {
      from: 'events@christfamilyministries.org', // Sender address
      to: data?.user?.email, // Receiver address
      subject: 'Congratulations on Successful Registration',
      html: emailHtml,
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      console.log('Congratulatory email sent successfully');
    } catch (error) {
      console.error('Error sending congratulatory email:', error);
      throw new HttpException(
        'Failed to send email',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
