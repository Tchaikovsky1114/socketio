// returns HTML that will look good in the Dom for messages;
const buildMessageHtml = ({userName,date,avatar,newMessage}) => {
  const localTime = 9 * 60 * 60 * 1000 // 9 hour
  const messageDate = new Date(date);
  const currentTime = new Date(messageDate.getTime() + localTime).toISOString().replace('T', ' ').slice(0, -5);
  return `
  <li>
    <div class="user-image">
        <img src=${avatar} />
    </div>
    <div class="user-message">
        <div class="user-name-time">${userName} <span>${currentTime}</span></div>
        <div class="message-text">${newMessage}</div>
    </div>
  </li>
  `
  }
