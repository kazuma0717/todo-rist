// HTMLの読み込みが完了したら実行する
document.addEventListener('DOMContentLoaded', () => {

    // 必要な要素を取得
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');

    // タスクを追加する関数
    const addTask = (taskText, taskDate, isCompleted) => {
        const text = taskText || taskInput.value.trim();

        if (text === '') {
            return;
        }

        const li = document.createElement('li');
        if (isCompleted) {
            li.classList.add('completed');
        }

        const span = document.createElement('span');
        span.textContent = text;
        span.classList.add('task-text');
        span.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        const today = new Date();
        const dateString = taskDate || `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
        
        const dateSpan = document.createElement('span');
        dateSpan.textContent = dateString;
        dateSpan.classList.add('task-date');

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '削除';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            li.remove();
            saveTasks();
        });

        li.appendChild(span);
        li.appendChild(dateSpan);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);

        if (!taskText) {
            taskInput.value = '';
            saveTasks();
        }
    };

    // ブラウザのローカルストレージにタスクを保存する関数
    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(li => {
            tasks.push({
                text: li.querySelector('.task-text').textContent,
                date: li.querySelector('.task-date').textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // 保存されたタスクを読み込んで表示する関数
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks'));

        if (tasks) {
            tasks.forEach(task => {
                addTask(task.text, task.date, task.completed);
            });
        }
    };

    // 追加ボタンのクリックイベント
    addBtn.addEventListener('click', () => addTask());

    // 入力欄でEnterキーが押された時のイベント
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // ページ読み込み時に保存されたタスクを読み込む
    loadTasks();
    
    // ===========================
    // テーマ切り替え機能
    // ===========================
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;

    const toggleTheme = () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    };

    const loadTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
        }
    };

    themeToggleBtn.addEventListener('click', toggleTheme);

    loadTheme();
});