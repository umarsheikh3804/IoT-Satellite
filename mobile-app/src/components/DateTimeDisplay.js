const DateTimeDisplay = ({ currentTime }) => {
    const formatTime = (time) => {
      const options = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      return new Intl.DateTimeFormat("en-US", options).format(time);
    };
  
    const formatDate = (time) => {
      const options = {
        weekday: "short",
        month: "long",
        day: "numeric",
      };
      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(time);
      
      // Split the formatted date by comma and space, then join the parts
      const dateParts = formattedDate.split(", ");
      const formattedParts = dateParts.filter(part => part !== undefined && part !== null);
  
      return formattedParts.join(" ");
    };
  
    return (
      <div className="dateTimeContainer">
        <div className="dateDisplay">
          <p className="currentDate">{formatDate(currentTime)}</p>
        </div>
      </div>
    );
  };

export default DateTimeDisplay