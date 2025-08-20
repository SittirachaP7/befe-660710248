package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Book struct
type Book struct {
	ID     string  `json:"id"`
	Title  string  `json:"title"`
	Author string  `json:"author"`
	Year   int     `json:"year"`
	Rating float64 `json:"rating"`
}

// In-memory database (ในโปรเจคจริงใช้ database)
var books = []Book{
	{ID: "1", Title: "Go Programming", Author: "John Doe", Year: 2021, Rating: 4.5},
	{ID: "2", Title: "Web Development with Gin", Author: "Jane Smith", Year: 2022, Rating: 4.8},
}

func getBooks(c *gin.Context) {
	yearQuery := c.Query("year")

	if yearQuery != "" {
		filter := []Book{}
		for _, book := range books {
			if fmt.Sprint(book.Year) == yearQuery {
				filter = append(filter, book)
			}
		}
		c.JSON(http.StatusOK, filter)
		return
	}
	c.JSON(http.StatusOK, books)
}

func main() {
	r := gin.Default()

	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "Healthy"})
	})

	api := r.Group("/api/v1")
	{
		api.GET("/books", getBooks)
	}

	r.Run(":8080")
}
