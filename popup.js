document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
  
    // Load tasks from chrome.storage.local
    chrome.storage.local.get({tasks: []}, function(result) {
      result.tasks.forEach(function(task) {
        addTodoToDOM(task);
      });
    });
  
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      addTodo();
    });
  
    function addTodo() {
      const todoText = input.value.trim();
      if (todoText === '') {
        return;
      }
  
      addTodoToDOM(todoText);
      saveTodoToStorage(todoText);
      input.value = '';
    }
  
    function addTodoToDOM(todoText) {
      const li = document.createElement('li');
      const textSpan = document.createElement('span');
      textSpan.textContent = todoText;
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', function() {
        todoList.removeChild(li);
        removeTodoFromStorage(todoText);
      });
  
      li.appendChild(textSpan);
      li.appendChild(deleteButton);
      todoList.appendChild(li);
    }
  
    function saveTodoToStorage(todoText) {
      chrome.storage.local.get({tasks: []}, function(result) {
        const tasks = result.tasks;
        tasks.push(todoText);
        chrome.storage.local.set({tasks: tasks});
      });
    }
  
    function removeTodoFromStorage(todoText) {
      chrome.storage.local.get({tasks: []}, function(result) {
        const tasks = result.tasks;
        const updatedTasks = tasks.filter(task => task !== todoText);
        chrome.storage.local.set({tasks: updatedTasks});
      });
    }
  });
  
  