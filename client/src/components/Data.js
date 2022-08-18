//import config which is what holds the api
import config from './config';


//Create a class Component named Data
export default class Data {
  //This method api() is used to make a POST, PUT, GET, DELETE Request to the Rest API
  //Takes in the arguments path, HTTP method, body
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {    
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);// The returned fetch method and a second parameter(options)
    //If body is provided it returns a stringified body
  }


// The getUser uses a async operation that gets an authenticatedUser using the api() method
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });//The GET request takes in these arguments
    if (response.status === 200) {
      return response.json().then(data => data);//If the response is 200 meaning ok it returns the data
    }
    else if (response.status === 401) {//If it is a bad request
      return null;//returns null
    }
    else {
      throw new Error();// Else an error is thrown
    }
  }
  
//The createUser uses a async operation that posts a new user using the api() method 
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);//The POST request takes in these arguments
    if (response.status === 201) {//If the response status is equal to 201 then the user was successfully created
      return [];//added to the array of users
    }
    else if (response.status === 400) {//If the request is 400 then it is a bad request
      return response.json().then(data => {//Returns validation errors
        return data.errors;
      });
    }
    else {
      throw new Error();// Else an error is thrown
    }
  }

//The getCourses uses a async operation that GETs all the courses using the api() method 
  async getCourses(id, emailAddress, password) {
    const response = await this.api(`/courses`, 'GET', id, null, true,  { emailAddress, password } ); //The GET request takes in these arguments
    if (response.status === 200) {//If the response is 200 meaning ok it returns the data
      return response.json().then(data => data);//Returns the courses
    }
    else if (response.status === 401) {
      return null;//Else if there is a bad request no courses are given
    }
    else {
      throw new Error();//Else throw error
    }
  }

  //The createCourse uses a async operation that POSTs a new courses using the api() method 
  async createCourse(course, emailAddress, password) {
    const response = await this.api(`/courses/create`, 'POST', course, true, {emailAddress, password} );//The POST request takes in these arguments
    if (response.status === 201) {//If the response status is 201 it was a success
      return response.json().then(data => data);//Returns a newly created course
    }
    else if (response.status === 400) {//else if the request was 400 the request was bad
      return response.json().then(data => data);//Returns validation errors
    }
    else {
      throw new Error();//else throw error
    }
  }

  //The createCourse uses a async operation that PUTs an update to courses using the api() method 
  async updateCourse(id, course, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, {emailAddress, password});//The PUT request takes in these arguments
    if (response.status === 204) {//if the response was successfull the status is 204 
      return response.json().then(data => data);// Returns an updated course
    }
    else if (response.status === 400) {//if the request is bad it throws 400 
      return response.json().then(data => 
        data) ;// Returns validation errors
    }
    else {
      throw new Error();//else throw error
    }
  }

  //The deleteCourse uses a async operation that uses a DELETE method to delete a course using the api() method 
  async deleteCourse(id, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {emailAddress, password} );//The DELETE request takes in these arguments
    if (response.status === 204) {//Successful response
      return response.json().then(data => data);//Returns the data(excluding the deleted request )
    }
    else if (response.status === 401) {//Bad request
      return null;//Returns null
    }
    else {
      throw new Error();//Throws error
    }
  }

  //The getSingleCourse uses a async operation that uses a GET method to get a single course using the api() method 
  async getSingleCourse(id) {
    const response = await this.api(`/courses/${id}`, 'GET', null, false );//These are the arguments it takes
    if (response.status === 200) {//Successful request
      return response.json().then(data => data);//Returns the single course
    }
    else if (response.status === 401) {//Bad request
      return null;//Nothing is returned
    }
    else {
      throw new Error();// Throws error
    }
  }


}