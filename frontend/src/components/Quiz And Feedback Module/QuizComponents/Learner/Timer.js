import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchlearnerscoreRequest } from "../../../../actions/Quiz And Feedback Module/Learner/LearnerScorePageAction";
import { useNavigate } from "react-router-dom";
import "../../../../Styles/Quiz And Feedback Module/Learner/Timer.css";
import Swal from "sweetalert2";
import { submitAttemptRequest } from "../../../../actions/Quiz And Feedback Module/Learner/SubmitAttemptAction";

function DynamicTimer() {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const learnersAttemptId = sessionStorage.getItem("learnerAttemptId");

  useEffect(() => {
    if (learnersAttemptId) {
      dispatch(fetchlearnerscoreRequest(learnersAttemptId));
    }
  }, [dispatch, learnersAttemptId]);

  const learnerAttempt = useSelector(
    (state) => state.learnerscore.learnerscoredetails
  );

  useEffect(() => {
    if (learnerAttempt) {
      setStartTime(learnerAttempt.startTime);
      setEndTime(learnerAttempt.endTime);
    }
  }, [learnerAttempt]);

  const handleAutoSubmit = () => {
    if (learnersAttemptId) {
      dispatch(submitAttemptRequest(learnersAttemptId))
        .then(() => {
          const Toast = Swal.mixin({
            customClass: "swal2-toast-quiz-time-end",
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 2000,
            background: "red",
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "error",
            title: "Time's up! Your quiz will be automatically submitted.",
            color: "white",
          });
          setTimeout(() => {
            navigate(`/learnerscorepage`);
          }, 2000);
        })
        .catch((error) => {
          console.error("Error submitting quiz:", error);
        });
    }
  };

  return (
    <div>
      <br />
      <Timer
        startTime={startTime}
        endTime={endTime}
        onTimeUp={handleAutoSubmit}
      />
    </div>
  );
}

const Timer = ({ startTime, endTime, onTimeUp }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeLeft, setTimeLeft] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    if (!startTime || !endTime) return;

    const start = new Date(startTime);
    const end = new Date(endTime);
    const totalDuration = end - start;

    const interval = setInterval(() => {
      const now = new Date();

      if (now >= start && now <= end) {
        setIsRunning(true);
        const timeDifference = end - now;
        setTimeLeft(timeDifference > 0 ? timeDifference : 0);

        if (timeDifference <= 60 * 1000) {
          setBlink((prevBlink) => !prevBlink);
        } else {
          setBlink(false);
        }
      } else if (now > end) {
        setIsRunning(false);
        setTimeLeft(0);
        clearInterval(interval);
        if (onTimeUp && typeof onTimeUp === "function") {
          onTimeUp();
        }
      }

      setCurrentTime(now);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, endTime, onTimeUp]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const getBorderColor = () => {
    if (!startTime || !endTime || !timeLeft) return "green";

    const totalDuration = new Date(endTime) - new Date(startTime);
    const halfTime = totalDuration / 2;
    const oneMinute = 60 * 1000;

    if (timeLeft <= oneMinute) {
      return "red";
    } else if (timeLeft <= halfTime) {
      return "#E4A11B";
    } else {
      return "green";
    }
  };

  const getBorderStyle = () => {
    if (!startTime || !endTime || !timeLeft)
      return { top: "0%", right: "0%", bottom: "0%", left: "0%" };

    const totalDuration = new Date(endTime) - new Date(startTime);
    const progressPercentage = (timeLeft / totalDuration) * 100;

    return {
      top:
        progressPercentage > 75
          ? `${100 - (progressPercentage - 75) * 4}%`
          : "0%",
      right:
        progressPercentage > 50 && progressPercentage <= 75
          ? `${(progressPercentage - 50) * 4}%`
          : "0%",
      bottom:
        progressPercentage > 25 && progressPercentage <= 50
          ? `${(progressPercentage - 25) * 4}%`
          : "0%",
      left: progressPercentage <= 25 ? `${progressPercentage * 4}%` : "0%",
    };
  };

  return (
    <div
      className={`timer-rectangle ${blink ? "blink" : ""}`}
      style={{
        boxShadow: `0 0 0 3px ${getBorderColor()}`,
        borderTopWidth: getBorderStyle().top,
        borderRightWidth: getBorderStyle().right,
        borderBottomWidth: getBorderStyle().bottom,
        borderLeftWidth: getBorderStyle().left,
      }}
    >
      <h5 id="timerclass">Time Left: {formatTime(timeLeft)}</h5>
    </div>
  );
};

export default DynamicTimer;
