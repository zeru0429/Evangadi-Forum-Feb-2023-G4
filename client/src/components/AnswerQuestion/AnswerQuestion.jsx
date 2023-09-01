import axios from '../../utility/axios';
import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../../utility/stateprovider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./AnswerQuestion.css";

const AnswerQuestion = ({ questionId }) => {
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [reloadComponent, setReloadComponent] = useState(false);

  useEffect(() => {
    if (reloadComponent) {
      // Fetch updated data or perform any necessary actions here
      setReloadComponent(false);
    }
  }, [reloadComponent]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({
      user_id: user.user.id,
      question_id: questionId,
      answer: form.answer,
    });

    try {
      const response = await axios.post(
        "/api/answers/newanswer",
        {
          user_id: user.user.id,
          question_id: questionId,
          answer: form.answer,
        }
      );
      alert(response.data.msg);
      setReloadComponent(true); // Trigger component reload
    } catch (err) {
      alert(err.response.data.msg);
      console.log("problem", err.response.data.msg);
    }
  };

  return (
    <div className="container my-5">
      {reloadComponent ? (
        <p>Loading...</p> // Show a loading indicator while the component reloads
      ) : (
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column p-5 answer_form  justify-content-between"
        >
          <h3 className="">Answer The Top Question</h3>
          <Link
            to="/"
            className="text-decoration-none text-reset cursor-pointer"
          >
            Go to Question page
          </Link>
          <textarea
            onChange={handleChange}
            className="answer_input"
            placeholder="Your Answer..."
            name="answer"
            id=""
          ></textarea>
          <button className="answer_post_btn" type="">
            Post Your Answer
          </button>
        </form>
      )}
    </div>
  );
};

export default AnswerQuestion;