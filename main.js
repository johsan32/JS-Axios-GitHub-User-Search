const API_URL = 'https://api.github.com/users/'

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')

async function getUser(username) {
  try {
    const { data } = await axios(API_URL + username)

    createUserCard(data)
    getRepos(username)
  } catch (err) {
    if (err.response.status == 404) {
      createErrorCard('User not found. Try again.')
    }
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const user = search.value

  if (user) {
    getUser(user)

    search.value = ''
  }

})

function createUserCard(user) {
  const userName = user.name || user.login
  const userBio = user.bio ? `<p>${user.bio}</p>` : '';
  const userMap = user.location ? `<a><i class="fa-solid fa-location-dot"></i> ${user.location}</a>` : '';
  const userMail = user.company ? `<a><i class="fa-regular fa-building"></i> ${user.company}</a>` : '';
  const userOwner = user.html_url ? `<a href="${user.html_url}" target="blank"><i class="fa-brands fa-github"></i> @${user.login}</a>` : '';

  const cardHTML = `


    <div class="person">
      <div class="smile">
        <img class="person-img" src="${user.avatar_url}" alt=""  / >
        <i class="fa-regular fa-face-smile"></i>     
      </div>
      <div class="person-info">
        <div class="person-name">
          <h2>${userName}</h2>
          <span>@${user.login}</span>
        </div>
      </div>
      <p>${userBio}</p>
      <ul>
        <li>
          <i class="fa-solid fa-user-group"></i> ${user.followers}
          <strong>Followers</strong>
        </li>
        <li>
        <i class="fa-solid fa-rss"></i>
        ${user.following}  <strong>Following</strong></li>
        <li>
          <i class="fa-solid fa-bookmark"></i> ${user.public_repos} <strong>Repository</strong>
        </li>
      </ul>
      <div class="repos" id="repos">
      ${userMap ? `<a>${userMap}</a>` : ''}
      ${userMail ? `<a>${userMail}</a>` : ''}
      ${userOwner ? `<a>${userOwner}</a>` : ''}
    </div>

    </div>
  
  `


  main.innerHTML = cardHTML
}


function createErrorCard(msg) {
  const cardErrorHTML = `
  
  <div class="person">
  <h2> ${msg} </h2>
  </div>

  `

  main.innerHTML = cardErrorHTML
}
