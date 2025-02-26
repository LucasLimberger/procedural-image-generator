const STRINGS = {
  pt: {
    localeName: "Português",
    title: "placeholder-pt-title",
    playButtonDescription: "Iniciar",
    pauseButtonDescription: "Pausar",
    rerunButtonDescription: "Reiniciar",
    skipAnimationSettingName: "Pular Animação",
    gridWidthSettingName: "Largura da grade",
    gridWidthSettingLabel: "Largura",
    gridHeightSettingName: "Altura da grade",
    gridHeightSettingLabel: "Altura",
  },
  en: {
    localeName: "English",
    title: "placeholder-en-title",
    playButtonDescription: "Start",
    pauseButtonDescription: "Pause",
    rerunButtonDescription: "Restart",
    skipAnimationSettingName: "Skip Animation",
    gridWidthSettingName: "Grid Width",
    gridWidthSettingLabel: "Width",
    gridHeightSettingName: "Grid height",
    gridHeightSettingLabel: "Height",
  },
} as const;

export default STRINGS;

export type SupportedLocale = keyof typeof STRINGS;
export const SUPPORTED_LOCALES = Object.keys(
  STRINGS
) as readonly SupportedLocale[];
export const DEFAULT_LOCALE: SupportedLocale = "pt";
