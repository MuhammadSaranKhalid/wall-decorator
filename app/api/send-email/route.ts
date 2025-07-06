import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend("re_SJN1td1e_A8sL2KWhqstxYAr2jn8rjY2p")

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { requestId, name, email, phone, description, timeline, files } = body

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Customize Request</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2E2C2A 0%, #4A3F35 100%); color: white; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #2E2C2A; }
            .value { margin-top: 5px; }
            .files { margin-top: 10px; }
            .file-link { display: block; color: #4A3F35; text-decoration: none; margin: 5px 0; }
            .file-link:hover { text-decoration: underline; }
            .footer { background: #2E2C2A; color: white; padding: 15px; text-align: center; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Customize Request</h1>
              <p>Request ID: ${requestId}</p>
            </div>
            
            <div class="content">
              <div class="field">
                <div class="label">Customer Name:</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${email}</div>
              </div>
              
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value">${phone}</div>
              </div>
              
              <div class="field">
                <div class="label">Timeline:</div>
                <div class="value">${timeline}</div>
              </div>
              
              <div class="field">
                <div class="label">Design Description:</div>
                <div class="value">${description}</div>
              </div>
              
              ${
                files && files.length > 0
                  ? `
                <div class="field">
                  <div class="label">Uploaded Files:</div>
                  <div class="files">
                    ${files
                      .map(
                        (url: string) => `
                      <a href="${url}" class="file-link" target="_blank">View File</a>
                    `,
                      )
                      .join("")}
                  </div>
                </div>
              `
                  : ""
              }
            </div>
            
            <div class="footer">
              <p>Wall Decorator - Custom Design Request</p>
              <p>Received on ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </body>
      </html>
    `

    await resend.emails.send({
      from: "Wall Decorator <noreply@walldecorator.store>",
      to: ["customize@walldecorator.store"],
      subject: `New Customize Request from ${name}`,
      html: emailHtml,
    })

    return NextResponse.json({ success: true, message: "Email sent successfully" })
  } catch (error) {
    console.error("Email sending error:", error)
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 })
  }
}
