$(function () {
    var savedEvents = {}; // Initialize savedEvents variable
  // function to get current date
    function getCurrentDate() {
      var currentDate = dayjs();
      var dayCount = currentDate.date();
      var dayExtn;
  
      if (dayCount >= 11 && dayCount <= 13) {
        dayExtn = "th";
      } else if (dayCount % 10 === 1) {
        dayExtn = "st";
      } else if (dayCount % 10 === 2) {
        dayExtn = "nd";
      } else if (dayCount % 10 === 3) {
        dayExtn = "rd";
      } else {
        dayExtn = "th";
      }
  
      var formattedDate = currentDate.format("dddd, MMMM ") + dayCount + dayExtn;
      $("#currentDay").text(formattedDate);
    }
  // function to update time blocks
    function updateTimeBlocks() {
      var currentHour = dayjs().format("H");
      $(".time-block").each(function() {
        var blockHour = parseInt($(this).attr("id").split("-")[1]);
        $(this).removeClass("past present future");
        if (blockHour < currentHour) {
          $(this).addClass("past");
        } else if (blockHour == currentHour) {
          $(this).addClass("present");
        } else {
          $(this).addClass("future");
        }
      });
    }
  // function to save an event
    function saveEvent() {
      var timeBlockId = $(this).parent().attr("id");
      var description = $(this).siblings(".description").val();
      savedEvents[timeBlockId] = description;
      localStorage.setItem(timeBlockId, description);
    }
  //function to retrieve saved events
    function retrieveSavedEvents() {
      $(".time-block").each(function() {
        var timeBlockId = $(this).attr("id");
        var description = localStorage.getItem(timeBlockId);
        if (description) {
          savedEvents[timeBlockId] = description;
          $(this).find(".description").val(description);
        }
      });
    }
  
    getCurrentDate();
    updateTimeBlocks();
    retrieveSavedEvents();
  
    $(".saveBtn").on("click", saveEvent);
  });
  