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
	// gorm.Model
	UserName string `json:"userName" gorm:"varchar(25);not null"`
	EmailId string	`json:"emailId" gorm:"varchar(50);not null;primary_key"`
	PhoneNo string `json:"phoneNo" gorm:"varchar(10);not null"`
	Password string `json:"password" gorm:"varchar(50);not null"`
	Datetime time.Time `json:"dateTime"`
}

func (userData) TableName() string {
	return "naveenuserData"
}
// var sequelize = new Sequelize('db_intern', 'dummyUser', 'dummyUser01', {
// 	host: 'db-intern.ciupl0p5utwk.us-east-1.rds.amazonaws.com',

// var uri string= "newuser:password@/test?charset=utf8&parseTime=True&loc=Local"
var uri string= "dummyUser:dummyUser01@tcp(db-intern.ciupl0p5utwk.us-east-1.rds.amazonaws.com:3306)/db_intern"

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

	// check for existing record
	var users []userData
	db.Where("email_id = ?", body["emailId"]).Find(&users)
	if len(users)>0 {
		user :=users[0]
		user.UserName = body["userName"].(string)
		user.EmailId = body["emailId"].(string)
		user.Password = body["password"].(string)
		user.PhoneNo = body["phoneNo"].(string)
		user.Datetime = time.Now()
		db.Save(&user)

		result := map[string]string{"msg":"updated " + body["emailId"].(string) + " successfully"} 
		json.NewEncoder(w).Encode(result)
		return
	}

	db.Create(&userData{
		UserName: body["userName"].(string), 
		EmailId: body["emailId"].(string),
		Password: body["password"].(string),
		PhoneNo: body["phoneNo"].(string),
		Datetime: time.Now(),
	})

	result := map[string]string{"msg":"User " + body["emailId"].(string) + " has be created successfully"} 
	json.NewEncoder(w).Encode(result)
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