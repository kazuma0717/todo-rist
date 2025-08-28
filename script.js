// HTMLの読み込みが完了したら実行する
document.addEventListener('DOMContentLoaded', () => {

    // 必要な要素を取得
    const taskInput = document.getElementById('task-input');
    const dueDateInput = document.getElementById('due-date-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');

    // タスクを追加/表示するためのメイン関数
    const createTaskElement = (taskData) => {
        const li = document.createElement('li');
        if (taskData.completed) {
            li.classList.add('completed');
        }

        // タスク名
        const span = document.createElement('span');
        span.textContent = taskData.text;
        span.classList.add('task-text');
        
        // --- 編集機能 ---
        span.addEventListener('dblclick', () => {
            // 他の編集中タスクがあれば、先に保存する
            const currentlyEditing = document.querySelector('li.editing');
            if (currentlyEditing) {
                currentlyEditing.querySelector('.edit-input').blur();
            }

            li.classList.add('editing');

            const editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.value = span.textContent;
            editInput.classList.add('edit-input');
            
            li.insertBefore(editInput, span);
            editInput.focus();

            const saveEdit = () => {
                if (!li.classList.contains('editing')) return; // 既に保存済みの場合は何もしない
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

        // 完了・未完了の切り替え
        span.addEventListener('click', (e) => {
            if (e.detail === 1 && !li.classList.contains('editing')) {
                li.classList.toggle('completed');
                saveTasks();
            }
        });

        // 追加日
        const dateSpan = document.createElement('span');
        dateSpan.textContent = taskData.addDate;
        dateSpan.classList.add('task-date');

        li.appendChild(span);
        li.appendChild(dateSpan);

        // 期限日
        if (taskData.dueDate) {
            const dueDateSpan = document.createElement('span');
            dueDateSpan.textContent = `期限: ${taskData.dueDate.replace(/-/g, '/')}`;
            dueDateSpan.classList.add('due-date');
            li.appendChild(dueDateSpan);

            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (new Date(taskData.dueDate) < today && !taskData.completed) {
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

        return li;
    };

    const addNewTask = () => {
        const text = taskInput.value.trim();
        if (text === '') return;

        const today = new Date();
        const taskData = {
            text: text,
            addDate: `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`,
            dueDate: dueDateInput.value,
            completed: false
        };

        const li = createTaskElement(taskData);
        taskList.appendChild(li);

        taskInput.value = '';
        dueDateInput.value = '';
        saveTasks();
    };

    // ローカルストレージにタスクを保存する関数
    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(li => {
            if (li.classList.contains('editing')) return;
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
        tasks.forEach(task => {
            const li = createTaskElement(task);
            taskList.appendChild(li);
        });
    };

    // イベントリスナー
    addBtn.addEventListener('click', addNewTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addNewTask();
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

