declare module '*.pug' {
  import { compileTemplate } from 'pug';

  declare const template: compileTemplate;

  export default template;
}
