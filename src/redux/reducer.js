const init = {
  score: 0,
  questions: [],
}

const reducer = (state = init, action) => {
  switch (action.type) {
    case 'CHANGE_SCORE':
      return { ...state, score: action.payload }
    case 'SAVE_QUESTION':
      return { ...state, questions: [...state.questions, action.payload] }
    case 'PLAY_AGAIN':
      return { score: 0, questions: [] }
    default:
      return state
  }
}

export default reducer
