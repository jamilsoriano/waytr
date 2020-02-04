export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOG_IN":
      return { ...state, user: action.payload };

    case "SIGN_OUT":
      return { ...state, user: action.payload };

    case "SIGN_UP":
      return { ...state, user: action.payload };

    default:
      return state;
  }
};
