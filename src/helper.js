export const timeAgo = (date) => {
    const diffInMilliseconds = new Date() - new Date(date);
    const diffInSeconds = diffInMilliseconds / 1000;
    const diffInMinutes = diffInSeconds / 60;
    const diffInHours = diffInMinutes / 60;
    const diffInDays = diffInHours / 24;
    const diffInMonths = diffInDays / 30.4375; // Average number of days in a month
    const diffInYears = diffInMonths / 12;
  
    if (diffInYears >= 1) {
      return `${Math.floor(diffInYears)} year(s) ago`;
    } else if (diffInMonths >= 1) {
      return `${Math.floor(diffInMonths)} month(s) ago`;
    } else if (diffInDays >= 1) {
      return `${Math.floor(diffInDays)} day(s) ago`;
    } else if (diffInHours >= 1) {
      return `${Math.floor(diffInHours)} hour(s) ago`;
    } else if (diffInMinutes >= 1) {
      return `${Math.floor(diffInMinutes)} minute(s) ago`;
    } else {
      return `${Math.floor(diffInSeconds)} second(s) ago`;
    }
  };
  