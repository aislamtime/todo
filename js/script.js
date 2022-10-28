function onPageLoaded() {
	const todo = document.querySelector('.todo');
	const add = document.querySelector('.add-task');
	const trash = document.querySelector('.del-task');
	const list = document.querySelector('.todo__list');
	const task = document.querySelector('.todo__item');
	const close = document.querySelector('.close');
	const popup = document.querySelector('.pupop');
	const story = list.getElementsByClassName('todo__item');
	const input = document.querySelector('input');

	//console.log(input);
	//console.log(add);
	//console.log(del-task);
	//console.log(list);
	//console.log(task);
	//console.log(close);
	//console.log(popup);
	//console.log(story);

	todo.addEventListener('click', function (e) {
		let targetItem = e.target;
		//console.log(targetItem.closest('.complete-task'));

		//Добавление галочки
		const img = document.createElement('img');
		img.className = 'img';
		img.setAttribute('src', 'img/icon/complete.png');

		if (targetItem.closest('.del-task')) {
			targetItem.closest('.del-task').parentElement.remove();
			if (story.length == 0) {
				popup.style.display = 'block';
			}
		} else if (targetItem.closest('.complete-task')) {
			let imgTF = targetItem.closest('.complete-task').firstChild;
			if (!targetItem.closest('.complete-task').firstChild) {
				targetItem
					.closest('.complete-task')
					.parentElement.classList.add('todo_complete');
				targetItem.closest('.complete-task').appendChild(img);
			} else {
				targetItem
					.closest('.complete-task')
					.parentElement.classList.remove('todo_complete');
				targetItem.closest('.complete-task').removeChild(imgTF);
			}
		}
	});

	input.addEventListener('keyup', (keyPressed) => {
		const keyEnter = 'Enter';
		if (keyPressed.code == keyEnter) {
			addTask();
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
		//del-task.className = 'del-task';

		input.value = '';
		popup.style.display = 'none';
	}

	function closePupop() {
		popup.style.display = 'none';
	}

	add.addEventListener('click', addTask);
	//trash.addEventListener('click', delTask);
	close.addEventListener('click', closePupop);
}

document.addEventListener('DOMContentLoaded', onPageLoaded);
