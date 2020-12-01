package lib

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

func getAllPosts(w http.ResponseWriter, r *http.Request) {
	resp, err := http.Get(baseURL + "/posts")
	print(resp)
	if err != nil {
		println(err)
		return
	}
	defer resp.Body.Close()
	body, _ := ioutil.ReadAll(resp.Body)
	json.NewEncoder(w).Encode(body)

}
func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to the HomePage!")
	fmt.Println("Endpoint Hit: homePage")
}

// HandleRequests is the request handler for all incoming requests
func HandleRequests() {
	http.HandleFunc("/", homePage)
	http.HandleFunc("/posts", getAllPosts)
	log.Fatal(http.ListenAndServe(":10000", nil))
}
