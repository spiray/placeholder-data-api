package lib

const baseURL string = "https://jsonplaceholder.typicode.com"

// Post is the structure for the entities being returned frm the API
type Post struct {
	UserID int    `json:"userId"`
	ID     int    `json:"id"`
	Title  string `json:"title"`
	Body   string `json:"body"`
}
