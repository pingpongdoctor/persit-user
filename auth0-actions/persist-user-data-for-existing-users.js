/* eslint-disable */

const axios = require("axios");
/**
 * Handler that will be called during the execution of a PostLogin flow.
 *
 * @param {Event} event - Details about the user and the context in which they are logging in.
 * @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
 */
exports.onExecutePostLogin = async (event, api) => {
  try {
    const payload = {
      email: event.user.email,
      name: event.user.name,
      auth0UserId: event.user.user_id,
    };
    console.log(payload);
    await axios.post(event.secrets.POST_USER_DATA_ENDPOINT, { user: payload });
  } catch (error) {
    console.error("Error happened on Post Login", error);
  }
};

/**
 * Handler that will be invoked when this action is resuming after an external redirect. If your
 * onExecutePostLogin function does not perform a redirect, this function can be safely ignored.
 *
 * @param {Event} event - Details about the user and the context in which they are logging in.
 * @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
 */
// exports.onContinuePostLogin = async (event, api) => {
// };
