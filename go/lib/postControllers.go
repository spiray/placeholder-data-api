package lib

import (
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/gorilla/mux"
)

// GetAllPosts is the route handler that fetches all posts
func GetAllPosts(w http.ResponseWriter, r *http.Request) {
	resp, _ := http.Get(BaseURL + "/posts")
	defer resp.Body.Close()
	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Fprintf(w, "%s", body)
}

// GetOnePost is the route handler that fetches a post by ID
func GetOnePost(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	resp, _ := http.Get(BaseURL + "/posts/" + id)
	defer resp.Body.Close()
	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Fprintf(w, "%s", body)
}

// CreatePost is the route handler that creates a Post
func CreatePost(w http.ResponseWriter, r *http.Request) {
	resp, _ := http.Post(BaseURL+"/posts", "application/json", r.Body)
	defer resp.Body.Close()
	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Fprintf(w, "%s", body)
}

// ReplacePost is the route handler that replaces a post based on a given ID
func ReplacePost(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	client := &http.Client{}
	req, _ := http.NewRequest(http.MethodPut, BaseURL+"/posts/"+id, r.Body)
	req.Header.Set("Content-Type", "application/json; charset=utf-8")
	resp, _ := client.Do(req)
	defer resp.Body.Close()
	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Fprintf(w, "%s", body)
}

// ModifyPost is the route handler that modifies a Post based on a given ID
func ModifyPost(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	client := &http.Client{}
	req, _ := http.NewRequest(http.MethodPatch, BaseURL+"/posts/"+id, r.Body)
	req.Header.Set("Content-Type", "application/json; charset=utf-8")
	resp, _ := client.Do(req)
	defer resp.Body.Close()
	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Fprintf(w, "%s", body)
}

// DeletePost is the oute handler that deletes a Post based on a given ID
func DeletePost(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	client := &http.Client{}
	req, _ := http.NewRequest(http.MethodDelete, BaseURL+"/posts/"+id, r.Body)
	resp, _ := client.Do(req)
	fmt.Fprintf(w, "%s", resp.Status)
}

// HomeResponse is the route handler that provides the documentation for the API
func HomeResponse(w http.ResponseWriter, r *http.Request) {
	var jsonResponse string = `{
        "message": "See \"endpoints\" for available endpoints/actions",
        "endpoints": {
            "GET_ALL":"/posts",
            "GET":"/posts/1",
            "POST":"/posts title body userID",
			"PUT":"/posts/1 title body userID",
			"PATCH": "/posts/1 title? body? userID?",
			"DELETE": "/posts/1",
			},
		}`
	fmt.Fprintf(w, "%s", jsonResponse)
}
