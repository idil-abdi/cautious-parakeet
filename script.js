const form = document.querySelector('#form')
const taskInput = document.querySelector('#taskInput')
const listContainer = document.querySelector('#task-list')
const editBtns = document.querySelectorAll('.editBtn')

let  task = [];
let num = 1
let editingItemId = null


const handleSubmitbtn = (e) => {
    e.preventDefault();

    const value = taskInput.value.trim()

    if(!value) return

    if (editingItemId !== null) {
        // * need to understad more
        task = task.map(eachTask => {
            if (eachTask.id === editingItemId) {
                return { ...eachTask, task: value };
            }
            return eachTask;
        });
        console.log('UPDATED EDITED TASK:', task);
        

        editingTaskId = null; // reset edit mode
    } else {
        task.push({id: num++, task: value, completed: false})
        console.log('CREATING TASK', task);
        
    }

    taskInput.value = ''
    renderTaskList()
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
    const id = Number(e.target.dataset.id)
    if (e.target.classList.contains('deleteBtn')) {
        handleDeleteBtn(id)
    }

    if (e.target.classList.contains('editBtn')) {
        handleEditBtn(id)
    }
})

const handleDeleteBtn = (id) => {
    task.splice(0, task.length, ...task.filter(eachTask => eachTask.id !== id))
    console.log('DELETED TASK', task)
    renderTaskList()
}

const handleEditBtn = (id) => {    
    const found = task.find(eashTask =>  eashTask.id === id)
    taskInput.value = found.task; 
    editingItemId = id
}


form.addEventListener('submit', handleSubmitbtn)