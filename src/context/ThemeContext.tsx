import React, { createContext, useContext, useMemo } from 'react';
import type { ThemePayload } from '../types/schema';

/**
 * ThemeContext
 * ------------
 * Requirement B (OTA Runtime Theming Injection): the server payload's
 * `theme` block (and, during a live campaign, the campaign's theme override)
 * is mapped here once at the root and sampled by every nested child —
 * buttons, headers, borders — without prop-drilling.
 */

const DEFAULT_THEME: Required<ThemePayload> = {
  primary: '#FF9933',
  background: '#FFF5E6',
  accent: '#2E7D32',
  textPrimary: '#1A1A1A',
  textOnPrimary: '#FFFFFF',
  cardBackground: '#FFFFFF',
};

const ThemeContext = createContext<Required<ThemePayload>>(DEFAULT_THEME);

export const useTheme = (): Required<ThemePayload> => useContext(ThemeContext);

interface ThemeProviderProps {
  theme: ThemePayload;
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme, children }) => {
  const merged = useMemo<Required<ThemePayload>>(
    () => ({
      primary: theme.primary ?? DEFAULT_THEME.primary,
      background: theme.background ?? DEFAULT_THEME.background,
      accent: theme.accent ?? DEFAULT_THEME.accent,
      textPrimary: theme.textPrimary ?? DEFAULT_THEME.textPrimary,
      textOnPrimary: theme.textOnPrimary ?? DEFAULT_THEME.textOnPrimary,
      cardBackground: theme.cardBackground ?? DEFAULT_THEME.cardBackground,
    }),
    [theme.primary, theme.background, theme.accent, theme.textPrimary, theme.textOnPrimary, theme.cardBackground]
  );

  return <ThemeContext.Provider value={merged}>{children}</ThemeContext.Provider>;
};
