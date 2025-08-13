<<<<<<< HEAD
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
=======
// HTMLの読み込みが完了したら実行する
document.addEventListener('DOMContentLoaded', () => {

    // 必要な要素を取得
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');

    // タスクを追加する関数
    const addTask = (taskText, taskDate, isCompleted) => {
        const text = taskText || taskInput.value.trim(); // 入力値を取得し、前後の空白を削除

        if (text === '') {
            // 入力が空の場合は何もしない
            return;
        }

        // li要素を作成
        const li = document.createElement('li');
        if (isCompleted) {
            li.classList.add('completed');
        }

        // span要素（タスク名）を作成
        const span = document.createElement('span');
        span.textContent = text;
        span.classList.add('task-text');
        span.addEventListener('click', () => {
            li.classList.toggle('completed'); // 'completed'クラスを付け外し
            saveTasks(); // 状態を保存
        });

        // 日付を取得または使用
        const today = new Date();
        const dateString = taskDate || `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
        
        // 日付を表示するspan要素を作成
        const dateSpan = document.createElement('span');
        dateSpan.textContent = dateString;
        dateSpan.classList.add('task-date');

        // 削除ボタンを作成
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '削除';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            li.remove(); // li要素を削除
            saveTasks(); // 状態を保存
        });

        // li要素に各要素を追加
        li.appendChild(span);
        li.appendChild(dateSpan);
        li.appendChild(deleteBtn);

        // ul（taskList）にliを追加
        taskList.appendChild(li);

        // 新規追加の場合のみ入力欄を空にし、保存する
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
                date: li.querySelector('.task-date').textContent, // 日付も保存
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
                // 保存されたタスクを元に要素を復元
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
>>>>>>> a6fd036519d6f27219b90d4fef6afb41a4f1ab93
});