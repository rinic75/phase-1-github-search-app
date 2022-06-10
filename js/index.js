document.addEventListener('DOMContentLoaded', ()=> {
  
  const myInit = {
    method : 'GET',
    headers : {
      Accept: 'application/vnd.github.v3+json'
    }
  }
  const form = document.querySelector('#github-form')
  const userUl = document.querySelector('#user-list')
  const reposUl = document.querySelector('#repos-list')

  form.addEventListener('submit', e => {
    e.preventDefault();
    //console.log(e.target.search.value)

    const input = e.target.search.value;
    searchUser(input);
  })

  function searchUser(name) {
    fetch(`https://api.github.com/search/users?q=${name}`, myInit)
      .then(res => res.json())
      .then(data => {
        const newObj = Object.values(data)[2];
        newObj.forEach(info => renderUser(info))
      })
  }

  function searchRepo(name) {
    fetch(`https://api.github.com/users/${name}/repos`, myInit)
      .then(res => res.json())
      .then(data => data.forEach(info => renderRepo(info.owner.repos_url)))
  }

  function renderUser(item) {
    const userName = item.login
    const avatar = item.avatar_url
    const profile = item.html_url
    const div = document.createElement('div')
    const h3 = document.createElement('h3')
    const img = document.createElement('img')
    const p = document.createElement('p')
    h3.textContent = userName;
    img.src = avatar;
    p.textContent = profile;

    h3.addEventListener('click', (e)=> {
      searchRepo(e.target.textContent)
    })

    div.append(h3, img, p)
    userUl.appendChild(div)
  }

  function renderRepo(url) {
    const li = document.createElement('li');
    li.textContent = url;
    reposUl.appendChild(li);
  }
})