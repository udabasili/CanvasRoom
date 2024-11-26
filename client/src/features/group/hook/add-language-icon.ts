import { useMemo } from 'react';

type Language =
  | 'javascript'
  | 'cpp'
  | 'html'
  | 'java'
  | 'json'
  | 'lezer'
  | 'markdown'
  | 'php'
  | 'python'
  | 'rust'
  | 'sql'
  | 'xml'
  | 'css'
  | 'sass'
  | 'clojure'
  | 'clike';

type iconMapping = {
  [key in Language]: string;
};

export const addIconToLanguage = (language: Language) => {
  const iconMapping: iconMapping = {
    javascript: 'fa-js',
    cpp: 'fa-cplusplus',
    html: 'fa-html5',
    java: 'fa-java',
    json: 'fa-database',
    lezer: 'fa-code',
    markdown: 'fa-markdown',
    php: 'fa-php',
    python: 'fa-python',
    rust: 'fa-rust',
    sql: 'fa-database',
    xml: 'fa-file-code',
    css: 'fa-css3',
    sass: 'fa-sass',
    clojure: 'fa-code',
    clike: 'fa-code',
  };

  const icon = useMemo(() => {
    return iconMapping[language];
  }, [language]);

  return icon;
};
