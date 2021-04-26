let initState = {
  currentUser: "",
  isAuthenticated: false,
  loader: true,
};

export const UserReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "CURRENT_USER":
      return {
        ...state,
        currentUser: payload,
        isAuthenticated: true,
        loader: false,
      };
    case "USER_SESSION_ENEDE":
      return {
        ...state,
        loader: false,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
