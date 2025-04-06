const questionEl = document.getElementById("question");
const choiceBtns = Array.from(document.getElementsByClassName("choice-btn"));
const progressText = document.getElementById("question-number");
const scoreText = document.getElementById("score-value");
const nextBtn = document.getElementById("next-btn");

const gameBox = document.getElementById("game");
const gameOverBox = document.getElementById("game-over");
const finalScore = document.getElementById("final-score");
const saveScoreBtn = document.getElementById("save-score-btn");
const usernameInput = document.getElementById("username");

let currentQuestionIndex = 0;
let score = 0;
let acceptingAnswers = true;

const MAX_QUESTIONS = 10;

const questions = [
    {
      question: "What does AWS stand for?",
      choices: ["Amazon Web Services", "Amazon Web Solutions", "Amazon Web Systems", "Amazon Web Support"],
      answer: 0,
    },
    {
      question: "Which service is used for object storage in AWS?",
      choices: ["EC2", "S3", "RDS", "Lambda"],
      answer: 1,
    },
    {
      question: "What is the main benefit of using AWS?",
      choices: ["High cost", "Scalability", "Limited resources", "Complexity"],
      answer: 1,
    },
    {
      question: "Which AWS service is used for serverless computing?",
      choices: ["EC2", "Lambda", "S3", "RDS"],
      answer: 1,
    },
    {
      question: "Which database service is provided by AWS?",
      choices: ["DynamoDB", "MySQL", "MongoDB", "PostgreSQL"],
      answer: 0,
    },
    {
      question: "Which AWS service is used for scalable computing power?",
      choices: ["Lambda", "EC2", "S3", "CloudFront"],
      answer: 1,
    },
    {
      question: "Which AWS service provides a managed Kubernetes environment?",
      choices: ["EKS", "ECS", "EC2", "Lambda"],
      answer: 0,
    },
    {
      question: "What does IAM stand for in AWS?",
      choices: ["Identity and Access Management", "Internet Access Module", "Internal Authorization Mechanism", "Instance Allocation Manager"],
      answer: 0,
    },
    {
      question: "Which AWS service is used for monitoring and observability?",
      choices: ["CloudWatch", "SNS", "SQS", "Kinesis"],
      answer: 0,
    },
    {
      question: "Which AWS service is used for content delivery?",
      choices: ["CloudFront", "Route 53", "VPC", "Direct Connect"],
      answer: 0,
    },
    {
      question: "Which AWS service is used for relational databases?",
      choices: ["DynamoDB", "RDS", "Redshift", "S3"],
      answer: 1,
    },
    {
      question: "What is AWS Lambda mainly used for?",
      choices: ["Running containerized applications", "Serverless computing", "Database management", "Data storage"],
      answer: 1,
    },
    {
      question: "Which AWS service is used for DNS management?",
      choices: ["Route 53", "CloudFront", "VPC", "Direct Connect"],
      answer: 0,
    },
    {
      question: "Which AWS service is used for message queuing?",
      choices: ["SNS", "SQS", "Kinesis", "CloudTrail"],
      answer: 1,
    },
    {
      question: "Which AWS service is used for real-time data streaming?",
      choices: ["Kinesis", "SQS", "CloudTrail", "IAM"],
      answer: 0,
    }
  ];
  
function startGame() {
  currentQuestionIndex = 0;
  score = 0;
  gameBox.style.display = "block";
  gameOverBox.style.display = "none";
  loadQuestion();
}

function loadQuestion() {
  if (currentQuestionIndex >= MAX_QUESTIONS) {
    return endGame();
  }

  const currentQ = questions[currentQuestionIndex];
  questionEl.textContent = currentQ.question;
  progressText.textContent = currentQuestionIndex + 1;
  scoreText.textContent = score;

  choiceBtns.forEach((btn, index) => {
    btn.textContent = currentQ.choices[index];
    btn.classList.remove("correct", "incorrect");
    btn.disabled = false;
  });

  acceptingAnswers = true;
  nextBtn.style.display = "none";
}

choiceBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedAnswer = index;
    const correct = questions[currentQuestionIndex].answer;

    if (selectedAnswer === correct) {
      score += 10;
      btn.classList.add("correct");
    } else {
      btn.classList.add("incorrect");
      choiceBtns[correct].classList.add("correct");
    }

    choiceBtns.forEach((b) => (b.disabled = true));
    nextBtn.style.display = "inline-block";
  });
});

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  loadQuestion();
});

function endGame() {
  gameBox.style.display = "none";
  gameOverBox.style.display = "block";
  finalScore.textContent = score;
}

// Save score to localStorage
saveScoreBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  if (!username) {
    alert("Please enter your name!");
    return;
  }

  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  const newScore = {
    name: username,
    score: score,
  };

  highScores.push(newScore);
  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.href = "highscores.html";
});

// Start game
startGame();
