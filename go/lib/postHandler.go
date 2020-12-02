package lib

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func getAllPosts(w http.ResponseWriter, r *http.Request) {
	resp, _ := http.Get(baseURL + "/posts")
	defer resp.Body.Close()
	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Fprintf(w, "%s", body)
}

func getOnePost(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	resp, _ := http.Get(baseURL + "/posts/" + id)
	defer resp.Body.Close()
	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Fprintf(w, "%s", body)
}

func createPost(w http.ResponseWriter, r *http.Request) {
	resp, _ := http.Post(baseURL+"/posts", "application/json", r.Body)
	defer resp.Body.Close()
	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Fprintf(w, "%s", body)
}

func homePage(w http.ResponseWriter, r *http.Request) {
	jsonResponse := []byte(`{
        "message": "See \"endpoints\" for available endpoints/actions",
        "endpoints":{
            "GET_ALL":"/posts",
            "GET":"/posts?id=1",
            "POST":"/posts title body userID",
			"PUT":"/posts id title body userID",
			"PATCH": "/posts?id=1 title? body? userID?",
			"DELETE": "/posts?id=1",
			},
			}`)
	var response Response
	json.Unmarshal(jsonResponse, &response)
	fmt.Fprintf(w, "%+v\n", response)
}

// HandleRequests is the request handler for all incoming requests
func HandleRequests() {
	myRouter := mux.NewRouter().StrictSlash(true)

	myRouter.HandleFunc("/", homePage)
	myRouter.HandleFunc("/posts", createPost).Methods("POST")
	myRouter.HandleFunc("/posts", getAllPosts)
	myRouter.HandleFunc("/posts/{id}", getOnePost)
	log.Fatal(http.ListenAndServe(":10000", myRouter))
}
