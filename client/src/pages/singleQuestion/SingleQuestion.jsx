import axios from "../../utility/axios";
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './questionDetail.css'
import AnswerQuestion from '../../components/AnswerQuestion/AnswerQuestion';
import Answer from '../../components/answers/Answers';
import { useStateValue } from "../../utility/stateprovider";


const SingleQuestion = () => {
  let params = useParams();
   const [{ user }, dispatch] = useStateValue();
  const [question, setQuestion] = useState([]);
  const [answers, setAnswers] = useState([]);
   const navigate = useNavigate();
  useEffect(() => {
    if (!user) { 
      navigate('/login');
    }
    // console.log(user);

  }, [navigate])
  
  useEffect(() => { 
    async function fetchData() {
      try {
        const response = await axios.get(`/api/questions/:${params.id}`);
        setQuestion(response.data.data);
      } catch (err) {
        alert(err);
        console.log("problem", err);
      }
      
      answersByQuestionId();

    }
    fetchData();


  }, []);
  
  const answersByQuestionId = async () => {
    try {
      const answersRes = await axios.get(
        `/api/answers/:${params.id}`
      );
      setAnswers(answersRes.data.data);
    } catch (err) {
      console.log("problem", err);
    }
  };
 // console.log(answers);
  return (
    <div className="container">
      <h2>Question</h2>
      <h4>{question?.question}</h4>
       <h5>{question?.category}</h5>
      <h5>{question?.question_descrih5tion}</h5>
      <h6>{question?.inserted_datetime}</h6>
      <hr />
      <hr />
      <div>{answers.length > 0 && <h3>Answer From The Community</h3>}</div>
          {answers && answers?.map((answer) => (
        
            <Answer key={answer?.answer_id} answer={answer?.answer} userName={answer.user_name} profile={answer.image_url} answered_date={ answer.answered_date} />
       
      ))}
      <AnswerQuestion questionId={question?.question_id}/>
      <hr />
    </div>

  )
}

export default SingleQuestion