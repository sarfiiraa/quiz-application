import React, { useEffect, useState } from 'react'
import axios from "axios";


    export default function Questions({ques,selectedAnswer, onAnswerSelect }) {

     const [checked, setChecked] = useState(undefined)
    

    function onSelect(key){
       
        setChecked(key)
        onAnswerSelect(key);  // Notify the parent component about the selected answer
        
    }

    

    if (!ques) return <h3 className='text-light'>No question data available</h3>;
    

  return (
    <div className='questions'>
        <h2 className='' style={{color:"#625e5e"}}>{ques?.question}</h2>

        <ul key={ques?.id}>
            {
               ques?.answers &&  Object.entries(ques.answers).map(([key,value]) => (
                    value && (
                        <li key={key}>
                            <input 
                                type="radio"
                                value={key}
                                name={`options-${ques.id}`}
                                id={`q${key}-option`}
                                onChange={() => onSelect(key)}
                                checked={selectedAnswer === key}
                            />

                            <label className='text-primary' htmlFor={`q${key}-option`}>{value}</label>
                            
                            <div className={`check ${selectedAnswer === key ? 'checked' : ''}`}></div>
                            
                        </li>
                    )
                ))
            }
        </ul>
    </div>
  )
}