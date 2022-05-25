export const GET_DATA = 'GET_DATA'
export const QUESTION_INCREMENT = 'QUESTION_INCREMENT'
export const ALL_DATA_QUIZ = 'ALL_DATA_QUIZ'

export const GetData = (allQuiz) => {
    return {
        type: GET_DATA,
        allQuiz,
    }
}
export const QuestionIncrement = (quizNo) => ({
    type: QUESTION_INCREMENT,
    quizNo,
});

export const AllDataQuiz = (allDataQuiz) => {
    return {
        type: ALL_DATA_QUIZ,
        allDataQuiz,
    }
}