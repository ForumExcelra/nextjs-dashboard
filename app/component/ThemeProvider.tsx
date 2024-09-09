'use client';
import { useState, useCallback, useEffect } from 'react';
import themes from 'devextreme/ui/themes';
import { SelectBox } from 'devextreme-react';
// import { useTheme } from 'next-themes';

export default function ThemeProvider() {
  const themeList = ['blue.light', 'blue.dark', 'teal.light', 'custom-scheme3'];
  const themeMarker = 'material.';
  const [theme, setTheme] = useState(themeList[0]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentTheme =
        localStorage.getItem('dx-theme') || 'material.blue.light';
      themes.current(currentTheme);
      setTheme(currentTheme.slice(currentTheme.indexOf('.') + 1));
    }
  }, []);
  //   const themeMarker = 'theme.';

  //   const { theme, resolvedTheme, setTheme } = useTheme();

  const onValueChanged = useCallback((accent) => {
    console.log('qwaccent', accent);
    const currentTheme = `${themeMarker}${accent}`;
    themes.current(currentTheme);
    setTheme(accent);
    localStorage.setItem('dx-theme', currentTheme);
  }, []);

  return (
    <div className="flex justify-end">
      <SelectBox
        dataSource={themeList}
        value={theme}
        // defaultValue={themeList[0]}
        onValueChange={onValueChanged}
      />
    </div>
  );
}
