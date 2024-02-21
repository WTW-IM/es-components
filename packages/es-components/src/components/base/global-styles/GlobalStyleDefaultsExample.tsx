/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { StyleSheetManager, useTheme, ThemeProvider } from 'styled-components';
import beautify from 'js-beautify';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import css from 'react-syntax-highlighter/dist/esm/languages/hljs/css';
import forest from 'react-syntax-highlighter/dist/esm/styles/hljs/atelier-forest-light';
import GlobalStyleDefaults from './GlobalStyleDefaults';

SyntaxHighlighter.registerLanguage('css', css);

export default function GlobalStyleDefaultsExample() {
  const [syntaxRef, setSyntaxRef] = useState<HTMLTemplateElement | null>(null);
  const [rawCssString, setRawCssString] = useState('');
  const [cssString, setCssString] = useState('');
  const theme = useTheme();

  useEffect(() => {
    const setRaw = () =>
      setRawCssString(
        (syntaxRef?.firstElementChild as HTMLElement | undefined)?.innerHTML ||
          ''
      );
    const intrvl = setInterval(setRaw, 1000 / 30);
    setRaw();

    return () => clearInterval(intrvl);
  }, [syntaxRef]);

  useEffect(() => {
    setCssString(
      beautify.css(rawCssString, {
        indent_size: 4,
        indent_char: ' ',
        max_preserve_newlines: 5,
        preserve_newlines: true,
        end_with_newline: false,
        wrap_line_length: 0,
        indent_empty_lines: false
      })
    );
  }, [rawCssString]);

  return (
    <StyleSheetManager target={syntaxRef || undefined} disableCSSOMInjection>
      <ThemeProvider theme={theme}>
        <template id="global-style-syntax" ref={setSyntaxRef} />
        <GlobalStyleDefaults />
        <SyntaxHighlighter language="css" style={forest}>
          {cssString}
        </SyntaxHighlighter>
      </ThemeProvider>
    </StyleSheetManager>
  );
}
