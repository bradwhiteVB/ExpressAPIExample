/* ***
 * Dummy DB - Since a selection of a database is arbitrary for this exercise, a simple object that keeps state while the express server is running should suffice
 * 
 * The exported items mimic real db functions so replacing should be simple enough
 * 
 * ***/
var users = {
  0: { name: 'Test John', email: 'tj@test.com', dob: '2019-03-12' }
};
var usercount = 1;

//Mimic a promise object so we can use correct async await in the router
function findUser(id = null){
  return new Promise((resolve, reject)=>{
    try{
      var filtered = {};
      if(id !== null){
        if (users.hasOwnProperty(id)) {
          filtered[id] = users[id];
        }else{
          return reject(new Error("Could not find user"));
        }
      }else{
        filtered = users;
      }
      return resolve(filtered);
    } catch(error){
      return reject(error);
    }
  });
}
function saveUser(sentUser = null){
  return new Promise((resolve, reject)=>{
    try{
      //Determine if this is a duplicate - email address check
      const userIDs = Object.keys(users);
      var duplicate = false;
      for (idx in userIDs) {
        if (!duplicate && users[userIDs[idx]].email === sentUser.email) {
          duplicate = true;
        }
      }
      if (duplicate) {
        return reject(new Error("An existing user has that email address"));
      }

      //Add new user
      users[usercount] = sentUser;
      var tmpRet = {};
      tmpRet[usercount] = sentUser; //Doing this to keep the format returned standard
      usercount += 1;
      return resolve(tmpRet);
    } catch(error){
      return reject(error);
    }
  });
}
function deleteUser(id = null){
  return new Promise((resolve, reject)=>{
    try{
      let userToDelete = {};
      if (users.hasOwnProperty(id)) {
        userToDelete[id] = users[id];
        delete users[id];
        return resolve(userToDelete);
      } else {
        return reject(new Error("Could not find user"));
      }
    } catch(error){
      return reject(error);
    }
  });
}

module.exports = {
  find: findUser,
  save: saveUser,
  delete: deleteUser,
};