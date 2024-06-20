import Header from "./Header";
import axios from "axios";
import React, { useEffect, useState } from 'react'
import Questions from './Questions'

import { useNavigate } from 'react-router-dom'

export default function QuizComponent() {

    const navigate = useNavigate(); // Use navigate

    const [check, setChecked] = useState(undefined)
    const [timeLeft, setTimeLeft] = useState(10 * 60); // 15 minutes in seconds
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    


    useEffect(() => {
        const fetchData = async () => {
          
            await axios.get("https://quizapi.io/api/v1/questions?apiKey=suZBf47WiB72cTuLVLfTfp1ZaeO44Gd9lq1SpK0k&limit=10").then((res)=>{
                setQuestions(res.data);
                
                setSelectedAnswers(new Array(res.data.length).fill(undefined)); // Initialize selectedAnswers
                setLoading(false);
            }).catch((err)=>{
                setError('Failed to fetch questions');
                setLoading(false);
            });
            
          
        };
    
        fetchData();
      }, []);

      useEffect(() => {
        if (timeLeft <= 0) {
          onFinish(); // Automatically navigate to result page
          return;
        }
    
        const timerId = setInterval(() => {
          setTimeLeft(prevTime => prevTime - 1);
        }, 1000);
    
        return () => clearInterval(timerId);
      }, [timeLeft]);

    /** next button event handler */
    function onNext(){

        // setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, questions.length - 1));

        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

        setChecked(undefined)
    }

    /** Prev button event handler */
    function onPrev(){

        setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));

    }

    

    function onChecked(check){
        setChecked(check)
    }

    const onAnswerSelect = (questionIndex, selectedKey) => {
        setSelectedAnswers(prevSelectedAnswers => {
          const updatedAnswers = [...prevSelectedAnswers];
          updatedAnswers[questionIndex] = selectedKey;
          return updatedAnswers;
        });
      };

      

      const calculatePoints = () => {
        return selectedAnswers.reduce((totalPoints, answer, index) => {
          if (answer && questions[index]?.correct_answer === answer) {
            return totalPoints + 10;
          }
          return totalPoints;
        }, 0);
      };

      const onFinish = () => {
        // navigate('/result', { state: { points: calculatePoints() } });
        const attempts=selectedAnswers.filter(r => r !== undefined).length;
        navigate('/result', { state: { points: calculatePoints(),totalPoints:selectedAnswers.length*10,totalQuestions:selectedAnswers.length,totalAttempts:attempts } });
      };
    
      const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
      };

    if (loading) return <h3 className='text-light'>Loading...</h3>;
    if (error) return <h3 className='text-light'>{error}</h3>;



    /** finished exam after the last question */
    if(currentQuestionIndex > questions.length-1){
        

        const attempts=selectedAnswers.filter(r => r !== undefined).length;
        return navigate('/result', { state: { points: calculatePoints(),totalPoints:selectedAnswers.length*10,totalQuestions:selectedAnswers.length,totalAttempts:attempts } });
    }

  return (
    <>
    <Header/>

    <div className='timer' style={{ color: "#625e5e", fontSize: '1.2em', marginLeft:"1400px",position:"absolute", top:"150px" }}>
                Time Left: {formatTime(timeLeft)}
            </div>

    <div className='container'>
            
        
            <h1 className='title' style={{color:"olive"}}>Quiz Application</h1>
            
        

        {/* display questions */}
        
        <Questions ques={questions[currentQuestionIndex]} 
        
        selectedAnswer={selectedAnswers[currentQuestionIndex]}
        onAnswerSelect={(selectedKey) => onAnswerSelect(currentQuestionIndex, selectedKey)}
        />

        <div className='grid'>
            { currentQuestionIndex > 0 ? <button className='btn prev' onClick={onPrev}>Prev</button> : <div></div>}
            
            { currentQuestionIndex < questions.length-1 ? <button className='btn next' onClick={onNext}>Next</button> : <button className='btn next' onClick={onNext}>Finish</button>}
            
        </div>
    </div>
    </>)
}