const initialState = {
  userDetails: null,
};

// Action types
const SET_USER_DETAILS = "SET_USER_DETAILS";

// Reducer function
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DETAILS:
      return { ...state, userDetails: action.payload };
    default:
      return state;
  }
};

// Action creator
export const setUserDetails = (user) => ({
  type: SET_USER_DETAILS,
  payload: user,
});

// Correct export
export default userReducer;
