/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { StyleSheetManager, useTheme, ThemeProvider } from 'styled-components';
import beautify from 'js-beautify';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import css from 'react-syntax-highlighter/dist/esm/languages/hljs/css';
import forest from 'react-syntax-highlighter/dist/esm/styles/hljs/atelier-forest-light';
import GlobalStyleDefaults from './GlobalStyleDefaults';
import Drawer from '../../containers/drawer/Drawer';

SyntaxHighlighter.registerLanguage('css', css);

export default function GlobalStyleDefaultsExample() {
  const [syntaxRef, setSyntaxRef] = useState<HTMLTemplateElement | null>(null);
  const [rawCssString, setRawCssString] = useState('');
  const [cssString, setCssString] = useState('');
  const [instruction, setInstruction] = useState('Loading...');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (!syntaxRef?.content) {
      return;
    }
    const setRaw = () =>
      setRawCssString(
        syntaxRef.content.querySelector('style')?.innerHTML || ''
      );
    const observer = new MutationObserver(setRaw);
    observer.observe(syntaxRef.content, { childList: true });
    setRaw();

    return () => {
      observer.disconnect();
    };
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

  useEffect(() => {
    if (cssString) {
      setInstruction('Open drawer to see CSS.');
      return;
    }

    setInstruction('Loading...');
  }, [cssString]);

  useEffect(() => {
    const openingString = 'CSS drawer opening...';
    if (drawerOpen) {
      setInstruction(openingString);
      setTimeout(() => {
        setInstruction(old => (old === openingString ? 'See CSS below.' : old));
      }, 500);
    }
  }, [drawerOpen]);

  return (
    <StyleSheetManager
      target={(syntaxRef?.content as ShadowRoot | null) || undefined}
      disableCSSOMInjection
      disableVendorPrefixes
    >
      <ThemeProvider theme={theme}>
        <template id="global-style-syntax" ref={setSyntaxRef} />
        <GlobalStyleDefaults />
        <h3>{instruction}</h3>
        <Drawer
          onActiveKeysChanged={keys => {
            setDrawerOpen(Boolean(keys.length));
          }}
        >
          <Drawer.Panel title="Global Style Defaults:">
            {drawerOpen ? (
              <SyntaxHighlighter
                language="css"
                style={forest}
                showLineNumbers
                lineNumberStyle={{
                  minWidth: '2.5em',
                  borderRight: '4px darkgray solid',
                  borderBottom: '1px darkgray solid',
                  padding: '0 0.5em',
                  marginRight: '1em',
                  lineHeight: '1.5em',
                  background: 'rgba(0, 0, 0, 0.05)'
                }}
              >
                {cssString}
              </SyntaxHighlighter>
            ) : (
              <></>
            )}
          </Drawer.Panel>
        </Drawer>
      </ThemeProvider>
    </StyleSheetManager>
  );
}
