import { useState, useRef, useEffect } from 'react'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useDispatch } from "react-redux";
import { GetData } from '../store/action';
import { QuestionIncrement } from '../store/action';
import { AllDataQuiz } from '../store/action';
import { useSelector } from "react-redux";

const Home = () => {
    const totalQuestion = 20;
    const [timer, setTimer] = useState('00:00:00');
    const [flag, setFlag] = useState();
    const questionNumber = 1
    const [operator, setOperator] = useState();
    const [question, setQuestion] = useState(0);
    const [userAnswer, setUserAnswer] = useState();
    const [allQuestion, setAllQuestion] = useState([]);
    const [allInfo, setAllInfo] = useState();
    const [answerRight, setAnswerRight] = useState(0);
    const [flagTwo, setFlagTwo] = useState(1);
    const Ref = useRef(null);
    const arrOperators = ["+", "-", "/", "*"];
    const dispatch = useDispatch();
    const allData = useSelector((state) => state.Reducer.data);
    const quiz = useSelector((state) => state.Reducer.quizNum);
    const allQuizData = useSelector((state) => state.Reducer.allDataQuizData);

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
        if (Ref.current) {
            clearInterval(Ref.current)
        }
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }
    const startTimer = (e) => {
        let { total, hours, minutes, seconds }
            = getTimeRemaining(e);
        if (total >= 0 && question <= 20) {
            setTimer(
                (hours > 19 ? hours : '0' + hours) + ':' +
                (minutes > 19 ? minutes : '0' + minutes) + ':'
                + (seconds > 19 ? seconds : '0' + seconds)
            )
        }
        else {

            question <= 20 && handleNext();

        }
    }

    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 20);
        return deadline;
    }
    const handleUserAnswer = (e) => {
        setUserAnswer(e.target.value)

    }
    useEffect(() => {
        allData && flag < 3 ? setFlag(allData.flag) : flag === 3 ? setFlag(3) : setFlag(1);
        quiz ? setQuestion(quiz) : setQuestion(0);
        allData && setAllInfo(allData);
    }, [])
    useEffect(() => {
        quiz <= 20 && dispatch(QuestionIncrement(quiz));
        quiz <= 20 ? setQuestion(quiz) : setFlag(3)
    }, [operator])
    useEffect(() => {
        let ans;
        let ques;
        if (allData) {
            if (allData.operator === '+') {
                ans = allData.firstNo + allData.secondNo
                ques = `${allData.firstNo} + ${allData.secondNo}`
            }
            else if (allData.operator === '-') {
                ans = allData.firstNo - allData.secondNo
                ques = `${allData.firstNo} - ${allData.secondNo}`
            }
            else if (allData.operator === '*') {
                ans = allData.firstNo * allData.secondNo
                ques = `${allData.firstNo} * ${allData.secondNo}`
            }
            else if (allData.operator === '/') {
                ans = allData.firstNo / allData.secondNo
                ques = `${allData.firstNo} / ${allData.secondNo}`
            }
        }
        allQuestion.map((e, index) => {
            if (e.no == question) {
                allQuestion.splice(index, 1);
            }
        })
        allQuestion.length > 0 ?
            setAllQuestion([...allQuestion, {
                "no": question, "question": ques, "userAnswer": userAnswer, "answer": ans
            }
            ]) :
            setAllQuestion([{
                "no": question, "question": ques, "userAnswer": userAnswer, "answer": ans
            }])
        setUserAnswer()
        dispatch(AllDataQuiz(allQuestion));
    }, [userAnswer, operator])

    const handleQuizFirst = () => {
        handleNext();
    }
    const handleQuizSecond = () => {
        setFlagTwo(2)
    }


    const handleNext = () => {
        console.log(userAnswer)
        if (question <= 20) {
            clearTimer(getDeadTime());
            setFlag(2);
            const firstNumber = Math.floor(Math.random() * 10);
            const secondNumber = Math.floor(Math.random() * 10);
            let randomOperator = arrOperators[Math.floor((Math.random() * arrOperators.length))];
            setOperator(randomOperator);


            dispatch(GetData({ firstNo: firstNumber, secondNo: secondNumber, operator: randomOperator, flag: flag, questionNo: quiz }));
            dispatch(AllDataQuiz(allQuestion));
            setAllInfo(allData);

            // if (ans == userAnswer) {
            //     setAnswerRight(answerRight + 1)
            // }
            setUserAnswer()
        }
        else {
            setFlag(3);

            dispatch(GetData({ flag: 3, questionNo: quiz }));
            console.log(allQuizData)
        }

    }
    return (
        <div >
            <h1>Home</h1>

            <Grid container spacing={2}>
                <Grid item xs={5}>
                    <Card sx={{ minWidth: 275 }}>
                        {
                            flag == 1 &&
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Quiz 1
                                </Typography>
                                <Typography variant="body2">
                                    <Button variant="contained" onClick={handleQuizFirst}>Start Quiz</Button>
                                </Typography>
                            </CardContent>
                        }
                        {
                            flag === 2 &&
                            <CardContent>
                                {console.log(allQuestion)}
                                <Typography variant="body2">
                                    <div>
                                        <h2>Timer {timer}</h2>
                                    </div>
                                    <br />
                                </Typography>
                                <Typography variant="h5" component="div">
                                    Question {question}
                                    Question{quiz}
                                </Typography>
                                <Typography variant="body2">
                                    <TextField id="filled-basic" label="First Number" variant="filled" value={allData.firstNo} /><br /><br />
                                    <TextField id="filled-basic" label="operetor" variant="filled" value={allData.operator} /><br /><br />
                                    <TextField id="filled-basic" label="Second Number" variant="filled" value={allData.secondNo} /><br /><br />
                                </Typography>
                                <Typography variant="body2">
                                    <TextField id="filled-basic" label="Answer" variant="filled" value={userAnswer} onChange={handleUserAnswer} /><br /><br />
                                </Typography>
                                <Button variant="contained" onClick={handleNext}>next</Button><br /><br />
                                <Typography variant="body2">
                                    <div>
                                        Score   {answerRight}/{question - 1}
                                    </div>
                                    <br />
                                </Typography>

                            </CardContent>

                        }
                        {
                            flag == 3 &&
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Final Score
                                    {
                                        allQuestion.map((e) => {
                                            return <>
                                                <div>Question :{e.question}</div>{e.question}
                                                <div>Answer :{e.answer}</div>
                                            </>
                                        })
                                    }
                                </Typography>
                                <Typography variant="h6">
                                    All Question Set
                                </Typography>
                            </CardContent>
                        }
                    </Card>
                </Grid>
                <Grid item xs={5}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Quiz 2
                            </Typography>
                            <Typography variant="body2">
                                <Button variant="contained" onClick={handleQuizSecond}>Start Quiz</Button>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </div>
    );
}
export default Home;