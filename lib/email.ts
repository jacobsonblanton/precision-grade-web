import { Order } from './types';

const NOTIFY_EMAILS = [
  process.env.NOTIFY_EMAIL_1 ?? 'jacobblanton32@yahoo.com',
  process.env.NOTIFY_EMAIL_2 ?? 'rscott@lbxco.com',
  process.env.NOTIFY_EMAIL_3 ?? 'jpiekema@lbxco.com',
];

function buildCsv(order: Order): string {
  return order.items
    .map((item) => `${item.trimblePartNumber ?? item.partNumber ?? item.name},${item.quantity}`)
    .join('\n');
}

function buildEmailHtml(order: Order): string {
  const rows = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;color:#e5e5e5;">${item.name}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;color:#e5e5e5;font-family:monospace;">${item.trimblePartNumber ?? item.partNumber ?? '—'}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;color:#e5e5e5;text-align:center;">${item.quantity}</td>
      </tr>`,
    )
    .join('');

  return `
    <div style="font-family:Inter,sans-serif;background:#0a0a0a;padding:32px;max-width:640px;margin:0 auto;border-radius:12px;border:1px solid #1e1e1e;">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;">
        <div style="background:#cc0000;border-radius:8px;padding:8px;display:inline-block;">
          <span style="color:white;font-weight:900;font-size:14px;">LBX</span>
        </div>
        <div>
          <p style="margin:0;color:#cc0000;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;">Precision Grade</p>
          <p style="margin:0;color:white;font-size:16px;font-weight:900;">New Order Received</p>
        </div>
      </div>

      <div style="background:#111111;border-radius:8px;padding:16px;margin-bottom:20px;border:1px solid #1e1e1e;">
        <p style="margin:0 0 4px;color:#737373;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Order Number</p>
        <p style="margin:0;color:#cc0000;font-size:20px;font-weight:900;">${order.orderNumber}</p>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;">
        <div style="background:#111111;border-radius:8px;padding:16px;border:1px solid #1e1e1e;">
          <p style="margin:0 0 4px;color:#737373;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Dealer</p>
          <p style="margin:0;color:white;font-weight:600;">${order.dealerName}</p>
          ${order.dealerOrgNo ? `<p style="margin:4px 0 0;color:#737373;font-size:12px;">Org #${order.dealerOrgNo}</p>` : ''}
        </div>
        <div style="background:#111111;border-radius:8px;padding:16px;border:1px solid #1e1e1e;">
          <p style="margin:0 0 4px;color:#737373;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Date</p>
          <p style="margin:0;color:white;font-weight:600;">${new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
      </div>

      <table style="width:100%;border-collapse:collapse;background:#111111;border-radius:8px;overflow:hidden;border:1px solid #1e1e1e;margin-bottom:20px;">
        <thead>
          <tr style="background:#1a1a1a;">
            <th style="padding:10px 12px;text-align:left;color:#737373;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;">Item</th>
            <th style="padding:10px 12px;text-align:left;color:#737373;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;">Trimble Part #</th>
            <th style="padding:10px 12px;text-align:center;color:#737373;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;">Qty</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>

      ${order.notes ? `<div style="background:#111111;border-radius:8px;padding:16px;border:1px solid #1e1e1e;margin-bottom:20px;"><p style="margin:0 0 4px;color:#737373;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Notes</p><p style="margin:0;color:#e5e5e5;font-size:14px;">${order.notes}</p></div>` : ''}

      <p style="margin:0;color:#525252;font-size:12px;text-align:center;">LBX Company · Precision Grade Systems</p>
    </div>
  `;
}

export async function sendOrderEmail(order: Order): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[email] RESEND_API_KEY not set — skipping email');
    return;
  }

  const csv = buildCsv(order);
  const csvBase64 = Buffer.from(csv).toString('base64');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM ?? 'orders@precisiongrade.lbxco.com',
      to: NOTIFY_EMAILS,
      subject: `New Order ${order.orderNumber} — ${order.dealerName}`,
      html: buildEmailHtml(order),
      attachments: [
        {
          filename: `${order.orderNumber}.csv`,
          content: csvBase64,
        },
      ],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend error ${res.status}: ${body}`);
  }
}
