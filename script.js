const form = document.querySelector('#form')
const taskInput = document.querySelector('#taskInput')
const listContainer = document.querySelector('#task-list')
const welcomeForm = document.querySelector('#welcomeForm')
const welcomeInput = document.querySelector('#welcomeInput')
const welcome = document.querySelector('.welcome-display')
const section = document.querySelector('.section-display')
const main = document.querySelector('.main-display')
const headingContainer = document.querySelector('.header')
const category = document.querySelectorAll('.category')

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

const handleWelcomeSubmitbtn = (e) => {
    e.preventDefault()
    
    const username = welcomeInput.value.trim()
    const captaliseUsername = username.charAt(0).toUpperCase() + welcomeInput.value.slice(1)
    const heading = document.createElement('h2')

    if (!username) {
        return
    } else {
        heading.innerHTML = `Hi ${captaliseUsername}`
        welcome.style.display = 'none'
        headingContainer.style.display = 'flex'
        section.style.display = 'block'
        

        // main.style.display = 'block'
    }

    headingContainer.appendChild(heading)
    console.log(`Welcome ${username}`);
    
}

const handleSection = (e) => {
    console.log('hello');
        section.style.display = 'none'
        main.style.display = 'block'
}

const renderTaskList = () => {
    listContainer.innerHTML = ''  // clear list first

    task.forEach((eachTask) => {

        const list = document.createElement('li')

        list.innerHTML = `
            <div class="task-item">
                <div class="task-test">
                    <input type="checkbox" class="checkbox" data-id="${eachTask.id}" ${eachTask.completed ? 'checked' : ''}>
                    <p class="${eachTask.completed ? 'completed' : ''}"> ${eachTask.task}</p>
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

    // 🔹 CHECKBOX TOGGLE
if (e.target.classList.contains('checkbox')) {

    const id = Number(e.target.dataset.id);

    task = task.map(eachTask => {
        if (eachTask.id === id) {
            return { ...eachTask, completed: !eachTask.completed };
        }
        return eachTask;
    });

    renderTaskList();
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


category.forEach((category) => {
    category.addEventListener('click', handleSection)
})

welcomeForm.addEventListener('submit', handleWelcomeSubmitbtn)

form.addEventListener('submit', handleSubmitbtn)
