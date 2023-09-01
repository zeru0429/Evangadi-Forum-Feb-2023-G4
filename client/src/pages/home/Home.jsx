import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import './home.css'
import axios from "../../utility/axios";

const Home = () => {
  const [allQuestions, setallQuestions] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/questions/');
        setallQuestions(response.data.data);
      } catch (err) {
        alert(err);
        console.log("problem", err);
      }
    }
    fetchData();
  }, []);

return (
    <div className="container my-5 home-container">
      <div className="d-flex mb-5 justify-content-between">
        <Link to='AskQuestion' ><button className="ask_button" >
          Ask Question
        </button></Link>
        <h4>Welcome</h4>
      </div>
      <h3>Questions</h3>
      <div>
      {allQuestions.map((question) => (
          <div key={question.question_id}>
            <Link
              to={`/SingleQuestion/${question.question_id}`}
              className="text-decoration-none text-reset"
           >
            <p>{question.question}</p>
            <hr />
          
              
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home