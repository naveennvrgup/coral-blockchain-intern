# Coral_Blockchain | Internship Assessment

## Implemented with both GoLang and Node.js. Frontend runs on react.js.

## GoLang:
- **Go Gorilla mux** - web router package 
- **gorm** - ORM for GoLang (takes care of DB migrations and DB sync). Makes interaction with DB easier.
- **go-mysql-client** - used to interface mysql dialect with the **gorm**

## Express:
- **sequelize** - ORM for SQL DBs
- **bodyparser** - parses the request data and puts it in the body.
- **cors** - enables cross-site resource sharing which is blocked by default
- **mysql-client** - used to interface with ORM
- **ejs** - render the html page

### Features implemented:
- implemented with REST apis
- Web form will take (username, password, email, phone). Creates userdata if not exist else updates the record.
- form validation
- search the userdata with the help of email
- ability to delete the userdata
- saves the data to the online databse provided 
- bootstrap for

## Choice of Frontend
I am very familiar with react.js and makes the working with state management easier. Since I am dealing with forms it felt like a good choice.
