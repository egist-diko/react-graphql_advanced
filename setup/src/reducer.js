const reducer = (state, action) => {
  if (action.type === "UPDATE_COCKTAILS") {
    return { ...state, cocktails: action.payload };
  }
  if (action.type === "SET_SEARCH_TERM") {
    return { ...state, searchTerm: action.payload };
  }
};
export default reducer;
