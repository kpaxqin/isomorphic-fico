import React from 'react';
import _ from 'lodash';



function renderJs(assets) {
  return _.flatten(assets).map(function (path) {
    return path.endsWith('.js') && <script key={path} src={path} />;
  })
}

function renderCss(assets) {
  return _.flatten(assets).map(function (path) {
    return path.endsWith('.css') && (
        <link key={path} href={path} rel="stylesheet" />
    );
  })
}


const Layout = props=> {
  return (
    <html>
      <head>
        <meta charSet='utf-8' />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, minimal-ui'
        />
        <meta
          name='apple-mobile-web-app-status-bar-style'
          content='black-translucent'
        />
        <meta content='black' name='apple-mobile-web-app-status-bar-style' />
        <title>{props.title}</title>
        <meta name='description' content={props.description} />
        <meta name='keywords' content={props.keywords} />
        {renderCss(props.assets.app)}
      </head>
      <body>
      <div id='app' dangerouslySetInnerHTML={{ __html: props.content }} />
      <div id='modal' />
      <script
        dangerouslySetInnerHTML={{
          __html: `
              (function() {
                window.__FICO_STATE__ = ${JSON.stringify(props.initialState)}
              })()
            `
        }}
      />
      {
        renderJs([props.assets.commons, props.assets.vendor, props.assets.app])
      }
      </body>
    </html>
  )
}

export default Layout;
