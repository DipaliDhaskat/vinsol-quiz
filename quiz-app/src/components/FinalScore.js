
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { useSelector } from "react-redux";
const FinalScore = (props) => {
    const allQuizData = useSelector((state) => state.Reducer.allDataQuizData);
    const allQuizDataTwo = useSelector((state) => state.Reducer.allDataQuizDataTwo);
    return (
        <div >
            <CardContent>
                <Typography variant="h5" component="div">
                    <Card sx={{ maxWidth: 245, mx: "auto" }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Final Score
                                <h2>  {props.finalAnswer}</h2>
                            </Typography>
                        </CardContent>
                    </Card>


                </Typography>
                <Typography variant="h6">
                    <h3>All Question Set</h3>

                    {props.data === "one" &&
                        allQuizData.map((e) => {
                            return <>
                                <Card sx={{ maxWidth: 245, mx: "auto", my: "2px" }}>

                                    <CardContent>
                                        <Typography variant="body" component="div">
                                            <div>Qus No : {e.no}</div>
                                            <div style={{ backgroundColor: e.answer == e.userAnswer ? 'green' : 'red' }}>Question : {e.question}</div>
                                            <div> answer : {e.answer == undefined ? "undefined" : e.answer}</div>
                                            <div></div>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </>
                        })
                    }
                    {props.data === "two" &&
                        allQuizDataTwo.map((e) => {
                            return <>
                                <Card sx={{ maxWidth: 245, mx: "auto", my: "2px" }}>

                                    <CardContent>
                                        <Typography variant="body" component="div">
                                            <div>Qus No : {e.no}</div>
                                            <div style={{ backgroundColor: e.answer == e.userAnswer ? 'green' : 'red' }}>Question : {e.question}</div>
                                            <div> answer : {e.answer == undefined ? "undefined" : e.answer}</div>
                                            <div></div>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </>
                        })
                    }
                </Typography>
            </CardContent>
        </div>
    );
}
export default FinalScore;