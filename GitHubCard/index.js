/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
axios.get('https://api.github.com/users/michaelbarnes7282')
  .then(response => {
    // console.log(response);
    cards.append(createCard(response.data));

  })
  .catch(error => {
    console.log('the data was not returned', error);
  })
/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/
const cards = document.querySelector('.cards');

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

// const followersArray = [
//   "cladams0203",
//   "Ezra-Black",
//   "christianlewis024",
//   "mpaolodr",
//   "easpaas"
// ];


axios.get(`https://api.github.com/users/michaelbarnes7282/followers`)
  .then(response => {
    // console.log(response.data);
    response.data.forEach(item => {
      console.log(item.url);
      axios.get(item.url)
        .then(response => {
          // console.log(response);
          cards.append(createCard(response.data));

        })
        .catch(error => {
          console.log('the data was not returned', error);
        })
    })
  })
  .catch(error => {
    console.log('the data was not returned', error);
  })


/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/
function createCard(hub) {
  // Variable declarations
  const card = document.createElement('div'),
    userImg = document.createElement('img'),
    info = document.createElement('div'),
    name = document.createElement('h3'),
    userName = document.createElement('p'),
    location = document.createElement('p'),
    profile = document.createElement('p'),
    link = document.createElement('a'),
    followers = document.createElement('p'),
    following = document.createElement('p'),
    bio = document.createElement('p');

  // Adding classes
  card.classList.add('card');
  info.classList.add('card-info');
  name.classList.add('name');
  userName.classList.add('username');

  // Assigning Values
  userImg.src = hub.avatar_url;
  name.textContent = hub.name;
  userName.textContent = hub.login;
  location.textContent = `Location: ${hub.location}`;
  profile.textContent = `Profile: ${link}`;
  link.textContent = hub.html_url;
  link.href = hub.html_url;
  followers.textContent = `Followers: ${hub.followers}`;
  following.textContent = `Following: ${hub.following}`;
  bio.textContent = `Bio: ${hub.bio}`;

  // Appending to parents
  card.append(userImg, info);
  info.append(name, userName, location, profile, followers, following, bio);
  profile.appendChild(link);

  return card;
}


/* List of LS Instructors Github username's:
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
