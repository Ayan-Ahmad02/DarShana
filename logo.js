window.addEventListener("load", () => {
  setTimeout(() => {
    const splash = document.getElementById("splash");
    splash.style.opacity = "0";
    setTimeout(() => {
      splash.style.display = "none"; 
      document.querySelector("nav.navbar").style.display = "flex"; // show navbar
      document.getElementById("main-content").style.display = "block"; 
    }, 1000);
  }, 3000);
});

// Ai Assistant
  const chatbotIcon = document.getElementById('chatbot-icon');
  const chatbotWindow = document.getElementById('chatbot-window');
  const chatbotClose = document.getElementById('chatbot-close');
  const chatbotMessages = document.getElementById('chatbot-messages');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotSendBtn = document.getElementById('chatbot-send-btn');


  function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.textContent = text;
    chatbotMessages.appendChild(msgDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  chatbotIcon.addEventListener('click', () => {
    chatbotWindow.style.display = 'flex';
    chatbotInput.focus();
    chatbotIcon.style.display = 'none';
  });

  chatbotClose.addEventListener('click', () => {
    chatbotWindow.style.display = 'none';
    chatbotIcon.style.display = 'flex';
  });

  function processUserInput(input) {
    const cleanInput = input.toLowerCase().trim();
    let response = chatbotQA["default"];
    for (const key in chatbotQA) {
      if (cleanInput.includes(key)) {
        response = chatbotQA[key];
        break;
      }
    }
    return response;
  }

  function sendMessage() {
    const userText = chatbotInput.value.trim();
    if (!userText) return;
    appendMessage(userText, 'user');
    chatbotInput.value = '';
    const botReply = processUserInput(userText);
    setTimeout(() => appendMessage(botReply, 'bot'), 600);
  }

  chatbotSendBtn.addEventListener('click', sendMessage);
  chatbotInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
