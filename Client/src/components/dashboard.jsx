import Header from "./Header";

import { Link } from 'react-router-dom'

 import '../styles/Main.css'
 import '../styles/App.css'
 import photo from "../photos/a.avif"



function Dashboard() {

    

    function startQuiz(){
        if(inputRef.current?.value){
            dispatch(setUserId(inputRef.current?.value))
        }
    }

    return ( <>
    <Header/>
    
    <div className='container1' style={{ position: "relative", width: "1500px", height: "700px" }}>
    <img src={photo} className="card-img-top rounded-3" alt="..." style={{ width: "1620px", height: "707px",position:"absolute", left:"0", top:"49px" }} />
        <div style={{ position: "absolute", top: "55%", left: "55%", transform: "translate(-50%, -50%)" }}>
            <h1 className='title' style={{color:"olive"}}>Quiz Application</h1>

            <ol>
                <li>You will be asked 10 questions one after another.</li>
                <li>10 points is awarded for the correct answer.</li>
                <li>Each question has four options. You can choose only one options.</li>
                <li>You can review and change answers before the quiz finish.</li>
                <li>The result will be declared at the end of the quiz.</li>
            </ol>


            <div className='start'>
                <Link className='btn' to={'/quiz'} onClick={startQuiz}>Start Quiz</Link>
            </div>
        </div>
        
    </div>
    
       
    </> );
}

export default Dashboard;