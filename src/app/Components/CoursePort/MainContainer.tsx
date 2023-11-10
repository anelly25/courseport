'use client'

/* import { Popover } from "../UI/Popover"; */
import { useScheduleContext } from "./ScheduleProvider";
import { useState, useEffect } from "react";
import { Course } from "./Data";
import { columns } from "./Columns";
import { DataTable } from "./DataTable"
import  SelectedPlaceHolder  from "./SelectedPlaceholder";

function MainContainer() {
  const {
    selectedSemester,
    setSelectedSemester,
    selectedCourses,
    setSelectedCourses,
    selectedDepartment,
    setSelectedDepartment,
    database,
    activePageIndex,
    setActivePageIndex
  } = useScheduleContext();
  const [filteredData, setFilteredData] = useState<Course[]>([]);

  // Use useEffect to update filtered data when selectedSemester or selectedDepartment changes
  useEffect(() => {
    const filteredSemester = database.find(
      (semester) => semester.semesterTitle === selectedSemester
    );

    /* console.log('Filtered Semester:', filteredSemester); */
    if (filteredSemester) {
      const filteredDepartment = filteredSemester.departments.find(
        (dept) => dept.departmentTitle === selectedDepartment
      );
      if (filteredDepartment) {
        /* console.log('Filtered Department:', filteredDepartment); */
        setFilteredData(filteredDepartment.courses)
      }
    }
  }, [selectedSemester, selectedDepartment, database]);

  const pages = [
    <DataTable columns={columns} data={filteredData} />,
    <SelectedPlaceHolder/>
  ]

  return (
    <div
      style={{
        display:'flex',
        flexDirection:'column',
        flexGrow:'1',
        backgroundColor: 'hsla(var(--black2))',
        /* borderBottomLeftRadius:'0.75rem', */
        /* borderBottomRightRadius:'0.75rem', */
        borderRadius:'0.75rem',
      }}
    >
      {/* <DataTable columns={columns} data={filteredData} /> */}
      {pages[activePageIndex]}

    </div>
  )
}

export default MainContainer;
