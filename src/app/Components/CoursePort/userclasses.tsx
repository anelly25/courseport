import React from 'react';
import { Course } from './Data'; // Import the Course interface if not already imported

// Update the UserClassList props to include typing for selectedClasses
function UserClassList({ selectedClasses }: { selectedClasses: Course[] }) {
  return (
    <>
      <h3>Selected Classes</h3>
      <ul>
        {selectedClasses.map((cls) => (
          <li key={`${cls.number}-${cls.section}`}>
            {cls.title} at {cls.begin} - {cls.end} // Adjust these properties if they do not exist on Course
          </li>
        ))}
      </ul>
    </>
  );
}

export default UserClassList;

