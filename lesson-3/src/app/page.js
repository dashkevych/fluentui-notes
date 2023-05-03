"use client";

// Import necessary dependencies from '@fluentui/react-components'
import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

import NewsletterForm from "@/components/NewsletterForm";

// Create a custom 'useStyles' hook to define the styling for the Home component.
const useStyles = makeStyles({
  container: {
    ...shorthands.padding(tokens.spacingHorizontalXXL),
    ...shorthands.gap(tokens.spacingVerticalL),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: tokens.colorBrandForeground2,
  },
});

/**
 * Home component.
 *
 * This component renders a simple 'Hello World!' message and
 * some text styled with Fluent UI components and utilities.
 *
 * @returns {React.Element} The Home component with the 'Hello World!' message and some text.
 */
export default function Home() {
  // Retrieve the styles object from the 'useStyles' hook.
  const styles = useStyles();

  // Render the Home component with a Title1 and Text component from Fluent UI.
  return (
    <main className={styles.container}>
      <NewsletterForm />
    </main>
  );
}
