const form = document.querySelector('#form')
const taskInput = document.querySelector('#taskInput')
const listContainer = document.querySelector('#task-list')
const editBtns = document.querySelectorAll('.editBtn')

const task = [];
let num = 1

const handleSubmitbtn = (e) => {
    e.preventDefault();

    //todo if input is empty you can't submit ✅
    const value = taskInput.value.trim()

    if(!value) {
        return
    } else {
    task.push({id: num++, task: value, completed: false})
    console.log(task);
    taskInput.value = ''
    renderTaskList()
    }
}

const renderTaskList = () => {
    listContainer.innerHTML = ''  // clear list first

    task.forEach((eachTask) => {

        const list = document.createElement('li')

        list.innerHTML = `
            <div class="task-item">
                <div class="task-test">
                    <input type="checkbox" class="checkbox" ${eachTask.completed ? 'checked' : ''}>
                    <p>${eachTask.task}</p>
                </div>
                <div class="icons">
                    <img src="./img/tabler--edit.png" alt="edit-icon" class="editBtn" data-id="${eachTask.id}">
                    <img src="./img/bin.png" alt="bin-icon" class="deleteBtn" data-id="${eachTask.id}">
                </div>
            </div>
        `

        listContainer.appendChild(list)
    })
}


listContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('deleteBtn')) {
        const id = Number(e.target.dataset.id)
        handleDeleteBtn(id)
    }
})

const handleDeleteBtn = (id) => {
    task.splice(0, task.length, ...task.filter(eachTask => eachTask.id !== id))
    console.log('REMOVE TASK', task)
    renderTaskList()
}

const handleEditBtn = () => {
    console.log('Edit')
}

form.addEventListener('submit', handleSubmitbtn)