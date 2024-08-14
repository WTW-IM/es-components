import React, { useEffect, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { useVirtualizer, useWindowVirtualizer } from '@tanstack/react-virtual';
import viaTheme from 'es-components-via-theme';
import ReactDOM from 'react-dom/client';
import Spinner from './components/base/spinner/Spinner';
import FullColorIcon from './components/base/icons/FullColorIcon';

const iconsListUrl = `${ASSETS_PATH}?restype=container&comp=list`;

const OuterContainer = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
`;

const IconsContainer = styled.div`
  display: block;
  margin-bottom: 40px;
  margin: 0 auto;
  max-width: 1200px;
  width: 90%;
  overflow: hidden;
  position: relative;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
`;

const SpinnerContainer = styled.div`
  margin: 0 auto;
  width: 100px;
`;

const HighlightSpan = styled.span`
  background-color: rgba(113, 194, 255, 0.65);
`;

function DisplayName({
  name = '',
  highlight
}: {
  name?: string;
  highlight?: string;
}) {
  const [highlightStart, setHighlightStart] = useState(
    highlight ? name?.indexOf(highlight) || -1 : -1
  );

  const values = useMemo(() => {
    if (!highlight || highlightStart < 0) return { pre: '', post: '' };

    const highlightEnd = highlightStart + highlight.length;
    const pre = highlightStart > 0 ? name.substring(0, highlightStart) : '';
    const post =
      highlightEnd >= name.length ? '' : name.substring(highlightEnd);
    return { pre, post };
  }, [name, highlight, highlightStart]);

  useEffect(() => {
    setHighlightStart(highlight ? name.indexOf(highlight) : -1);
  }, [name, highlight]);

  if (!highlight?.length || highlightStart < 0) return name;

  return (
    <div style={{ marginTop: 10 }}>
      {values.pre}
      <HighlightSpan>{highlight}</HighlightSpan>
      {values.post}
    </div>
  );
}

DisplayName.propTypes = {
  name: PropTypes.string.isRequired,
  highlight: PropTypes.string.isRequired
};

type FCIconDisplayProps = Override<
  JSXElementProps<'div'>,
  {
    name: string;
    highlight?: string;
  }
>;

function DisplayFCIcon({ name, highlight, ...props }: FCIconDisplayProps) {
  return (
    <IconContainer {...props}>
      <FullColorIcon name={name} size={100} style={{ margin: '0 auto' }} />
      <DisplayName name={name} highlight={highlight} />
    </IconContainer>
  );
}

DisplayFCIcon.propTypes = {
  name: PropTypes.string.isRequired,
  highlight: PropTypes.string.isRequired
};

function FullColorIconsApp() {
  const [icons, setIcons] = useState<string[]>([]);
  const [filteredIcons, setFilteredIcons] = useState<string[]>(icons);
  const [iconsContainerRef, setIconsContainerRef] =
    useState<HTMLDivElement | null>(null);

  const [numCols, setNumCols] = useState(0);
  const [numRows, setNumRows] = useState(0);
  const [colWidth, setColWidth] = useState(0);

  const resetSizes = useCallback(() => {
    if (!iconsContainerRef) return;

    const newCols = Math.floor(iconsContainerRef.clientWidth / 180);
    setNumCols(newCols);
    setNumRows(Math.ceil(filteredIcons.length / newCols));
    setColWidth(Math.floor(iconsContainerRef.clientWidth / (newCols || 1)));
  }, [iconsContainerRef, filteredIcons.length]);

  useEffect(() => {
    resetSizes();

    window.addEventListener('resize', resetSizes);
    return () => window.removeEventListener('resize', resetSizes);
  }, [resetSizes]);

  const rowVirtualizer = useWindowVirtualizer({
    count: numRows,
    estimateSize: () => 140,
    overscan: 20,
    paddingStart: 70,
    paddingEnd: 70
  });

  const colVirtualizer = useVirtualizer({
    count: numCols,
    estimateSize: () => colWidth,
    getScrollElement: () => iconsContainerRef,
    horizontal: true
  });

  const [iconFilter, setIconFilter] = useState('');
  const [debouncedSetFilter] = useState(() => {
    let running = false;
    let targetValue = '';
    const setValue = (value: string) => {
      targetValue = value;
      if (running) return;

      running = true;
      requestAnimationFrame(() => {
        setIconFilter(targetValue);
        running = false;
      });
    };

    return setValue;
  });

  const filterVisible = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => debouncedSetFilter(value),
    [debouncedSetFilter]
  );

  useEffect(() => {
    const getIcons = async () => {
      const iconsResponse = await fetch(iconsListUrl);
      const iconsText = await iconsResponse.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(iconsText, 'text/xml');
      const foundIcons = [...xmlDoc.getElementsByTagName('Blob')]
        .map<string | null>(
          blob => blob.getElementsByTagName('Name')[0].textContent
        )
        .filter((name): name is string => Boolean(name))
        .filter(name => name.includes('full-color-icons'))
        .filter(name => Boolean(name.match(/svg$/)))
        .map(fullName => fullName?.match(/full-color-icons\/(.*)\.svg/)?.[1])
        .filter((fullName): fullName is string => Boolean(fullName));

      setIcons(foundIcons);
    };
    void getIcons();
  }, []);

  useEffect(() => {
    setFilteredIcons(() =>
      !iconFilter ? icons : icons.filter(name => name.includes(iconFilter))
    );
  }, [icons, iconFilter]);

  return (
    <OuterContainer>
      {icons.length ? (
        <>
          <div style={{ marginBottom: 40 }}>
            <label htmlFor="filter">
              <h2>Filter Icons:</h2>
              <input
                style={{ marginLeft: 10 }}
                id="filter"
                onChange={filterVisible}
                type="text"
              />
            </label>
          </div>
          <IconsContainer
            ref={setIconsContainerRef}
            style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
          >
            {rowVirtualizer.getVirtualItems().map(vRow =>
              colVirtualizer.getVirtualItems().map(vCol => {
                const name = filteredIcons[vRow.index * numCols + vCol.index];
                return !name ? (
                  <></>
                ) : (
                  <DisplayFCIcon
                    name={name}
                    highlight={iconFilter}
                    key={name}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: `${vCol.size}px`,
                      transform: `translateX(${vCol.start}px) translateY(${vRow.start}px)`
                    }}
                  />
                );
              })
            )}
          </IconsContainer>
        </>
      ) : (
        <SpinnerContainer>
          <Spinner title="Loading full-color icons..." />
        </SpinnerContainer>
      )}
    </OuterContainer>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('mount') as HTMLElement
);
root.render(
  <ThemeProvider theme={viaTheme}>
    <FullColorIconsApp />
  </ThemeProvider>
);
