declare module "@daypilot/daypilot-lite-react" {
  import React from 'react';

  export class DayPilotCalendar extends React.Component<any, any> {
    control: ControlType; // Replace ControlType with the actual type
  }

  export class DayPilotDate {
    constructor(date: string | Date);
    static today(): DayPilotDate;
    addDays(days: number): DayPilotDate;
    addMinutes(minutes: number): DayPilotDate; // Add this method
    // ... add more methods and properties as needed
  }

  export const DayPilot: {
    Modal: any; // Specify the correct type instead of `any` if available
    Navigator: any; // Same here, replace `any` with the correct type
    guid(): string; // Added guid method
    Date: typeof DayPilotDate; // Add the DayPilot.Date class
    // ... other members of DayPilot
  };
}
