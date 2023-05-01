"use client";

// Import necessary dependencies from React library.
import { useEffect, useState } from "react";

/**
 * Theme-related components and hooks.
 *
 * @property {function} ThemeProvider - A component to provide the app's theme context to child components.
 * @property {function} useThemeContext - A hook to access the app's theme context object.
 */
import { ThemeProvider, useThemeContext } from "./ThemeProvider";

/**
 * FluentUI dependencies.
 *
 * @property {function} createDOMRenderer - A function to create a DOM renderer for Fluent UI.
 * @property {function} RendererProvider - A component to provide the renderer to Fluent UI components.
 * @property {function} FluentProvider - A component to provide a Fluent UI theme to child components.
 * @property {function} SSRProvider - A component to support server-side rendering.
 * @property {Object} webLightTheme - A Fluent UI light theme object.
 * @property {Object} webDarkTheme - A Fluent UI dark theme object.
 * @property {function} makeStyles - A function to create styles for Fluent UI components.
 * @property {Object} tokens - A collection of Fluent UI design tokens.
 */
import {
  createDOMRenderer,
  RendererProvider,
  FluentProvider,
  SSRProvider,
  webLightTheme,
  webDarkTheme,
  makeStyles,
  tokens,
} from "@fluentui/react-components";

// Create a DOM renderer for Fluent UI.
const renderer = createDOMRenderer();

/**
 * A custom style class for Fluent UI components.
 *
 * @property {Object} root - The root CSS class.
 */
const useStyles = makeStyles({
  root: {
    backgroundColor: tokens.colorBrandBackground2,
  },
});

/**
 * Providers component.
 *
 * This component wraps other components with a set of providers
 * for Fluent UI, SSR, and a custom renderer.
 *
 * @param {Object} props - The properties for the Providers component.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the Providers.
 * @returns {React.Element} The Providers component with child components.
 */
export function Providers({ children }) {
  // Declare a state variable named 'hasMounted' and a function named 'setHasMounted' to update it.
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []); // add empty array as second argument to run only once

  if (!hasMounted) {
    return null;
  }

  // If the component has mounted, return a set of providers.
  return (
    <ThemeProvider>
      <RendererProvider renderer={renderer}>
        <SSRProvider>
          <WrappedFluentProvider>{children}</WrappedFluentProvider>
        </SSRProvider>
      </RendererProvider>
    </ThemeProvider>
  );
}

/**
 * WrappedFluentProvider component.
 *
 * This component wraps the FluentProvider with the theme context provided
 * by the ThemeProvider. It is used to ensure that the theme value
 * is available and properly passed to the FluentProvider.
 *
 * @param {Object} props - The properties for the WrappedFluentProvider component.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the FluentProvider.
 * @returns {React.Element} The WrappedFluentProvider component with the FluentProvider and child components.
 */
const WrappedFluentProvider = ({ children }) => {
  // Get styles for Fluent UI components using makeStyles function.
  const styles = useStyles();
  // Get the current theme from the app's theme context using useThemeContext hook.
  const { theme } = useThemeContext();
  // Set the app's theme to a corresponding Fluent UI theme.
  const currentTheme = theme === "light" ? webLightTheme : webDarkTheme;

  return (
    <FluentProvider theme={currentTheme} className={styles.root}>
      {children}
    </FluentProvider>
  );
};
