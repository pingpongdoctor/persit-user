/* eslint-disable */
const axios = require('axios');
/**
 * Handler that will be called during the execution of a PostUserRegistration flow.
 *
 * @param {Event} event - Details about the context and user that has registered.
 * @param {PostUserRegistrationAPI} api - Methods and utilities to help change the behavior after a signup.
 */
exports.onExecutePostUserRegistration = async (event, api) => {
  try {
    const payload = {
      email: event.user.email,
      name: event.user.name,
      auth0UserId: event.user.user_id
    };
    await axios.post(event.secrets.POST_USER_DATA_ENDPOINT, { user: payload });
  } catch (error) {
    console.error('Error on Post User Registration', error);
  }
};
