import { useState, useRef, useEffect } from 'react'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import QuestionFirst from './QuestionFirst';
import { useDispatch } from "react-redux";
import { QuestionIncrement } from '../store/action';
import { useSelector } from "react-redux";
import QuestionSecond from './QuestionSecond';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
const Home = () => {
    const [flag, setFlag] = useState(1);
    const [secondFlag, setSecondFlag] = useState(0);
    const [totalQuestion, setTotalQuestion] = useState();
    const [numRange, setNumRange] = useState();
    const [operator, setOperator] = useState([])
    const [error, setError] = useState({ totalquiz: "", numRange: "" })
    const [totalQuestionTwo, setTotalQuestionTwo] = useState();
    const [numRangeTwo, setNumRangeTwo] = useState();
    const [operatorTwo, setOperatorTwo] = useState([])
    const [errorTwo, setErrorTwo] = useState({ totalquiz: "", numRange: "" })
    const [errorTwoOp, setErrorTwoOp] = useState(0)
    const [errorOp, setErrorOp] = useState(0)
    const dispatch = useDispatch();
    const allQuizData = useSelector((state) => state.Reducer.allDataQuizData);
    const allQuizDataTwo = useSelector((state) => state.Reducer.allDataQuizDataTwo);

    useEffect(() => {
        allQuizData.length > 0 ? setFlag(3) : setFlag(1)
        allQuizDataTwo.length > 0 ? setSecondFlag(3) : setSecondFlag(1)
    }, [])

    const handleQuizFirst = () => {
        setFlag(2)
    }
    const handleQuizChoice = () => {
        if (operator.length > 0) {
            setFlag(3)
        }
        else {
            setErrorOp(1)
        }
    }
    const handleQuizChoiceTwo = () => {
        if (operatorTwo.length > 0) {
            setSecondFlag(3)
        }
        else {
            setErrorTwoOp(1)
        }

    }
    const handleQuizSecond = () => {
        setSecondFlag(2)
    }
    const handleQuestion = (e) => {
        setTotalQuestion(e.target.value)

            ((!(/^[0-9]*$/g.test(e.target.value))) ?
                setError({ totalquiz: "Please enter only numbers" })  //validation for 
                : setError({ totalquiz: "" }))
    }
    const handleNumberRange = (e) => {
        setNumRange(e.target.value)
            ((!(/^[0-9]*$/g.test(e.target.value))) ?
                setError({ numRange: "Please enter only numbers" })  //validation for 
                : setError({ numRange: "" }))
    }
    const handleOperator = (e) => {
        if (e.target.checked) {
            setOperator([...operator, e.target.value])
        }
    }
    const handleQuestionTwo = (e) => {
        setTotalQuestionTwo(e.target.value)

            ((!(/^[0-9]*$/g.test(e.target.value))) ?
                setErrorTwo({ totalquiz: "Please enter only numbers" })  //validation for 
                : setErrorTwo({ totalquiz: "" }))
    }
    const handleNumberRangeTwo = (e) => {
        setNumRangeTwo(e.target.value)
            ((!(/^[0-9]*$/g.test(e.target.value))) ?
                setErrorTwo({ numRange: "Please enter only numbers" })  //validation for 
                : setErrorTwo({ numRange: "" }))
    }
    const handleOperatorTwo = (e) => {
        if (e.target.checked) {
            setOperatorTwo([...operator, e.target.value])
        }
    }
    const handleReset = () => {
        setTotalQuestion();
        setNumRange();
        setOperator([]);
    }
    return (
        <div >
            <Box sx={{ my: 2, mx: "auto" }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <div data-testid="home-heading"> Quiz App </div>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={5}>
                    <Card sx={{ minWidth: 275 }}>
                        <Typography variant="h4" component="div">
                            Quiz 1
                        </Typography>
                        {
                            flag == 1 &&
                            <CardContent>
                                <Typography variant="body2">
                                    <Button variant="contained" data-testid="start-btn" onClick={handleQuizFirst}>Start Quiz</Button>
                                </Typography>
                            </CardContent>
                        }
                        {
                            flag == 2 &&
                            <CardContent>
                                <Typography variant="body2">
                                    <form onSubmit={handleQuizChoice}>
                                        <Grid container spacing={2} sx={{ my: 2 }}>
                                            <Grid xs={4} sx={{ my: "auto" }}>
                                                Total  Question
                                            </Grid>
                                            <Grid item xs={8} >
                                                <TextField id="filled-basic" label="Total Question" variant="filled" value={totalQuestion}
                                                    InputLabelProps={{ shrink: true }} required onChange={handleQuestion} aria-required
                                                    error={Boolean(error?.totalquiz)}
                                                    helperText={(error?.totalquiz)} />

                                            </Grid>
                                            <Grid item xs={4} sx={{ m: "auto" }}>
                                                Operands Range
                                            </Grid>
                                            <Grid item xs={8} sx={{ m: "auto" }}>
                                                <TextField id="filled-basic" label="Operands range" variant="filled" value={numRange}
                                                    InputLabelProps={{ shrink: true }} required onChange={handleNumberRange}
                                                    error={Boolean(error?.numRange)}
                                                    helperText={(error?.numRange)}
                                                />

                                            </Grid>
                                            <Grid item xs={4} sx={{ m: "auto" }}>
                                                Operators
                                            </Grid>
                                            <Grid item xs={8} sx={{ m: "auto" }}>
                                                <FormControl component="fieldset" style={{ display: 'block' }}>

                                                    {["+", "-", "*", "/"].map((e, index) => {
                                                        return <FormControlLabel key={e} control={<Checkbox checked={operator[index]?.includes(`${e}`)} />} label={e} value={e} onChange={handleOperator} />
                                                    })}
                                                    {error === 1 && <div style={{ color: "red" }}>please select minimum one checked box</div>}

                                                </FormControl>

                                            </Grid>
                                        </Grid>
                                        <Button variant="contained" type="submit" sx={{ mx: 2 }}>Start Test</Button>
                                        <Button variant="contained" type="reset" onClick={handleReset}>Reset</Button>
                                    </form>
                                </Typography>
                            </CardContent>
                        }
                        {
                            flag === 3 && <QuestionFirst totalQuestion={totalQuestion} numRange={numRange} operator={operator} />
                        }
                    </Card>
                </Grid>
                <Grid item xs={5}>
                    <Card sx={{ minWidth: 275 }}>
                        <Typography variant="h4" component="div">
                            Quiz 2
                        </Typography>
                        {
                            secondFlag == 1 &&
                            <CardContent>
                                <Typography variant="body2">
                                    <Button variant="contained" onClick={handleQuizSecond}>Start Quiz</Button>
                                </Typography>
                            </CardContent>
                        }
                        {
                            secondFlag == 2 &&
                            <CardContent>
                                <Typography variant="body2">
                                    <form onSubmit={handleQuizChoiceTwo}>
                                        <Grid container spacing={2} sx={{ my: 2 }}>
                                            <Grid xs={4} sx={{ my: "auto" }}>
                                                Total  Question
                                            </Grid>
                                            <Grid item xs={8} >
                                                <TextField id="filled-basic" label="Total Question" variant="filled" value={totalQuestionTwo}
                                                    InputLabelProps={{ shrink: true }} required onChange={handleQuestionTwo} aria-required
                                                    error={Boolean(errorTwo?.totalquiz)}
                                                    helperText={(errorTwo?.totalquiz)} />

                                            </Grid>
                                            <Grid item xs={4} sx={{ m: "auto" }}>
                                                Operands Range
                                            </Grid>
                                            <Grid item xs={8} sx={{ m: "auto" }}>
                                                <TextField id="filled-basic" label="Operands range" variant="filled" value={numRangeTwo}
                                                    InputLabelProps={{ shrink: true }} required onChange={handleNumberRangeTwo}
                                                    error={Boolean(errorTwo?.numRange)}
                                                    helperText={(errorTwo?.numRange)}
                                                />

                                            </Grid>
                                            <Grid item xs={4} sx={{ m: "auto" }}>
                                                Operators
                                            </Grid>
                                            <Grid item xs={8} sx={{ m: "auto" }}>
                                                <FormControl component="fieldset" style={{ display: 'block' }}>

                                                    {["+", "-", "*", "/"].map((e, index) => {
                                                        return <FormControlLabel key={e} control={<Checkbox />} label={e} value={e} onChange={handleOperatorTwo} />
                                                    })}
                                                    {error === 1 && <div style={{ color: "red" }}>please select minimum one checked box</div>}

                                                </FormControl>

                                            </Grid>
                                        </Grid>
                                        <Button variant="contained" type="submit" sx={{ mx: 2 }}>Start Test</Button>
                                        <Button variant="contained" type="reset">Reset</Button>
                                    </form>
                                </Typography>
                            </CardContent>
                        }
                        {
                            secondFlag === 3 && <QuestionSecond totalQuestionTwo={totalQuestionTwo} numRangeTwo={numRangeTwo} operatorTwo={operatorTwo} />
                        }

                    </Card>
                </Grid>

            </Grid>
        </div >
    );
}
export default Home;