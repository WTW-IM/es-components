/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import viaTheme from 'es-components-via-theme';
import ReactDOM from 'react-dom';
import Spinner from './components/base/spinner/Spinner';
import FullColorIcon from './components/base/icons/FullColorIcon';

const iconsListUrl =
  'https://bdaim-webexcdn-p.azureedge.net/es-assets?restype=directory&comp=list';

const OuterContainer = styled.div`
  text-align: center;
  width: 100%;
`;

const IconsContainer = styled.div`
  text-align: center;
  margin: 0 auto;
  display: grid;
  justify-items: center;
  max-width: 1200px;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: max-content;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
`;

const IconContainer = styled.div`
  justify-self: center;
  text-align: center;
`;

const SpinnerContainer = styled.div`
  margin: 0 auto;
  width: 100px;
`;

function DisplayFCIcon({ name }) {
  return (
    <IconContainer>
      <FullColorIcon name={name} size={100} css={{ margin: '0 auto' }} />
      <div css={{ marginTop: 10 }}>{name}</div>
    </IconContainer>
  );
}

DisplayFCIcon.propTypes = {
  name: PropTypes.string.isRequired
};

function FullColorIconsApp() {
  const [icons, setIcons] = useState([]);
  useEffect(() => {
    const getIcons = async () => {
      const iconsText = await (await fetch(iconsListUrl)).text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(iconsText, 'text/xml');
      const foundIcons = [...xmlDoc.getElementsByTagName('Blob')]
        .filter(blob => {
          const nameTag = blob.getElementsByTagName('Name');
          const name = nameTag[0].textContent;
          return name.includes('full-color-icons');
        })
        .map(blob => {
          const fullName = blob.getElementsByTagName('Name')[0].textContent;
          return fullName.match(/full-color-icons\/(.*)\.svg/)[1];
        });
      setIcons(foundIcons);
    };
    getIcons();
  }, []);
  return (
    <OuterContainer>
      {icons.length ? (
        <IconsContainer>
          {icons.map(name => (
            <DisplayFCIcon name={name} key={name} />
          ))}
        </IconsContainer>
      ) : (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}
    </OuterContainer>
  );
}

ReactDOM.render(
  <ThemeProvider theme={viaTheme}>
    <FullColorIconsApp />
  </ThemeProvider>,
  document.getElementById('mount')
);
