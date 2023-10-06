const formAddTodo = document.querySelector('.form-add-todo')
const formSearch = document.querySelector('.form-search input')
const todosContainer = document.querySelector('.todos-container')

const addTodo = inputValue => {
  if (inputValue.length) {
    todosContainer.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-center" data-todo='${inputValue}'>
    <span>${inputValue}</span>
    <i class="far fa-trash-alt" data-trash="${inputValue}"></i>
    </li>`
    event.target.reset()
  }
}
const removeTodo = (clickedElement) => {
  const trashDataValue = clickedElement.dataset.trash
  const todo = document.querySelector(`[data-todo="${trashDataValue}"]`)

  if (trashDataValue) {
    todo.remove()
  }

}
const manipulateClasses = (todos, classToAdd, classToRemove) => {
  todos.forEach(todo => {
    todo.classList.remove(classToRemove)
    todo.classList.add(classToAdd)
  })
}
const filterTodos = (todos, inputValue, returnMatchedTodos) => todos
  .filter(todo => {
    const matchedTodos = todo.textContent.toLowerCase().includes(inputValue)
    return returnMatchedTodos ? matchedTodos : !matchedTodos
  })

const hiddenTodo = (todos, inputValue) => {
  const todosToHide = filterTodos(todos, inputValue, false)
  manipulateClasses(todosToHide, 'hidden', 'd-flex')
}
const showTodo = (todos, inputValue) => {
  const todosShow = filterTodos(todos, inputValue, true)
  manipulateClasses(todosShow, 'd-flex', 'hidden')
}

formAddTodo.addEventListener('submit', event => {
  event.preventDefault()
  const inputValue = event.target.add.value.trim()
  addTodo(inputValue)
})

todosContainer.addEventListener('click', (event) => {
  const clickedElement = event.target
  removeTodo(clickedElement)

})

formSearch.addEventListener('input', event => {
  const inputValue = event.target.value.trim().toLowerCase()
  const todos = Array.from(todosContainer.children)

  hiddenTodo(todos, inputValue)
  showTodo(todos, inputValue)
})