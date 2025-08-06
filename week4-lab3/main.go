package main

import (
	"errors"
	"fmt"
)

type Student struct {
	ID    string  `json:" id"`
	Name  string  `json:" name"`
	Email string  `json:" email"`
	Year  int     `json:"year"`
	GPA   float64 `json:" gpa"`
}

func (s *Student) IsHonor() bool {
	return s.GPA >= 3.50

}

func (s *Student) Validate() error {
	if s.Name == "" {
		return errors.New("name is required")

	}
	if s.Year < 1 || s.Year > 4 {
		return errors.New("year must be between 1-4")
	}
	if s.GPA < 0 || s.GPA > 4 {
		return errors.New("gpa must be between 1-4")
	}
	return nil
}
func main() {
	// var st Student = Student{ID: "1", Name: "paramet", Email: "sittiracha_p2@su.ac.th", Year: 3, GPA: 2.61}

	student := []Student{
		{ID: "1", Name: "paramet", Email: "sittiracha_p2@su.ac.th", Year: 3, GPA: 2.61},
		{ID: "2", Name: "parmet", Email: "sittiracha_p@su.ac.th", Year: 3, GPA: 3.61},
	}
	newStudent := Student{ID: "3", Name: "ramet", Email: "racha_p2@su.ac.th", Year: 4, GPA: 3.21}
	student = append(student, newStudent)

	for i, student := range student {
		fmt.Printf("%d Honor %v\n", i, student.IsHonor())
		fmt.Printf("%d Validation = %v\n", i, student.Validate())
	}
}
