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
### Restructure
This project was restructured to adhere closer to best practice.

### Dummy Database used
Instead of creating an actual locahost instance of a MySQL or MongoDB database and using 'mysql2/promise' or 'mongoose' to connect and interrogate it, I decided to keep the local setup of this exercise easier by creating a "Dummy Database" held within an instance object.

This is a current issue for me in that the data returned doesn't mimic an array of objects like real database libraries. So it will be the next thing changed.  Either that or I will add in MongoDB support since it is inherently easy to create schemas and models with inbuilt validation.