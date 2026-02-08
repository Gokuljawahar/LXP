import React, { useEffect, useRef,useState } from 'react';
import LearnerScoreProgressBarGraphApi from '../../middleware/LearnerMiddleware/LearnerScoreProgressBarGraphApi';
// import { Chart } from 'chart.js';
import { Chart, Tooltip, CategoryScale } from 'chart.js/auto';
import { Card } from '@mui/material';
 
 
Chart.register(Tooltip, CategoryScale);
 
function LearnerScoreProgressBarGraph() {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const id = sessionStorage.getItem("UserSessionID");
    const [scoreProgressSelector, setScoreProgressSelector] = useState([]);
 
    useEffect(() => {
        fetchCoursesTopicsScores(id);
    }, []);
 
    const fetchCoursesTopicsScores = async (id) => {
        const data = await LearnerScoreProgressBarGraphApi(id);
        setScoreProgressSelector(data);
    }
 
    useEffect(() => {
        if (scoreProgressSelector.length > 0 && chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
            const ctx = chartRef.current.getContext('2d');
            chartInstance.current =  new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: scoreProgressSelector.map(item => item.courseName),
                    datasets: scoreProgressSelector.map((item, index) => ({
                        label: item.topicName,
                        data: [item.score],
                        backgroundColor: ['#e6eefb', '#27235C'][index % 2],
                    })),
                },
                options: {
                    responsive: true,
                    scales: {
                        x: { beginAtZero: true },
                        y: { beginAtZero: true }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                title: function(context) {
                                    return context[0].dataset.label;
                                },
                                label: function(context) {
                                    return `Score: ${context.parsed.y}`;
                                }
                            }
                        }
                    }
                }
            });
        }
    }, [scoreProgressSelector]);
 
    return (
        <Card style={{backgroundColor:"whitesmoke",height:'400px'}}>
            <canvas ref={chartRef} style={{ width: '300px', height: '350px' }}></canvas>
        </Card>
    );
}
 
export default LearnerScoreProgressBarGraph;
 