const APP_STRINGS_BY_LANGUAGE = {
  pt: {
    languageName: "Português",
    title: "Gerador de Imagem por Função de Onda",
    playButtonDescription: "Iniciar",
    pauseButtonDescription: "Pausar",
    rerunButtonDescription: "Reiniciar",
    skipAnimationSettingName: "Pular Animação",
    gridWidthSettingName: "Largura da grade",
    gridWidthSettingLabel: "Largura",
    gridHeightSettingName: "Altura da grade",
    gridHeightSettingLabel: "Altura",
    openImageDescription: "Abrir como uma imagem",
    tilesetChangeLabel: "Mudar conjunto de imagens",
  },
  en: {
    languageName: "English",
    title: "Image Generator by Wave Function",
    playButtonDescription: "Start",
    pauseButtonDescription: "Pause",
    rerunButtonDescription: "Restart",
    skipAnimationSettingName: "Skip Animation",
    gridWidthSettingName: "Grid Width",
    gridWidthSettingLabel: "Width",
    gridHeightSettingName: "Grid height",
    gridHeightSettingLabel: "Height",
    openImageDescription: "Open as an image",
    tilesetChangeLabel: "Change tileset",
  },
  es: {
    languageName: "Español",
    title: "Generador de Imágenes por Función de Onda",
    playButtonDescription: "Comenzar",
    pauseButtonDescription: "Pausar",
    rerunButtonDescription: "Reanudar",
    skipAnimationSettingName: "Saltar animación",
    gridWidthSettingName: "La anchura de la cuadrícula",
    gridWidthSettingLabel: "Anchura",
    gridHeightSettingName: "La altura de la cuadrícula",
    gridHeightSettingLabel: "Altura",
    openImageDescription: "Abrir como una imagen",
    tilesetChangeLabel: "Cambiar conjunto de imágenes",
  },
} as const;

export type SupportedLanguage = keyof typeof APP_STRINGS_BY_LANGUAGE;

export const DEFAULT_LANGUAGE: SupportedLanguage = "pt";
export const SUPPORTED_LANGUAGES = Object.keys(
  APP_STRINGS_BY_LANGUAGE,
) as readonly SupportedLanguage[];

export function getLanguageStringsFor(language: SupportedLanguage) {
  return APP_STRINGS_BY_LANGUAGE[language];
}
