# Weekday-Assignment

## UI Clone of the search jobs page

This is the clone of weekday's product- candidate application platform with the following features:

- allows users to view job listings, 
- filter jobs based on various criteria, 
- infinite scroll for a seamless browsing experience
- responsive design


## Set up on your local

Follow the below steps to run this application locally on your machine:

1. Clone this repository using `git clone https://github.com/tathagata1805/weekday-assignment.git`
2. Change directory to weekday-assignment using `cd ./weekday-assignment`
3. Install dependencies using `npm install`
4. Run the app using `npm run dev`
5. Visit `http://localhost:5173/`

## Tech Stack 

- ReactJs
- Redux
- CSS
- Material UI
---------------------------------------------

#### Note to reviewers:

Since the response job object from the API call did not have all the fields, I took certain liberties to mock the UI

- Posted 6 days ago is hard-coded as of now
- Hardcoded string "Company Name" is shown since company name was not present
- Filters for Number of Employees, Mode and Search Company Name could not be implemented as the data did not have those fields but I have left comments wherever possible to show how it could be done
- 'x' in place of Estimated salary and minimum experience wherever the result is not fetched from backend just to mock the UI given in assignment
