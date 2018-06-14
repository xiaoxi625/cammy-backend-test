## Backend email message api

##### Node version 8.9.x

##### Building the API
* install the app `npm install`
* start the development server `npm run dev`

##### Running tests
* run all tests `npm run test`
# Default email is not abc@cammy.com because mailgun account is testing one, so there is no auth from abc@cammy.com
# Two auth gmail account are  chase.cammy.test@gmail.com and bphan625@gmail.com, only these two email address is working properly.


##### Release notes

#### 1.0.0
* add sending email function
* add persisting message endpoint
* add getting message endpoint
* add validator for email address:
  valid email example => example@domain.com, example@domain.net
  invalid email example => example@domain, example
* add request body and query validation
* add testing with mocha

#### Endpoint list
1.  send emails
    url: ${domain}/api/v1/emails/email
    methid: POST
    request body(JSON format)
    {
    	"name": "xxx",
    	"email":"xxx",
    	"subject":"testing",
    	"details":"bbb"
    }
    All properties in request body are necessary
2. keep message information in database
    url: ${domain}/api/v1/messages/message
    methid: POST
    request body(JSON format)
    {
    	"name": "xxx",
    	"email":"xxx",
    	"mobile":"xxxx",
    	"subject":"testing",
    	"details":"The testing email content."
    }
    All properties in request body are necessary
3. get message information based on message uuid
    url: ${domain}/api/v1/messages/message?messageId=xxx-xxx-xxx
    methid: GET
    messageId in request query is necessary

##### How to start API (.env should not be in github, but for your convenience, I still add in this repository)
0. You must installed Node version 8.9.x and make sure no any process is running on port 5000
1. Run "npm install" to install all dependencies
2. Run "npm run dev" to start, the api will running on port 5000
3. "ctrl+c" could stop the app
4. Run "npm run test" to run all unit test

#### Introduction
# Main functions are all in /src/modules
# message folder includes code to persist customer message and get customer message.
# email folder includes code to send emails.
# The index files define path, db file keeps database functions, controller files force on function implementation.
# Database operation queries are stored in src/query folder
# Tests are stored in src/tests folder, it includes both endpoints testing and unit testing(for your convenience, I put them all together, but should put them to different place)
