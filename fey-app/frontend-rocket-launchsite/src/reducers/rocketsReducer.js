const initialState = {
    rockets: [],
    loading: false,
    error: null,
  };
  
  const rocketsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_ROCKETS_SUCCESS':
        return { ...state, rockets: action.payload, loading: false };
      case 'FETCH_ROCKETS_ERROR':
        return { ...state, error: action.error, loading: false };
      default:
        return state;
    }
  };
  
  export default rocketsReducer;
  