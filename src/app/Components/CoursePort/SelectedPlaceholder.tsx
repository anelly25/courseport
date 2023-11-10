import React, { useContext, useEffect, useRef, useState } from 'react';
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";

import { useScheduleContext } from './ScheduleProvider';
import { Course } from './Data'; // make sure to import the Course type

const styles = {
  wrap: {
    display: "flex"
  },
  left: {
    marginRight: "10px"
  },
  main: {
    flexGrow: "1"
  }
};

const CourseCalendar = () => {
  const { selectedCourses } = useScheduleContext();
  const calendarRef = useRef<DayPilotCalendar>(null);

  // Helper function to parse time strings into minutes
  const parseTime = (timeStr: string) => {
    // Ensure the time string is 4 characters long, pad with zeros if necessary
    timeStr = timeStr.padStart(4, '0');
    let hours = parseInt(timeStr.substring(0, 2), 10);
    const minutes = parseInt(timeStr.substring(2), 10);
  
    // If the hour part is less than 8, it's PM, add 12 to convert to 24-hour format.
    // If it's 0, then it's 12 AM. Otherwise, no change is needed.
    if (hours > 0 && hours < 8) {
      hours += 12;
    }
  
    return hours * 60 + minutes; // Convert hours to minutes and add to minutes
  };
  
  
  

  // Convert selected courses to DayPilot events
  type DayKey = 'M' | 'T' | 'W' | 'TH' | 'F';

  const getCourseEvents = (courses: Course[]) => {
    const dayMap: Record<DayKey, string> = {
      M: '2023-10-02',
      T: '2023-10-03',
      W: '2023-10-04',
      TH: '2023-10-05',
      F: '2023-10-06'
    };
  
    return courses.map((course) => {
      let days: string[];
      if (course.days.includes("TH")) {
        days = course.days.replace("TH", ",TH").split(",");
      } else {
        days = course.days.split("");
      }
  
      // Ensure that days are of type DayKey[]
      days = days.filter((day): day is DayKey => day in dayMap);
  
      return days.map((day) => {
        const dayKey = day as DayKey; // Cast day to DayKey
        const start = new DayPilot.Date(dayMap[dayKey]).addMinutes(parseTime(course.begin));
        const end = new DayPilot.Date(dayMap[dayKey]).addMinutes(parseTime(course.end));
        return {
          id: DayPilot.guid(),
          text: `${course.title} - ${course.abbreviation} ${course.number}`,
          start: start.toString(),
          end: end.toString(),
          backColor: "#6aa84f"
        };
      }).filter(event => event !== null); // Filter out any null values from invalid days
    }).flat();
  };
  

  // Calendar configuration state
  const [calendarConfig, setCalendarConfig] = useState({
    viewType: "Week",
    durationBarVisible: false,
    timeRangeSelectedHandling: "Disabled",
    eventDeleteHandling: "Update",
    // ... other config options
  });

  // Update the calendar with selected courses
  useEffect(() => {
    if (calendarRef.current) {
      const events = getCourseEvents(selectedCourses);
      const startDate = "2023-10-02"; // This should be dynamically determined based on the actual dates
      // Assuming 'update' is the correct method to update events, otherwise, adjust to match the DayPilot API
      calendarRef.current.control.update({ startDate, events });
    }
  }, [selectedCourses]);

  return (
    <div style={styles.wrap}>
      <div style={styles.main}>
        <DayPilotCalendar
          {...calendarConfig}
          ref={calendarRef}
        />
      </div>
    </div>
  );
}

export default CourseCalendar;
