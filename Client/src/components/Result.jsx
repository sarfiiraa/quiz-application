import React, { useEffect } from 'react'
import '../styles/Result.css';
import { Link } from 'react-router-dom';
import Header from './Header';
import { useLocation } from 'react-router-dom';



export default function Result() {

    

    const location = useLocation();

    const totalPoints = location.state?.totalPoints; 
    const totalQuestions=location.state?.totalQuestions; 
    const attempts = location.state?.totalAttempts;
    const earnPoints = location.state?.points || 0;
    let flagged = false;
    const name=localStorage.getItem("name")

    if((earnPoints/totalPoints)*100>=40){
        flagged=true;
    }


    function onRestart(){
        
    }

  return (
        <>
            <Header/>
            <div className='container'>
                <h1 className='title' style={{color:"olive"}}>Quiz Application</h1>

                <div className='result flex-center'>
                    <div className='flex'>
                        <span>Username</span>
                        <span className='bold'>{name}</span>
                    </div>
                    <div className='flex'>
                        <span>Total Quiz Points : </span>
                        <span className='bold'>{totalPoints || 0}</span>
                    </div>
                    <div className='flex'>
                        <span>Total Questions : </span>
                        <span className='bold'>{ totalQuestions || 0}</span>
                        
                    </div>
                    <div className='flex'>
                        <span>Total Attempted : </span>
                        <span className='bold'>{attempts || 0}</span>
                    </div>
                    <div className='flex'>
                        <span>Total Earn Points : </span>
                        <span className='bold'>{earnPoints || 0}</span>
                    </div>
                    <div className='flex'>
                        <span>Quiz Result</span>
                        <span style={{ color : `${flagged ? "#2aff95" : "#ff2a66" }` }} className='bold'>{flagged ? "Passed" : "Failed"}</span>
                    </div>
                </div>

                <div className="start">
                    <Link className='btn' to={'/dashboard'} onClick={onRestart}>Restart</Link>
                </div>

            </div>
        </>
  )
}