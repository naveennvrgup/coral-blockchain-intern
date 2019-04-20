package main

import (
	"fmt"
	"net/http"	
)

func allUsers(w http.ResponseWriter, r *http.Request){
	fmt.Fprintf(w, "all user")
}

func newUser(w http.ResponseWriter, r *http.Request){
	fmt.Fprintf(w, "new user")
}

func deleteUser(w http.ResponseWriter, r *http.Request){
	fmt.Fprintf(w, "delete user")
}

func updateUser(w http.ResponseWriter, r *http.Request){
	fmt.Fprintf(w, "update user")
}
