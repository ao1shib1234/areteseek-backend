'use strict';

const { Resend } = require('resend');

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildHtml(data) {
  const { name, email, product, comments, sourceUrl } = data;
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #20427D; border-bottom: 2px solid #20427D; padding-bottom: 8px;">
        New Product Enquiry
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr>
          <td style="padding: 8px; background: #f5f8ff; font-weight: bold; width: 120px;">Name</td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background: #f5f8ff; font-weight: bold;">Email</td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">
            <a href="mailto:${escapeHtml(email)}" style="color: #0C4DA2;">${escapeHtml(email)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px; background: #f5f8ff; font-weight: bold;">Product</td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${escapeHtml(product) || '(not specified)'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background: #f5f8ff; font-weight: bold; vertical-align: top;">Comments</td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; white-space: pre-wrap;">${escapeHtml(comments)}</td>
        </tr>
        ${sourceUrl ? `
        <tr>
          <td style="padding: 8px; background: #f5f8ff; font-weight: bold;">Source</td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-size: 12px; color: #585858;">
            ${escapeHtml(sourceUrl)}
          </td>
        </tr>
        ` : ''}
      </table>
      <p style="margin-top: 24px; font-size: 12px; color: #888;">
        This enquiry was submitted via the website contact form.
      </p>
    </div>
  `;
}

module.exports = {
  async afterCreate(event) {
    const { result } = event;

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      strapi.log.warn('[enquiry] RESEND_API_KEY not set; skipping email notification');
      return;
    }

    const fromAddress = process.env.RESEND_FROM || 'onboarding@resend.dev';
    const recipientsRaw = process.env.ENQUIRY_NOTIFY_TO || '';
    const recipients = recipientsRaw.split(',').map(s => s.trim()).filter(Boolean);

    if (recipients.length === 0) {
      strapi.log.warn('[enquiry] ENQUIRY_NOTIFY_TO not set; skipping email notification');
      return;
    }

    try {
      const resend = new Resend(apiKey);
      const subject = `New Enquiry: ${result.product || 'Product'} — ${result.name}`;

      await resend.emails.send({
        from: fromAddress,
        to: recipients,
        replyTo: result.email,
        subject,
        html: buildHtml(result),
      });

      await strapi.entityService.update('api::enquiry.enquiry', result.id, {
        data: { emailSent: true },
      });

      strapi.log.info(`[enquiry] notification email sent for enquiry #${result.id}`);
    } catch (err) {
      strapi.log.error(`[enquiry] failed to send notification email: ${err.message}`);
    }
  },
};
