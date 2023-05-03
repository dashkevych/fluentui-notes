"use client";

/**
 * Import the 'useState' hook from the 'react' library.
 *
 * 'useState' is used for creating and managing state variables in functional components.
 */
import { useState } from "react";

/**
 * Import the necessary components and utilities from the '@fluentui/react-components' library.
 *
 * 'makeStyles' is a utility for creating custom CSS-in-JS styles.
 * 'shorthands' is an object containing utility functions for shorthand CSS properties.
 * 'tokens' is an object containing design token values, such as spacing and colors.
 * 'Button' is a UI component for creating buttons.
 * 'Card' is a UI component for creating a card container.
 * 'Field' is a UI component for creating form fields.
 * 'Input' is a UI component for creating form input elements.
 * 'Spinner' is a UI component for creating a loading spinner.
 */
import {
  makeStyles,
  shorthands,
  tokens,
  Button,
  Card,
  Field,
  Input,
  Spinner,
} from "@fluentui/react-components";

/**
 * Import the 'PersonMail20Regular' icon from the '@fluentui/react-icons' library.
 *
 * This icon will be used as a visual indicator for the email input field in the form.
 */
import { PersonMail20Regular } from "@fluentui/react-icons";

/**
 * Create a custom 'useStyles' hook to define the styling for the Newsletter component.
 */
const useStyles = makeStyles({
  container: {
    maxWidth: "400px",
    width: "100%",
    ...shorthands.marginInline("auto"),
  },
  form: {
    display: "flex",
    flexDirection: "row",
    alignItems: "start",
    width: "100%",
    ...shorthands.gap(tokens.spacingHorizontalS),
  },
  field: {
    flexGrow: "1",
    "& > label": {
      clip: "rect(1px, 1px, 1px, 1px)",
      clipPath: "inset(50%)",
      height: "1px",
      width: "1px",
      ...shorthands.margin("-1px"),
      ...shorthands.overflow("hidden"),
      ...shorthands.padding("0"),
      position: "absolute",
    },
    "& .fui-Field__validationMessage": {
      marginBlockStart: tokens.spacingVerticalMNudge,

      "&:empty": {
        display: "none",
      },
    },
  },
});

/**
 * 'NewsletterForm' is a component that renders a newsletter subscription form.
 * When the user submits the form, it sends a subscription request to the server.
 *
 * @param {object} props - The properties passed to the component.
 */
export default function NewsletterForm(props) {
  // Retrieve the styles object from the 'useStyles' hook.
  const styles = useStyles();

  // Declare state variables for email, message, status, isLoading, and isSubscribed.
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("none");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  /**
   * Sends a subscription request to the server with the given email address.
   *
   * @param {string} email - The email address to subscribe.
   * @returns {Promise<object>} The response data with 'message' and 'status' properties.
   */
  const subscribe = async (email) => {
    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    return {
      message: data.message,
      status: response.ok ? "success" : "error",
    };
  };

  /**
   * Handles the form submission.
   *
   * @param {Event} event - The form submission event.
   */
  const handleSubmit = async (event) => {
    // Prevent the default form submission behavior.
    event.preventDefault();

    // Set the isLoading state to true to indicate the subscription is in progress.
    setIsLoading(true);

    try {
      const { message, status } = await subscribe(email);
      setMessage(message);
      setStatus(status);
      setIsLoading(false);
      setIsSubscribed(status === "success");
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      setStatus("error");
      setIsLoading(false);
    }
  };

  // Render the subscription form and its containing elements.
  return (
    <Card className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Field
          className={styles.field}
          label="Email address"
          validationState={status}
          validationMessage={message}
        >
          <Input
            contentBefore={<PersonMail20Regular />}
            type="email"
            value={email}
            placeholder="Enter your email address..."
            onChange={(event) => setEmail(event.target.value)}
            required={true}
            disabled={isSubscribed}
          />
        </Field>

        <Button
          type="submit"
          appearance="primary"
          disabled={isSubscribed || isLoading}
        >
          {isLoading ? (
            <Spinner size="tiny" label="Subscribing" />
          ) : (
            "Subscribe"
          )}
        </Button>
      </form>
    </Card>
  );
}
