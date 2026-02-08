import React, { useEffect, useState } from "react";
import { TopicScoreApi } from "../../middleware/LearnerMiddleware/TopicScoreApi";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchQuizIdRequest } from "../../actions/Quiz And Feedback Module/Learner/FetchQuizIdAction";
import LearnerNavbar from "..//LearnerComponent/LearnerNavbar";
import "../.././Styles/Learner/TopicScore.css";
import {
  Container,
  Typography,
  Box,
  Button,
  Tooltip,
  SvgIcon,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import ReplayIcon from "@mui/icons-material/Replay";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

const AnimatedTypography = motion(Typography);

function TopicScore() {
  const [LearnerId] = useState(sessionStorage.getItem("UserSessionID"));
  const [TopicId] = useState(sessionStorage.getItem("topicId"));
  const [ViewScoresList, setViewScoresList] = useState([]);
  // const [activePlant, setActivePlant] = useState(null);
  // const [activeSoldier,setActiveSoldier] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [theme, setTheme] = useState("garden");

  useEffect(() => {
    scoreFetch(LearnerId, TopicId);
  }, [LearnerId, TopicId]);

  const scoreFetch = async (LearnerId, TopicId) => {
    try {
      const ScoreDataArray = await TopicScoreApi(LearnerId, TopicId);
      setViewScoresList(ScoreDataArray);
    } catch (error) {
      console.error("error in fetch", error);
    }
  };

  const handleThemeChange = (event, newTheme) => {
    if (newTheme !== null) {
      setTheme(newTheme);
    }
  };

  if (!ViewScoresList || ViewScoresList.length === 0) {
    return (
      <div>
        <LearnerNavbar />
        <Container maxWidth="md" style={{ marginTop: "2rem" }}>
          <Typography variant="h4" align="center">
            {theme === "garden"
              ? "Your fairy garden is waiting to bloom. Take a quiz to plant your first magical seed!"
              : "Your warfield is empty. Take a quiz to deploy your first soldier!"}
          </Typography>
        </Container>
      </div>
    );
  }
  return (
    <>
      <LearnerNavbar />
      <Container maxWidth="md" style={{ marginTop: "2rem" }}>
        <Box display="flex" justifyContent="center" mb={2}>
          <ToggleButtonGroup
            value={theme}
            exclusive
            onChange={handleThemeChange}
            aria-label="theme selection"
          >
            <ToggleButton value="garden" aria-label="enchanting garden">
              Enchanting Garden
            </ToggleButton>
            <ToggleButton value="warfield" aria-label="warfield">
              Warfield
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <AnimatedTypography
          variant="h3"
          align="center"
          gutterBottom
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {theme === "garden"
            ? "Your Enchanted Fairy Garden"
            : "Your Desert Warfield"}
        </AnimatedTypography>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{
            background:
              theme === "garden"
                ? "linear-gradient(to bottom, #87CEEB, #7CFC00)"
                : "linear-gradient(to bottom, #FFD700, #DAA520)",
            padding: "2rem",
            borderRadius: "15px",
            position: "relative",
            overflow: "hidden",
            minHeight: "500px",
          }}
        >
          <motion.div
            animate={
              theme === "garden"
                ? { y: [0, -10, 0] }
                : { y: [0, -10, 0], rotate: 360 }
            }
            transition={{
              duration: theme === "garden" ? 5 : 10,
              repeat: Infinity,
            }}
            style={{ position: "absolute", top: "10px", right: "10px" }}
          >
            <WbSunnyIcon
              style={{
                fontSize: theme === "garden" ? 60 : 80,
                color: theme === "garden" ? "#FFD700" : "#FF6347",
              }}
            />
          </motion.div>
          {theme === "garden"
            ? [...Array(3)].map((_, index) => (
                <motion.div
                  key={index}
                  animate={{ x: [0, 20, 0] }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    delay: index * 2,
                  }}
                  style={{
                    position: "absolute",
                    top: `${index * 15 + 5}%`,
                    left: "5%",
                  }}
                >
                  <CloudIcon style={{ fontSize: 40, color: "white" }} />
                </motion.div>
              ))
            : [...Array(5)].map((_, index) => (
                <motion.div
                  key={index}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 5, repeat: Infinity, delay: index }}
                  style={{
                    position: "absolute",
                    top: `${Math.random() * 80 + 10}%`,
                    left: `${Math.random() * 80 + 10}%`,
                  }}
                >
                  <LocalFloristIcon
                    style={{ fontSize: 40, color: "#006400" }}
                  />
                </motion.div>
              ))}
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            gap={4}
            sx={{
              marginTop: "50px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {ViewScoresList.map((scoreItem, index) => (
              <ScoreItem
                key={index}
                scoreItem={scoreItem}
                setActiveItem={setActiveItem}
                isActive={activeItem === scoreItem.topicId}
                theme={theme}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </>
  );
}

function ScoreItem({ scoreItem, setActiveItem, isActive, theme }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [reattemptClicked, setReattemptClicked] = useState(false);
  const [isRaining, setIsRaining] = useState(false);

  const fetchquizid = (topicId) => {
    console.log("handleAddQuiz called with topicId:", topicId);
    sessionStorage.setItem("topicId", topicId);
    dispatch(fetchQuizIdRequest(topicId));
    setTimeout(() => {
      navigate("/instruction");
    }, 500);
  };

  const handleMouseEnter = () => {
    if (scoreItem.score >= scoreItem.passMark) {
      setActiveItem(scoreItem.topicId);
      if (theme === "garden") {
        setIsRaining(true);
      }
    }
  };

  const handleMouseLeave = () => {
    setActiveItem(null);
    setIsRaining(false);
  };

  const createRain = () => {
    return [...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="raindrop"
        initial={{ y: -50, x: Math.random() * 60 - 30 }}
        animate={{ y: 100 }}
        transition={{
          duration: 0.5 + Math.random() * 0.5,
          repeat: Infinity,
          repeatType: "loop",
          delay: Math.random() * 0.5,
        }}
        style={{
          position: "absolute",
          width: "2px",
          height: "20px",
          background: "linear-gradient(transparent, #4169E1)",
          borderRadius: "50%",
        }}
      />
    ));
  };

  const createEffects = () => {
    if (theme === "garden") {
      return [...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="butterfly"
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          style={{
            position: "absolute",
            width: "10px",
            height: "10px",
            backgroundColor: "#FF69B4",
            borderRadius: "50%",
          }}
        />
      ));
    } else {
      return [...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="firework"
          initial={{ scale: 0, opacity: 1 }}
          animate={{
            scale: [0, 1, 1.2, 1],
            opacity: [1, 1, 0],
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
          }}
          transition={{ duration: 0.5, delay: Math.random() * 0.2 }}
          style={{
            position: "absolute",
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            backgroundColor: ["#FF69B4", "#FFD700", "#FF6347", "#00CED1"][
              Math.floor(Math.random() * 4)
            ],
          }}
        />
      ));
    }
  };

  return (
    <Tooltip
      title={`${scoreItem.topicName}: ${scoreItem.score}/${scoreItem.passMark}`}
    >
      <Box
        textAlign="center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ position: "relative", overflow: "hidden" }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={isActive ? { y: [0, -10, 0] } : {}}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          {theme === "garden" ? (
            <LocalFloristIcon
              style={{
                fontSize: scoreItem.score >= scoreItem.passMark ? 100 : 60,
                color:
                  scoreItem.score >= scoreItem.passMark ? "#FF69B4" : "#8B4513",
              }}
            />
          ) : scoreItem.score >= scoreItem.passMark ? (
            <SentimentSatisfiedAltIcon
              style={{
                fontSize: 80,
                color: "#006400",
              }}
            />
          ) : (
            <SentimentVeryDissatisfiedIcon
              style={{
                fontSize: 80,
                color: "#8B0000",
                transform: "rotate(90deg)",
              }}
            />
          )}
        </motion.div>
        <Typography variant="body2">{scoreItem.topicName}</Typography>
        {scoreItem.score < scoreItem.passMark && !reattemptClicked && (
          <Button
            variant="contained"
            size="small"
            startIcon={<ReplayIcon />}
            onClick={() => {
              fetchquizid(scoreItem.topicId);
              setReattemptClicked(true);
            }}
            style={{
              marginTop: "0.5rem",
              background: theme === "garden" ? "#4CAF50" : "#B8860B",
            }}
          >
            {theme === "garden" ? "Nurture" : "Revive"}
          </Button>
        )}
        {isActive && scoreItem.score >= scoreItem.passMark && createEffects()}
        {isRaining && theme === "garden" && createRain()}
      </Box>
    </Tooltip>
  );
}

export default TopicScore;
