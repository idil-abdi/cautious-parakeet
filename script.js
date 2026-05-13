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

let num = 1
let editingItemId = null
let currentCategoryId = null
const data = [
    {
        id: 1,
        categoryName: 'Today',
        todos: []
    },
    {
        id: 2,
        categoryName: 'Personal',
        todos: []
    },
    {
        id: 3,
        categoryName: 'Work',
        todos: []
    },
    {
        id: 4,
        categoryName: 'Shopping',
        todos: []
    }
]

const loadFromLocalStorage = () => {

    const storedData = localStorage.getItem('todoData')

    if (storedData) {
        const parsedData = JSON.parse(storedData)

        data.length = 0
        data.push(...parsedData)
    }
}

const saveToLocalStorage = () => {
    localStorage.setItem('todoData', JSON.stringify(data))
}

welcomeForm.addEventListener('submit', (e) => {
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
    loadFromLocalStorage()
    console.log(`Welcome ${username}`);
})

category.forEach((category, i) => {
    category.addEventListener('click', (e) => {
        
        currentCategoryId = data[i].id
        
        console.log(currentCategoryId);
        
        const findDataById = data.find(({id}) => id === currentCategoryId)
        console.log(findDataById);
        
        const para = document.createElement('p')
        para.innerHTML = `This Is The ${findDataById.categoryName} Category`;
        headingContainer.appendChild(para)

        section.style.display = 'none'
        main.style.display = 'block'
        renderTaskList(findDataById.todos)
    })
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const value = taskInput.value.trim();
    
    if (!value || !currentCategoryId) return;
    
    const selectedCategory = data.find(todo => todo.id === currentCategoryId);

    if (editingItemId !== null) {
        const todo = selectedCategory.todos.find(t => t.id === editingItemId);
        todo.task = value;
        console.log('UPDATED EDITED TASK:', selectedCategory.todos);
        editingItemId = null;
    } else {
        selectedCategory.todos.push({
            id: num++,
            task: value,
            completed: false
        });
        console.log('CREATING TASK', selectedCategory);
    }
    
    taskInput.value = '';
    saveToLocalStorage()
    renderTaskList(selectedCategory.todos);
})

const renderTaskList = (todosArr) => {
    listContainer.innerHTML = ''  // clear list first

    todosArr.forEach((todo) => {

        const list = document.createElement('li')

        list.innerHTML = `
            <div class="task-item">
                <div class="task-test">
                    <input type="checkbox" class="checkbox" data-id="${todo.id}" ${todo.completed ? 'checked' : ''}>
                    <p class="${todo.completed ? 'completed' : ''}"> ${todo.task}</p>
                </div>
                <div class="icons">
                    <img src="./img/tabler--edit.png" alt="edit-icon" class="editBtn" data-id="${todo.id}">
                    <img src="./img/bin.png" alt="bin-icon" class="deleteBtn" data-id="${todo.id}">
                </div>
            </div>`

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
        const selectedCategory = data.find(cat => cat.id === currentCategoryId);
        const todo = selectedCategory.todos.find(t => t.id === id);
        todo.completed = !todo.completed;
        saveToLocalStorage()
        renderTaskList(selectedCategory.todos);
    }
})


const handleDeleteBtn = (id) => {
    const selectedCategory = data.find(category => category.id === currentCategoryId);
    selectedCategory.todos = selectedCategory.todos.filter(todo => todo.id !== id);
    console.log('DELETING TASK', selectedCategory.todos);
    saveToLocalStorage()
    renderTaskList(selectedCategory.todos);
}

const handleEditBtn = (id) => {
    const selectedCategory = data.find(category => category.id === currentCategoryId);
    const found = selectedCategory.todos.find(todo => todo.id === id);
    taskInput.value = found.task;
    editingItemId = id;
    saveToLocalStorage()
}

// todo - things i could add to my project
// add and deleting categories and local storage
