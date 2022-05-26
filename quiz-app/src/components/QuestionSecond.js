
import { useState, useRef, useEffect } from 'react'
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FinalScore from './FinalScore';

import { useDispatch } from "react-redux";
import { GetData } from '../store/action';
import { QuestionIncrement } from '../store/action';
import { AllDataQuizTwo } from '../store/action';
import { useSelector } from "react-redux";

const QuestionSecond = (props) => {
    const totalQuestion = props.totalQuestionTwo;
    const allQuizDataTwo = useSelector((state) => state.Reducer.allDataQuizDataTwo);
    const [flag, setFlag] = useState(1);
    let nextFlag = 1;
    const [timer, setTimer] = useState('00:00:00');
    const [firstNo, setFirstNo] = useState(allQuizDataTwo?.length > 0 ? allQuizDataTwo?.[allQuizDataTwo.length - 1]?.firstNumber : 0);
    const [secondNo, setSecondNo] = useState(allQuizDataTwo?.length > 0 ? allQuizDataTwo?.[allQuizDataTwo.length - 1]?.secondNumber : 0);
    const [operator, setOperator] = useState(allQuizDataTwo?.length > 0 ? allQuizDataTwo?.[allQuizDataTwo.length - 1]?.operatorRam : "+");
    const [question, setQuestion] = useState(allQuizDataTwo?.length > 0 ? allQuizDataTwo?.[allQuizDataTwo.length - 1]?.no : 0);
    const [userAnswer, setUserAnswer] = useState();
    const [allQuestion, setAllQuestion] = useState([]);
    const [answerRight, setAnswerRight] = useState(0);
    const [operands, setOperands] = useState(props.numRangeTwo);


    const Ref = useRef(null);
    const arrOperators = props.operatorTwo;
    const dispatch = useDispatch();


    useEffect(() => {
        console.log(question)
        allQuizDataTwo.length > 0 && setQuestion(allQuizDataTwo[allQuizDataTwo.length - 1]["no"]);
        handleNext();
    }, [])
    useEffect(() => {
        dispatch(QuestionIncrement(question));
    }, [dispatch, question])

    useEffect(() => {
        let ans;
        let ques;
        if (operator === '+') {
            ans = firstNo + secondNo
            ques = `${firstNo} + ${secondNo}`
        }
        else if (operator === '-') {
            ans = firstNo - secondNo
            ques = `${firstNo} - ${secondNo}`
        }
        else if (operator === '*') {
            ans = firstNo * secondNo
            ques = `${firstNo} * ${secondNo}`
        }
        else if (operator === '/') {
            ans = Math.round((firstNo / secondNo) * 100) / 100
            ques = `${firstNo} / ${secondNo}`
            if (ans === undefined || ans === "infinity") {
                ans = "undefined"
            }
        }
        console.log(question + "......." + "totalQuestion")
        allQuestion.length > 1 ? setAllQuestion([...allQuestion, {
            "no": question, "question": ques, "userAnswer": userAnswer, "answer": ans
        }]) :
            setAllQuestion([{
                "no": question, "question": ques, "userAnswer": userAnswer, "answer": ans
            }])
        question > 1 && dispatch(AllDataQuizTwo({ "no": question - 1, "question": ques, "userAnswer": userAnswer, "answer": ans, "firstNumber": firstNo, "secondNumber": secondNo, "operatorRam": operator }));
        question > 1 && dispatch(GetData({ "no": question - 1, "firstNumber": firstNo, "secondNumber": secondNo, "operatorRam": operator, "userAnswer": userAnswer }));
        if (question <= totalQuestion) {

            clearTimer(getDeadTime());

            setFirstNo(Math.floor(Math.random() * operands))
            setSecondNo(Math.floor(Math.random() * operands))
            let randomOperator = arrOperators[Math.floor((Math.random() * arrOperators.length))];
            setOperator(randomOperator)

            if (question > 0) {
                if (ans == userAnswer) {
                    setAnswerRight(answerRight + 1)
                }
            }
            setUserAnswer()
        }
        else {
            setFlag(4)
        }

    }, [question]);

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }
    const clearTimer = (e) => {
        setTimer('00:00:20');
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }
    const startTimer = (e) => {
        let { total, hours, minutes, seconds }
            = getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
                (hours > 19 ? hours : '0' + hours) + ':' +
                (minutes > 19 ? minutes : '0' + minutes) + ':'
                + (seconds > 19 ? seconds : '0' + seconds)
            )
        }
        else {
            question <= totalQuestion ? handleNext() : setFlag(4);
        }
    }

    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 20);
        return deadline;
    }

    const handleUserAnswer = (e) => {
        setUserAnswer(e.target.value);
    }

    const handleNext = (e) => {
        setQuestion(question + 1)
    }

    return (
        <div >
            {
                (flag === 1 && question <= totalQuestion) && <CardContent>
                    <Typography variant="body2">
                        <div>
                            <h2>Timer {timer}</h2>
                        </div>
                        <br />
                    </Typography>

                    <Typography variant="h5" component="div">
                        Question {question}
                    </Typography>
                    <Typography variant="body2">
                        <TextField id="filled-basic" label="First Number" variant="filled" value={firstNo} InputLabelProps={{
                            shrink: true,
                        }} /><br /><br />
                        <TextField id="filled-basic" label="operetor" variant="filled" value={operator} InputLabelProps={{
                            shrink: true,
                        }} /><br /><br />
                        <TextField id="filled-basic" label="Second Number" variant="filled" value={secondNo} InputLabelProps={{
                            shrink: true,
                        }} /><br /><br />
                    </Typography>
                    <Typography variant="body2">
                        <TextField label="Answer" variant="filled" id="answer" value={userAnswer} onChange={handleUserAnswer} InputLabelProps={{
                            shrink: true,
                        }} /><br /><br />
                    </Typography>
                    <Button variant="contained" data-testid="next-btn" onClick={handleNext}>Next</Button><br /><br />
                    <Typography variant="body2">
                        <div>
                            Score   {answerRight}/{question - 1}
                        </div>
                        <br />
                    </Typography>
                </CardContent>
            }
            {
                flag === 4 && < FinalScore finalAnswer={answerRight} data="two" />
            }
        </div>

    );
}
export default QuestionSecond;