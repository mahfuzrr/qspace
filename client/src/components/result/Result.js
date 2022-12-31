import { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import UpperButton from '../quizPage/UpperButton';

export default function Result({ resultData }) {
    const [cAns, setCAns] = useState(0);
    const [incAns, setIncAns] = useState(0);
    const [unAns, setUnAns] = useState(0);

    useEffect(() => {
        if (resultData) {
            let correctAns = 0;
            //  console.log(resultData?.submission);

            const customIndexOf = (mainAnswer, val) => {
                for (let i = 0; i < mainAnswer?.length; i += 1) {
                    if (mainAnswer[i]?.input === val) return i;
                }

                return -1;
            };

            for (let i = 0; i < resultData?.submission?.length; i += 1) {
                let check = true;

                for (let j = 0; j < resultData?.submission[i]?.userAnswer?.length; j += 1) {
                    const index = customIndexOf(
                        resultData.submission[i].mainAnswer,
                        resultData.submission[i].userAnswer[j]
                    );
                    if (index < 0) {
                        check = false;
                        break;
                    }
                }

                if (check) correctAns += 1;
            }

            if (resultData.submission) {
                const unAnswer = resultData.totalQuestion - resultData.submission.length;
                const incorrectAns = resultData.submission.length - correctAns;
                setIncAns(incorrectAns);
                setUnAns(unAnswer);
            }

            setCAns(correctAns);
        }
    }, [resultData]);

    const pieChartData = [
        ['Task', 'Hours per Day'],
        ['Correct Answer', cAns],
        ['Wrong Answer', incAns],
        ['Not Answered', unAns],
    ];
    const options = {
        legend: 'none',
        pieSliceText: 'label',
        title: '',
        pieStartAngle: 100,
    };

    return (
        <div className="container overflow-hidden min-vh-100" id="result-page-leftSide">
            <UpperButton />

            <div className="container" id="result-page-scores">
                <p className="m-0 title">Result</p>

                <div className="container p-0" id="result-total-score">
                    <p className="m-0">Score:</p>
                    <p className="m-0">
                        {resultData?.mark}/{resultData?.totalMarks}
                    </p>
                </div>

                <div className="container p-0" id="result-summary-chart">
                    <p className="m-0">Overall Performance</p>
                    <div className="container d-flex" id="result-chart">
                        <div className="container" id="res-pie-chart">
                            <Chart
                                chartType="PieChart"
                                data={pieChartData}
                                options={options}
                                width="100%"
                                height="300px"
                            />
                        </div>
                        <div
                            className="container d-flex flex-column gap-4 justify-content-center"
                            id="res-pie-details"
                        >
                            <div className="container d-flex justify-content-between single-pie-details">
                                <div className="container d-flex single-pie-details-left w-75 align-items-center">
                                    <div className="container pie-indicator red" />
                                    <div className="container pie-indicator-title">
                                        Wrong Answer
                                    </div>
                                </div>
                                <div className="container w-25 single-pie-details-right d-flex justify-content-start align-items-center">
                                    {incAns}
                                </div>
                            </div>
                            <div className="container d-flex justify-content-between single-pie-details">
                                <div className="container d-flex single-pie-details-left w-75 align-items-center">
                                    <div className="container pie-indicator green" />
                                    <div className="container pie-indicator-title ">
                                        Correct Answer
                                    </div>
                                </div>
                                <div className="container w-25 single-pie-details-right d-flex justify-content-start align-items-center">
                                    {cAns}
                                </div>
                            </div>
                            <div className="container d-flex justify-content-between single-pie-details">
                                <div className="container d-flex single-pie-details-left w-75 align-items-center">
                                    <div className="container pie-indicator yellow" />
                                    <div className="container pie-indicator-title ">
                                        Not answered
                                    </div>
                                </div>
                                <div className="container w-25 single-pie-details-right d-flex justify-content-start align-items-center">
                                    {unAns}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
