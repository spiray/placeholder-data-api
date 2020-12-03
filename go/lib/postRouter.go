package lib

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Printf("%s", r.Method+" "+r.URL.Scheme+r.Host+r.RequestURI+"\n")
		next.ServeHTTP(w, r)
	})
}

// HandleRequests is the request handler for all incoming requests
func HandleRequests() {
	myRouter := mux.NewRouter().StrictSlash(true)

	myRouter.Use(loggingMiddleware)

	myRouter.HandleFunc("/", HomeResponse)
	myRouter.HandleFunc("/posts/{id}", DeletePost).Methods("DELETE")
	myRouter.HandleFunc("/posts/{id}", ModifyPost).Methods("PATCH")
	myRouter.HandleFunc("/posts/{id}", ReplacePost).Methods("PUT")
	myRouter.HandleFunc("/posts", CreatePost).Methods("POST")
	myRouter.HandleFunc("/posts", GetAllPosts)
	myRouter.HandleFunc("/posts/{id}", GetOnePost)
	println("Server Started @ http://localhost:10000")
	log.Fatal(http.ListenAndServe(":10000", myRouter))
}
