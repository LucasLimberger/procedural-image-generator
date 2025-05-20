const STRINGS = {
  pt: {
    localeName: "Português",
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
    localeName: "English",
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
    localeName: "Español",
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

export default STRINGS;

export type SupportedLocale = keyof typeof STRINGS;
export const SUPPORTED_LOCALES = Object.keys(
  STRINGS
) as readonly SupportedLocale[];
export const DEFAULT_LOCALE: SupportedLocale = "pt";
