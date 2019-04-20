package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

type userData struct {
	gorm.Model
	UserName string `json:"userName" gorm:"varchar(25);not null"`
	EmailId string	`json:"emailId" gorm:"varchar(50);not null"`
	PhoneNo string `json:"phoneNo" gorm:"varchar(10);not null"`
	Password string `json:"password" gorm:"varchar(50);not null"`
	Datetime time.Time `json:"datetime"`
}

func (userData) TableName() string {
	return "userData"
}

var uri string= "newuser:password@/test?charset=utf8&parseTime=True&loc=Local"

func findUser(w http.ResponseWriter, r *http.Request) {
	db, err := gorm.Open("mysql", uri)
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()

	// accept json data
    var body map[string]interface{}
	err = json.NewDecoder(r.Body).Decode(&body)
    if err != nil {
        panic(err)
	}

	var users []userData
	db.Where("email_id LIKE ?","%"+body["email"].(string)+"%").Find(&users)

	json.NewEncoder(w).Encode(users)
}

func addUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("New User Endpoint Hit")

	db, err := gorm.Open("mysql", uri)
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()

	// accept json data
    var body map[string]interface{}
	err = json.NewDecoder(r.Body).Decode(&body)
    if err != nil {
        panic(err)
	}

	db.Create(&userData{
		UserName: body["userName"].(string), 
		EmailId: body["emailId"].(string),
		Password: body["password"].(string),
		PhoneNo: body["phoneNo"].(string),
		Datetime: time.Now(),
	})
	fmt.Fprintf(w, "User " + body["emailId"].(string) + " has be created successfully")
}

func deleteUser(w http.ResponseWriter, r *http.Request) {
	db, err := gorm.Open("mysql", uri)
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()

	vars := mux.Vars(r)
	email := vars["email"]

	var user userData
	db.Where("email_id = ?", email).Find(&user)
	db.Delete(&user)

	fmt.Fprintf(w, "Successfully Deleted User")
}

// func updateUser(w http.ResponseWriter, r *http.Request) {
// 	db, err := gorm.Open("mysql", uri)
// 	if err != nil {
// 		panic("failed to connect database")
// 	}
// 	defer db.Close()

// 	vars := mux.Vars(r)
// 	name := vars["name"]
// 	email := vars["email"]

// 	var user User
// 	db.Where("name = ?", name).Find(&user)

// 	user.Email = email

// 	db.Save(&user)
// 	fmt.Fprintf(w, "Successfully Updated User")
// }

func handleRequests() {
	myRouter := mux.NewRouter().StrictSlash(true)

	// attach routes to router
	myRouter.HandleFunc("/findUser/", findUser).Methods("POST")
	myRouter.HandleFunc("/deleteUser/{email}/", deleteUser).Methods("DELETE")
	myRouter.HandleFunc("/addUser/", addUser).Methods("POST")
	
	// serve static files
	myRouter.PathPrefix("/").Handler(http.FileServer(http.Dir("../react-front/build/")))

	log.Fatal(http.ListenAndServe(":3000", myRouter))
}

func initialMigration() {
	db, err := gorm.Open("mysql", uri)
	if err != nil {
		fmt.Println(err.Error())
		panic("failed to connect database")
	}
	defer db.Close()

	// Migrate the schema
	db.AutoMigrate(&userData{})
}

func main() {
	log.Println("gorilla upon 3000")
	
	initialMigration()
	// Handle Subsequent requests
	handleRequests()
}