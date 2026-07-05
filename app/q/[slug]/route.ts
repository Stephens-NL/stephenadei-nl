import { NextRequest, NextResponse } from 'next/server';
import { appendFile, mkdir } from 'fs/promises';
import links from '@/config/qr-links.json';

// QR redirect seam: go.stephenadei.nl/<slug> lands here (nginx rewrites to
// /q/<slug>). Printed QR codes never change — only this registry does.
export const dynamic = 'force-dynamic';

const SCAN_LOG_DIR = process.env.QR_SCAN_LOG_DIR || '/app/qr-data';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const target = (links as Record<string, string>)[params.slug];
  // fire-and-forget scan log; a full log dir must never break the redirect
  void (async () => {
    try {
      await mkdir(SCAN_LOG_DIR, { recursive: true });
      await appendFile(
        `${SCAN_LOG_DIR}/scans.jsonl`,
        JSON.stringify({
          ts: new Date().toISOString(),
          slug: params.slug,
          hit: Boolean(target),
          ua: req.headers.get('user-agent') ?? '',
          ref: req.headers.get('referer') ?? '',
        }) + '\n',
      );
    } catch { /* logging is best-effort */ }
  })();
  if (!target) return NextResponse.redirect('https://stephenadei.nl', 302);
  return NextResponse.redirect(target, 302);
}
