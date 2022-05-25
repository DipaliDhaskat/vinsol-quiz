import { GET_DATA } from './action'
import { QUESTION_INCREMENT } from './action'
import { ALL_DATA_QUIZ } from './action';
const initialState = {
    data: '',
    quizNum: 0,
    allDataQuizData: []
}

export const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA:
            return {
                ...state,
                data: action.allQuiz

            }
        case QUESTION_INCREMENT:
            return {
                ...state,
                quizNum: action.quizNo + 1

            }
        case ALL_DATA_QUIZ:
            return {
                ...state,
                allDataQuizData: [...state.allDataQuizData, action.allDataQuiz]

            }
        default: return state
    }
}