const initState: {} = {};

export const gameReducer = (
  state = initState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    default:
      return state;
  }
};
