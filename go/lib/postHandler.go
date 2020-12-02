package lib

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func getAllPosts(w http.ResponseWriter, r *http.Request) {
	resp, err := http.Get(baseURL + "/posts")
	if err != nil {
		println(err)
		return
	}
	defer resp.Body.Close()
	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Fprintf(w, "%s", body)
}

func getOnePost(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	resp, err := http.Get(lib.baseURL + "/posts/" + id)
	if err != nil {
		println(err)
		return
	}
	defer resp.Body.Close()
	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Fprintf(w, "%s", body)
}

func createPost(w http.ResponseWriter, r *http.Request) {
	resp, err := http.Post(baseURL+"/posts", "application/json", r.Body)
	if err != nil {
		println(err)
		return
	}
	defer resp.Body.Close()
	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Fprintf(w, "%s", body)
}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to the HomePage!")
	fmt.Println("Endpoint Hit: homePage")
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
