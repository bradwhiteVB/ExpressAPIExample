# API Exercise

## Minimum Requirements
* Node version 8.9.1 <- Just what my laptop has installed on it currently


## Install, setup and run
Navigate to the directory you want to install the project

```bash
git clone https://github.com/bradwhiteVB/ExpressAPIExample.git
cd ExpressAPIExample
npm install
npm test #optional to run the configured mocha tests
npm start
```

At this point you can use any method you feel comfortable with e.g.(curl or Postman) to interrogate the following endpoints:
* GET http://127.0.0.1:3000/users  <-- Not asked for but since I made the userID optional was easy enough to provide and helps show ALL current users
* GET http://127.0.0.1:3000/users/{ID}
* DELETE http://127.0.0.1:3000/users/{ID}
* POST http://127.0.0.1:3000/users  <-- Send this body data e.g: 
{
	"name":"Joe Bloggs",
	"email": "JoeBloggs12345@gmail.com",
	"dob": "1985-12-12"
}


## Additional info
### Dummy Database used
Instead of creating an actual locahost instance of a MySQL database and using 'mysql2/promise' to connect and interrogate it, I decided to keep the local setup of this exercise easy and concise ny creating a "Dummy Database" held within an instance object.  This object only persists for as long as the project is running on the assigned port.

### Validation
I used this exercise to show that validation of inputs to a post is important and setup some simple validations.  Since the task didn't cover a format for the 'dob' field and it is also possible to create custom checks using 'express-validator' I decided to keep it simply as a mandatory field check.

