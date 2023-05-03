/**
 * Import the NextResponse from the Next.js to create and manipulate HTTP responses.
 */
import { NextResponse } from "next/server";

/**
 * Import the MailerLite package to interact with the MailerLite API for managing
 * subscribers and mailing lists.
 */
import MailerLite from "@mailerlite/mailerlite-nodejs";

// Initialize a new instance of the MailerLite client using the API key from the environment variables
const mailerlite = new MailerLite({
  api_key: process.env.MAILERLITE_API_KEY,
});

/**
 * Handle POST requests for subscribing a user to a mailing list.
 *
 * @async
 * @function
 * @param {Object} request - The incoming request object containing the user's email.
 * @returns {NextResponse} - The response object containing the status and result of the request.
 */
export async function POST(request) {
  // Extract the email from the request's JSON payload
  const { email } = await request.json();

  // Define the parameters for the MailerLite API request
  const params = {
    email: email,
    groups: [process.env.MAILERLITE_GROUP_ID],
    status: "unconfirmed",
  };

  try {
    // Attempt to create or update the subscriber in MailerLite using the provided email and parameters
    const response = await mailerlite.subscribers.createOrUpdate(params);

    // Return a success response containing the result and a message
    return NextResponse.json({
      message: "You have been subscribed! Confirm email in your inbox.",
      data: response.data,
    });
  } catch (error) {
    // Handle errors that include a response from the MailerLite API
    if (error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    } else {
      // Handle other errors and return a generic error message
      return NextResponse.json(
        {
          message: "An error occurred. Please try again.",
        },
        {
          status: 500,
        }
      );
    }
  }
}
