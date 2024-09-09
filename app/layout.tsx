'use client';
import { useRef, useCallback } from 'react';
import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import '@/app/ui/_global.scss';
import 'devextreme/dist/css/dx.light.css';
import Button from 'devextreme-react/button';
import themes from 'devextreme/ui/themes';
import ThemeProvider from './component/ThemeProvider';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const button = useRef(null);

  const changeTheme = useCallback(() => {
    themes.ready(() => {
      button.current.instance().repaint();
    });
    themes.current('dx.material.blue.dark');
    // themes.current('generic.light');
    // themes.current('generic.dark');
  }, []);

  return (
    <html lang="en">
      <head>
        <script src="https://unpkg.com/@rdkit/rdkit/Code/MinimalLib/dist/RDKit_minimal.js"></script>
        <script type="module" src="/build/chemuix.esm.js"></script>
        <script nomodule src="/build/chemuix.js"></script>
        <link
          rel="dx-theme"
          data-theme="material.blue.light"
          href="/dx.material.blue.light.css"
          data-active="false"
        />
        <link
          rel="dx-theme"
          data-theme="material.blue.dark"
          href="/dx.material.blue.dark.css"
          data-active="true"
        />
        <link
          rel="dx-theme"
          data-theme="material.teal.light"
          href="/dx.material.teal.light.css"
          data-active="false"
        />
        <link
          rel="dx-theme"
          data-theme="material.custom-scheme3"
          href="/dx.material.custom-scheme3.css"
          data-active="false"
        />
      </head>
      <body className={`${inter.className} dx-viewport antialiased`}>
        <div>
          <Button ref={button} text="Change Theme" onClick={changeTheme} />
          <ThemeProvider />
          {children}
        </div>
      </body>
    </html>
  );
}
