const player = document.querySelector(".player")
const goals = player.querySelector("#goals")
const likes = player.querySelector(".likes")

function renderGoal(goal) {
    const li = document.createElement("li")
    const a = document.createElement("a")
    li.dataset.id = goal.id
    a.href = goal.link
    a.textContent = goal.description
    li.append(a)
    goals.append(li)
}

function renderPlayer(playerObj) {
    const img = player.querySelector("img")
    const h2 = player.querySelector("h2")
    const em = player.querySelector("em")
    img.src = playerObj.photo
    img.alt = playerObj.name
    h2.textContent = playerObj.name
    em.textContent = playerObj.nickname
    likes.textContent = playerObj.likes
    player.classList.id = playerObj.id
    
    playerObj.goals.forEach(goal => renderGoal(goal))
}


fetch("http://localhost:3000/players/1")
    .then(response => response.json())
    .then(playerData => renderPlayer(playerData))



const btn = player.querySelector(".like-button")
btn.addEventListener("click", function(event){
    likes.textContent = parseInt(likes.textContent) + 1
    const data = { likes: `${likes.textContent}` };

    fetch('http://localhost:3000/players/1', {
    method: 'PATCH', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
    console.log('Success:', data);
    })
})

const goalForm = document.querySelector("#new-goal-form")
goalForm.addEventListener("submit", function(event){
    event.preventDefault()

    const newGoal = {
        playerId: player.classList.id,
        link: event.target.link.value,
        description: event.target.description.value
    }

    renderGoal(newGoal)
    fetch('http://localhost:3000/goals', {
    method: 'POST', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(newGoal),
    })
    .then(response => response.json())
    .then(data => {
    console.log('Success:', data);
    })
    

    event.target.reset()
})