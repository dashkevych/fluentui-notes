"use client";

/**
 * Import necessary dependencies from '@fluentui/react-components'.
 *
 * @property makeStyles - A hook to create style objects with theme-aware values.
 * @property mergeClasses - A utility function to merge CSS class names.
 * @property shorthands - A set of shorthand utility functions for commonly used CSS properties.
 * @property typographyStyles - A collection of typography styles provided by Fluent UI.
 * @property tokens - A set of predefined design tokens (variables) provided by Fluent UI.
 * @property Text - A Fluent UI component for displaying text.
 * @property Card - A Fluent UI component for displaying content in a card.
 * @property Switch - A Fluent UI component for creating toggle switches.
 * @property Avatar - A Fluent UI component for displaying user avatars.
 */
import {
  makeStyles,
  mergeClasses,
  shorthands,
  typographyStyles,
  tokens,
  Text,
  Card,
  Switch,
  Avatar,
} from "@fluentui/react-components";

/**
 * Import necessary icon components from '@fluentui/react-icons'.
 *
 * @property PeopleStar16Filled - A Fluent UI icon component representing a group of people with a star.
 * @property CheckmarkStarburst16Filled - A Fluent UI icon component representing a checkmark in a starburst shape.
 * @property NotepadEdit16Filled - A Fluent UI icon component representing a notepad with a pencil for editing.
 */
import { CheckmarkStarburst16Filled } from "@fluentui/react-icons";

/**
 * Import the useThemeContext custom hook from the ThemeProvider module.
 *
 * @property useThemeContext - A custom hook for accessing the current theme context and related functions.
 */
import { useThemeContext } from "./ThemeProvider";

// Create a custom 'useStyles' hook to define the styling for the Home component.
const useStyles = makeStyles({
  container: {
    ...shorthands.padding(tokens.spacingHorizontalXXL),
    ...shorthands.gap(tokens.spacingVerticalM),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  settings: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "280px",
  },
  toggleButton: {
    marginInlineStart: `calc(-1 * ${tokens.spacingHorizontalS})`,
  },
  toggleIcon: {
    fontSize: "24px",
  },
  card: {
    width: "280px",
    height: "fit-content",
  },
  title: typographyStyles.subtitle2,
  flex: {
    ...shorthands.gap("4px"),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  labels: {
    ...shorthands.gap("6px"),
  },
  row: {
    display: "flex",
    alignItems: "flex-start",
    ...shorthands.gap("12px"),
  },
  column: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    ...shorthands.gap("4px"),
  },
  label: {
    ...typographyStyles.body1Stronger,
    color: tokens.colorBrandForeground2,
  },
  caption: {
    ...typographyStyles.caption1,
    color: tokens.colorNeutralForeground3,
  },
  svg: {
    width: "12px",
    height: "12px",
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
  const { theme, setTheme } = useThemeContext();

  // Act on toggle click.
  const handleToggleChange = (event) => {
    const selectedTheme = !event.currentTarget.checked ? "dark" : "light";
    setTheme(selectedTheme);
  };

  // Check if current theme is set to `light`.
  const isLightTheme = theme === "light" ? true : false;
  // Set label for control element based on selected theme.
  const toggleLabel = isLightTheme ? "Light Theme" : "Dark Theme";
  // Set icon for cotrol element based on selected theme.
  const toggleIcon = isLightTheme ? "🌞" : "🌚";
  // Data with information about actors.
  const actorsData = [
    {
      name: "Ashton Kutcher",
      description:
        "Christopher Ashton Kutcher is an American actor, producer, entrepreneur, and former model.",
    },
    {
      name: "Rebel Wilson",
      description:
        "Rebel Melanie Elizabeth Wilson is an Australian actress, comedian, writer, singer, and producer.",
    },
    {
      name: "Morgan Freeman",
      description:
        "Morgan Freeman is an American actor, director, and narrator.",
    },
  ];

  // Render the Home component with a Title1 and Text component from Fluent UI.
  return (
    <main className={styles.container}>
      <div className={styles.settings}>
        <Switch
          label={toggleLabel}
          checked={theme === "light" ? true : false}
          onChange={handleToggleChange}
          className={styles.toggleButton}
        />
        <span className={styles.toggleIcon}>{toggleIcon}</span>
      </div>
      <Card className={styles.card}>
        <header className={mergeClasses(styles.flex, styles.labels)}>
          <Text as="h1" className={styles.title}>
            Favorite Actors
          </Text>
        </header>

        {actorsData.map((actor, index) => (
          <div key={index}>
            <div className={styles.row}>
              <Avatar
                name={actor.name}
                badge={{
                  icon: <CheckmarkStarburst16Filled className={styles.svg} />,
                }}
              />
              <div className={styles.column}>
                <Text className={styles.label}>{actor.name}</Text>
                <Text className={styles.caption}>{actor.description}</Text>
              </div>
            </div>
          </div>
        ))}
      </Card>
    </main>
  );
}
