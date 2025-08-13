// HTMLの読み込みが完了したら実行する
document.addEventListener('DOMContentLoaded', () => {

    // 必要な要素を取得
    const taskInput = document.getElementById('task-input');
    const dueDateInput = document.getElementById('due-date-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');

    // タスクを追加/表示するためのメイン関数
    const addTask = (taskData = {}) => {
        const text = taskData.text || taskInput.value.trim();
        if (text === '') return;

        const li = document.createElement('li');
        if (taskData.completed) {
            li.classList.add('completed');
        }

        // タスク名
        const span = document.createElement('span');
        span.textContent = text;
        span.classList.add('task-text');
        
        // --- 編集機能ここから ---
        span.addEventListener('dblclick', () => {
            li.classList.add('editing'); // 編集中のクラスを追加

            const editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.value = span.textContent;
            editInput.classList.add('edit-input');
            
            // spanの直前に編集用のinputを挿入
            li.insertBefore(editInput, span);
            editInput.focus();

            const saveEdit = () => {
                span.textContent = editInput.value;
                li.removeChild(editInput);
                li.classList.remove('editing');
                saveTasks();
            };

            editInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    saveEdit();
                }
            });

            editInput.addEventListener('blur', saveEdit);
        });
        // --- 編集機能ここまで ---

        span.addEventListener('click', (e) => {
            // ダブルクリックとシングルクリックを区別
            if (e.detail === 1 && !li.classList.contains('editing')) {
                li.classList.toggle('completed');
                saveTasks();
            }
        });

        // 追加日
        const today = new Date();
        const addDateString = taskData.addDate || `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
        const dateSpan = document.createElement('span');
        dateSpan.textContent = addDateString;
        dateSpan.classList.add('task-date');

        li.appendChild(span);
        li.appendChild(dateSpan);

        // 期限日
        const dueDateString = taskData.dueDate || dueDateInput.value;
        if (dueDateString) {
            const dueDateSpan = document.createElement('span');
            dueDateSpan.textContent = `期限: ${dueDateString.replace(/-/g, '/')}`;
            dueDateSpan.classList.add('due-date');
            li.appendChild(dueDateSpan);

            const today_for_check = new Date();
            today_for_check.setHours(0, 0, 0, 0);
            if (new Date(dueDateString) < today_for_check && !taskData.completed) {
                li.classList.add('overdue');
            }
        }

        // 削除ボタン
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '削除';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            li.remove();
            saveTasks();
        });
        li.appendChild(deleteBtn);

        taskList.appendChild(li);

        if (!taskData.text) {
            taskInput.value = '';
            dueDateInput.value = '';
            saveTasks();
        }
    };

    // ローカルストレージにタスクを保存する関数
    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(li => {
            if (li.classList.contains('editing')) return; // 編集中は保存しない
            const dueDateEl = li.querySelector('.due-date');
            tasks.push({
                text: li.querySelector('.task-text').textContent,
                addDate: li.querySelector('.task-date').textContent,
                dueDate: dueDateEl ? dueDateEl.textContent.replace('期限: ', '').replace(/\//g, '-') : '',
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // 保存されたタスクを読み込んで表示する関数
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTask(task));
    };

    // イベントリスナー
    addBtn.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    // ページ読み込み
    loadTasks();
    
    // テーマ切り替え機能
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;

    const toggleTheme = () => {
        body.classList.toggle('dark-mode');
        localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
    };

    const loadTheme = () => {
        if (localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark-mode');
        }
    };

    themeToggleBtn.addEventListener('click', toggleTheme);
    loadTheme();
});