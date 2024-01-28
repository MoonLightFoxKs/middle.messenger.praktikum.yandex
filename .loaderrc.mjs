import pug from 'pug';

const pugLoader = {
  resolve: (specifier, options) => {
    const { href, pathname } = new URL(specifier, options.parentURL);

    if (pathname.endsWith('.pug')) {
      return {
        format: 'module',
        url: href,
      };
    }
  },

  format: (url, options) => {
    const { pathname } = new URL(url, options.parentURL);

    if (pathname.endsWith('.pug')) {
      return {
        format: 'module',
      };
    }
  },

  transform: (source, options) => {
    const { url } = options;
    const { pathname } = new URL(url);

    if (!pathname.endsWith('.pug')) {
      return;
    }

    const result = `
          ${pug.compileClient(String(source))};
          
          export default template;
          `;

    return { source: result };
  },
};

export default {
  loaders: [pugLoader, 'esm-loader-typescript', 'esm-loader-css'],
};
