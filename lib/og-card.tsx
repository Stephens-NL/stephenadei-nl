import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

const ogSize = { width: 1200, height: 630 };

const inter = (w: 400 | 700) => readFile(join(process.cwd(), 'lib/fonts', `Inter-${w}.ttf`));

// Text card: name, role line, domain. Inter on white, green accent. Content stays inside the central 1000x525.
export async function ogCard({ eyebrow, headline, line }: { eyebrow?: string; headline: string; line: string }) {
  const [regular, bold] = await Promise.all([inter(400), inter(700)]);
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 110px',
          background: '#ffffff',
          fontFamily: 'Inter',
          borderLeft: '24px solid #059669',
        }}
      >
        {eyebrow && (
          <div style={{ display: 'flex', fontSize: 32, fontWeight: 700, color: '#059669', marginBottom: 24 }}>{eyebrow}</div>
        )}
        <div style={{ display: 'flex', fontSize: eyebrow ? 72 : 96, fontWeight: 700, color: '#0f172a', lineHeight: 1.1 }}>
          {headline}
        </div>
        <div style={{ display: 'flex', fontSize: 38, color: '#334155', marginTop: 28 }}>{line}</div>
        <div style={{ display: 'flex', fontSize: 30, fontWeight: 700, color: '#059669', marginTop: 56 }}>stephenadei.nl</div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: 'Inter', data: regular, weight: 400, style: 'normal' },
        { name: 'Inter', data: bold, weight: 700, style: 'normal' },
      ],
    },
  );
}
