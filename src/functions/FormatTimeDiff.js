function FormatTimeDiff(time='') {
    const currentTime = new Date();
    const givenTime = new Date(time);
    const timeDiffInMs = currentTime - givenTime;
  
    // Define conversion factors for different time units
    const msInSecond = 1000;
    const msInMinute = 60 * msInSecond;
    const msInHour = 60 * msInMinute;
    const msInDay = 24 * msInHour;
    const msInWeek = 7 * msInDay;
    const msInMonth = 30 * msInDay;
    const msInYear = 365 * msInDay;
  
    // Determine the appropriate time unit to use
    if (timeDiffInMs < msInSecond) {
      return 'just now';
    } else if (timeDiffInMs < msInMinute) {
      const seconds = Math.floor(timeDiffInMs / msInSecond);
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    } else if (timeDiffInMs < msInHour) {
      const minutes = Math.floor(timeDiffInMs / msInMinute);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (timeDiffInMs < msInDay) {
      const hours = Math.floor(timeDiffInMs / msInHour);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (timeDiffInMs < msInWeek) {
      const days = Math.floor(timeDiffInMs / msInDay);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (timeDiffInMs < msInMonth) {
      const weeks = Math.floor(timeDiffInMs / msInWeek);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (timeDiffInMs < msInYear) {
      const months = Math.floor(timeDiffInMs / msInMonth);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(timeDiffInMs / msInYear);
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
}

export default FormatTimeDiff;