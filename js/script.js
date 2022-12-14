function onPageLoaded() {
	const todo = document.querySelector('.todo');
	const buttons = document.querySelector('.buttons');
	const add = document.querySelector('.add-task');
	const trash = document.querySelector('.del-task');
	const list = document.querySelector('.todo__list');
	const task = document.querySelector('.todo__item');
	const close = document.querySelector('.close');
	const popup = document.querySelector('.pupop');
	const story = list.getElementsByClassName('todo__item');
	const input = document.querySelector('input');
	function setFocus() {
		input.focus();
	}
	function showInput() {
		input.style.display = 'block';
	}
	function hideInput() {
		input.style.display = 'none';
	}
	const emptyInput = document.querySelector('.empty-input');
	function showEmptyInput() {
		emptyInput.style.display = 'block';
	}
	function hideEmptyInput() {
		emptyInput.style.display = 'none';
	}
	input.focus(() => (emptyInput.style.display = 'none'));
	const emptyList = document.querySelector('.empty-info-wrap');

	//console.log(emptyList);

	//Сохранение изменении в localStorage ================================>
	let todos;
	//Функция которая будет вызываться при любых изменениях, что бы в localStorage была актуальная инфа
	function toLocal() {
		//Берем код HTML всего списка с тасками
		todos = list.innerHTML;
		//console.log(todos);
		//Добавляем собранный код списка тасков в localStorage
		localStorage.setItem('todos', todos);
	}

	//Проверяет есть ли в localStorage что то, если да, то загружает из него
	if (localStorage.getItem('todos')) {
		list.innerHTML = localStorage.getItem('todos');
	}
	if (!!list.querySelector('li')) {
		emptyList.classList.add('is-empty');
	}
	//<===================================================================>

	//console.log(input);
	//console.log(add);
	//console.log(del-task);
	//console.log(list);
	//console.log(task);
	//console.log(close);
	//console.log(popup);
	//console.log(story);

	//function isClosest(item) {
	//	console.log(`${this.item}`);
	//	return targetItem.closest(`${this.item}`);
	//}

	todo.addEventListener('click', function (e) {
		let targetItem = e.target;
		//console.log(targetItem.closest('.complete-task'));

		//Добавление галочки
		const img = document.createElement('img');
		img.className = 'img';
		img.setAttribute('src', 'img/icon/complete.png');

		if (targetItem.closest('.del-task')) {
			//console.log(targetItem.closest('.del-task'));
			targetItem.closest('.del-task').parentElement.remove();
			toLocal();
			if (story.length == 0) {
				//Появление popup
				//popup.style.display = 'block';
				emptyList.classList.remove('is-empty');
			}
		} else if (targetItem.closest('.complete-task')) {
			let imgTF = targetItem.closest('.complete-task').firstChild;
			if (!targetItem.closest('.complete-task').firstChild) {
				targetItem
					.closest('.complete-task')
					.parentElement.classList.add('todo_complete');
				targetItem.closest('.complete-task').appendChild(img);
				toLocal();
			} else {
				targetItem
					.closest('.complete-task')
					.parentElement.classList.remove('todo_complete');
				targetItem.closest('.complete-task').removeChild(imgTF);
				toLocal();
			}
		}
	});

	//Нажатие на любую кнопку
	buttons.addEventListener('click', function (e) {
		function isClosest(item) {
			//console.log(e.target.closest(item));
			return e.target.closest(item);
		}

		if (isClosest('.add-task')) {
			//console.log(e.target.closest('.add-task'));
			if (input.style.display !== 'block') {
				showInput();
				setFocus();
			} else if (input.value == '') {
				showEmptyInput();
			} else {
				hideInput();
				hideEmptyInput();
				addTask();
				toLocal();
			}
			//addTask();

			//Удаление всех задачь
		} else if (isClosest('.remove-all-tasks')) {
			delAllTasks();
			toLocal();
		}
	});

	//input.onfocus = hideEmptyInput();
	//input.onblur = showEmptyInput();

	input.addEventListener('keyup', (keyPressed) => {
		const keyEnter = 'Enter';
		if (keyPressed.code == keyEnter) {
			if (input.value != '') {
				hideEmptyInput();
				hideInput();
				addTask();
				toLocal();
			} else {
				input.blur();
				showEmptyInput();
			}
		}
	});

	function addTask() {
		//Получаем текст из инпута
		const inputValue = input.value;
		//console.log(inputValue);

		const li = document.createElement('li');
		if (inputValue == '') {
			li.innerHTML = 'Новая задача!';
		} else {
			li.innerHTML = inputValue;
		}
		li.className = 'todo__item';
		const spanTrash = document.createElement('span');
		spanTrash.className = 'del-task';
		const spanComplete = document.createElement('span');
		spanComplete.className = 'complete-task complete';
		li.appendChild(spanTrash);
		li.appendChild(spanComplete);

		list.appendChild(li);

		input.value = '';
		//Закрытие popup
		//popup.style.display = 'none';
		emptyList.classList.add('is-empty');
	}

	//Функция удаления всех тасков
	function delAllTasks() {
		//console.log(list);

		while (list.querySelector('li')) {
			list.lastChild.remove();
		}

		emptyList.classList.remove('is-empty');
	}

	function closePupop() {
		popup.style.display = 'none';
	}

	//add.addEventListener('click', addTask);
	//trash.addEventListener('click', delTask);
	close.addEventListener('click', closePupop);
}

document.addEventListener('DOMContentLoaded', onPageLoaded);
