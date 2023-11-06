const initialState = {
  data: [],
  user: {},
  coaches: []
};

export const application = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_FAILED":
      const { payload = {} } = action;
      const { errorMessage = "" } = payload;
      return {
        ...state,
        error: true,
        errorMessage
      };
    case "REQUEST_SUCCEEDED":
      const { payload: data } = action;
      return { ...state, ...data, error: false };
    case "SET_USER_DATA":
      const { payload: user } = action;
      return { ...state, user, error: false };
    case "ADD_NEW_APPOINTMENT":
      const { appointment } = action.payload;
      let { data: dataFromState = [] } = state
      if (dataFromState.length) {
        dataFromState.push(appointment)
      }

      return { ...state, data: dataFromState, error: false };
    case "CLEAR_USER_DATA":
      return { ...state, user: {}, data: [], coaches: [], error: false };
    case "APPOINTMENT_ADDED_SUCCESSFULLY":
      const { payload: newDirectory } = action;
      let { rootEntries, children } = state.data;
      Object.is(newDirectory.mpath, null)
        ? rootEntries.push(newDirectory)
        : children.push(newDirectory);
      return { ...state, data: { rootEntries, children }, error: false };
    default:
      return state;
  }
};
