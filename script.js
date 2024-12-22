// 定義問題
const dailyQuestions = [
    {
        question: "謝小彤覺得自己胖了，你應該要...？",
        answers: ["嘲笑她：你以前也沒瘦過啊", "邀她一起健身", "誇獎她很瘦"],
        correctAnswer: "誇獎她很瘦",
        reward: "遊戲陪玩券"
    },
    {
        question: "冬天到了，謝小彤穿少了覺得好冷，你應該要...?",
        answers: ["把他手放到自己屁股底下取暖", "抱她並且把她藏到自己外套裡給她取暖", "說：哈哈哈幸好我穿的多"],
        correctAnswer: "抱她並且把她藏到自己外套裡給她取暖",
        reward: "遊戲券"
    },
    {
        question: "謝小彤半夜突然餓了，你應該要...",
        answers: ["笑她這麼晚還吃", "勸她注意身材", "哄她睡覺"],
        correctAnswer: "哄她睡覺",
        reward: "吃你想吃的券"
    },
    {
        question: "下列哪種行為是謝小彤已經生氣了",
        answers: ["突然不說話", "皺眉頭", "大喊：你偷看別的女生～"],
        correctAnswer: "突然不說話",
        reward: "誇誇券"
    },
    {
      question: "謝小彤的生日是幾月幾日？",
      answers: ["12月25日", "9月29日", "10月10日"],
      correctAnswer: "9月29日",
      reward: "認錯券"
    },
    {
      question: "謝小彤最喜歡的顏色是什麼？",
      answers: ["紅色", "藍色", "粉色"],
      correctAnswer: "粉色",
      reward: "一天無限抱抱券"
    },
    {
      question: "謝小彤的最愛食物是什麼？",
      answers: ["鮭魚壽司", "披薩", "麥當勞薯條"],
      correctAnswer: "鮭魚壽司",
      reward: "一天無限貼貼券"
    },
    {
      question: "謝小彤最喜歡的電影是什麼？",
      answers: ["富都青年", "獅子王", "咒"],
      correctAnswer: "獅子王",
      reward: "一秒消氣券"
    },
    {
      question: "謝小彤的寵物是什麼？",
      answers: ["貓", "狗", "兔子"],
      correctAnswer: "狗",
      reward: "我口渴啦券"
    },
    {
      question: "謝小彤想要的旅遊地點是什麼？",
      answers: ["巴黎", "東京", "紐約"],
      correctAnswer: "巴黎",
      reward: "和好券"
    },
    {
        question: "謝小彤的身高？",
        answers: ["188", "158", "157.8"],
        correctAnswer: "158",
        reward: "聽話卡"
    },
    {
        question: "謝小彤有多愛林小強",
        answers: ["宇宙無敵愛", "愛的比林小強多", "超級無敵世界霹靂宇宙愛"],
        correctAnswer: "愛的比林小強多",
        reward: "我想吃零食啦卡"
    },
    {
        question: "謝小彤隱眼度數多少？",
        answers: ["700", "800", "650"],
        correctAnswer: "700",
        reward: "誇誇券"
    },
    {
        question: "謝小彤最討厭林小強做什麼事？",
        answers: ["打遊戲不理她", "毀了她的分享慾", "出門一直睡覺"],
        correctAnswer: "毀了她的分享慾",
        reward: "一秒消氣券"
    },
    {
        question: "謝小彤腳腳多大",
        answers: ["跟地球一樣", "38.5", "38"],
        correctAnswer: "38.5",
        reward: "誇誇券"
    },
];

// 確保抽卡按鈕被啟用（如果當天尚未抽卡）
const drawCardButton = document.getElementById("draw-card");
const dailyMessage = document.getElementById("daily-message");
const timer = document.getElementById("timer");
let today = new Date().toLocaleDateString();
let lastVisit = localStorage.getItem("lastVisit");

const questionBox = document.createElement("div");
questionBox.classList.add("question-box");
const answerButtons = [];

// 计算倒计时
function calculateCountdown() {
  const now = new Date();
  const nextVisit = new Date();
  nextVisit.setDate(now.getDate() + 1);
  nextVisit.setHours(0, 0, 0, 0);

  const diffTime = nextVisit - now;
  const hours = Math.floor(diffTime / (1000 * 60 * 60));
  const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

  timer.textContent = `倒計時：${hours}小時 ${minutes}分鐘 ${seconds}秒`;
}

// 生成每日问题并显示
function askQuestion() {
  const randomQuestion = dailyQuestions[Math.floor(Math.random() * dailyQuestions.length)];
  questionBox.innerHTML = `<h2>${randomQuestion.question}</h2>`;

  randomQuestion.answers.forEach((answer, index) => {
    const answerBtn = document.createElement("button");
    answerBtn.textContent = answer;
    answerBtn.classList.add("answer-btn");
    answerBtn.addEventListener("click", () => {
      if (answer === randomQuestion.correctAnswer) {
        showReward(randomQuestion.reward);
      } else {
        alert("答錯了！你不愛我了！");
        disableAnswers(); // 禁用所有答案按鈕
      }
    });
    answerButtons.push(answerBtn);
    questionBox.appendChild(answerBtn);
  });

  document.body.appendChild(questionBox);
}

// 禁用所有答案按鈕
function disableAnswers() {
  answerButtons.forEach(button => {
    button.disabled = true;
  });
}

// 显示奖励
function showReward(reward) {
  const rewardCard = document.createElement("div");
  rewardCard.id = "reward-card";
  rewardCard.innerHTML = `<h3>恭喜你！你獲得了：${reward}</h3>`;
  document.body.appendChild(rewardCard);
  localStorage.setItem("lastVisit", today);
  drawCardButton.disabled = true;
  dailyMessage.textContent = "今天你已經抽過卡，明天再來試試！";
}

// 每天抽卡逻辑
if (today !== lastVisit) {
  drawCardButton.disabled = false;
  dailyMessage.textContent = "準備好抽卡了嗎？";
} else {
  dailyMessage.textContent = "今天你已經抽過卡，明天再來試試！";
  calculateCountdown();
  setInterval(calculateCountdown, 1000);
}

// 绑定抽卡按钮事件
drawCardButton.addEventListener("click", () => {
  askQuestion();
  drawCardButton.disabled = true;
});