export const LOGIN_STATUS = {
  PENDING: "pending",
  NOT_LOGGED_IN: "notLoggedIn",
  IS_LOGGED_IN: "loggedIn",
};

export const SERVER = {
  AUTH_MISSING: "auth-missing",
  AUTH_INSUFFICIENT: "auth-insufficient",
  REQUIRED_USERNAME: "required-username",
  SERVER_ERROR: "server-error",
};

export const CLIENT = {
  NETWORK_ERROR: "network-error",
  INVALID_CLIENT_DATA: "invalid-data",
  NO_SESSION: "noSession",
};

export const MESSAGES = {
  [CLIENT.NETWORK_ERROR]:
    "Trouble connecting to the network.  Please try again.",
  [SERVER.AUTH_INSUFFICIENT]:
    "Your username/password combination does not match any records, please try again.",
  [SERVER.REQUIRED_USERNAME]:
    "Please enter a valid (letters and/or numbers) username.",
  [CLIENT.INVALID_CLIENT_DATA]: "Field invalid.",
  [SERVER.ERROR]: "Server server. Please come back later.",
  default: "Something went wrong.  Please try again.",
};

export const ACTIONS = {
  // Session
  START_LOADING: "start loading",
  LOG_IN: "logIn",
  LOG_OUT: "logOut",

  // Menu
  LOAD_MENU: "load menu",
  FILTER_MENU: "filter menu",
};
