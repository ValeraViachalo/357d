// getLanguageContent.js
export function useLanguageContent(content, lang, defaultLang = 'en') {
  if (!content || typeof content !== 'object') {
    console.warn('Invalid content provided to getLanguageContent');
    return null;
  }

  if (content[lang]) {
    return content[lang];
  }

  if (content[defaultLang]) {
    console.warn(`Language '${lang}' not found, falling back to '${defaultLang}'`);
    return content[defaultLang];
  }

  const availableLanguages = Object.keys(content);
  if (availableLanguages.length > 0) {
    console.warn(`Neither '${lang}' nor '${defaultLang}' found, using '${availableLanguages[0]}'`);
    return content[availableLanguages[0]];
  }

  return null;
}