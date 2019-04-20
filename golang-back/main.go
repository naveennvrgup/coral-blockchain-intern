package main

import (
	"fmt"
	"log"
	"net/http"
	
	"github.com/gorilla/mux"
)

func helloWorld(w http.ResponseWriter, r *http.Request){
	fmt.Fprintf(w, "hello world")
}

func handleRequests(){
	myRouter := mux.NewRouter().StrictSlash(true)
	myRouter.HandleFunc("/",helloWorld).Methods("GET")
	log.Fatal(http.ListenAndServe(":3000",myRouter))
}

func main(){
	fmt.Println("naveen is doing this")
	handleRequests()
}