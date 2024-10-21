const locales: Record<
  string,
  () => Promise<{ default: Record<string, string> }>
> = {
  tr: () => import('../../public/locales/tr/common.json'),
  en: () => import('../../public/locales/en/common.json'),
}

export const getLocales = async (locale: string) => locales[locale]()
