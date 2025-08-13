// HTMLの読み込みが完了したら実行する
document.addEventListener('DOMContentLoaded', () => {

    // 必要な要素を取得
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');

    // タスクを追加する関数
    const addTask = () => {
        const taskText = taskInput.value.trim(); // 入力値を取得し、前後の空白を削除

        if (taskText === '') {
            // 入力が空の場合は何もしない
            return;
        }

        // li要素を作成
        const li = document.createElement('li');

        // span要素（タスク名）を作成
        const span = document.createElement('span');
        span.textContent = taskText;
        span.addEventListener('click', () => {
            li.classList.toggle('completed'); // 'completed'クラスを付け外し
            saveTasks(); // 状態を保存
        });

        // 削除ボタンを作成
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '削除';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            li.remove(); // li要素を削除
            saveTasks(); // 状態を保存
        });

        // li要素にspanと削除ボタンを追加
        li.appendChild(span);
        li.appendChild(deleteBtn);

        // ul（taskList）にliを追加
        taskList.appendChild(li);

        // 入力欄を空にする
        taskInput.value = '';

        // 作成したタスクを保存
        saveTasks();
    };

    // ブラウザのローカルストレージにタスクを保存する関数
    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(li => {
            tasks.push({
                text: li.querySelector('span').textContent,
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
                // 保存されているタスクを元に、addTaskとほぼ同じ処理で要素を復元
                const li = document.createElement('li');
                if (task.completed) {
                    li.classList.add('completed');
                }
                const span = document.createElement('span');
                span.textContent = task.text;
                span.addEventListener('click', () => {
                    li.classList.toggle('completed');
                    saveTasks();
                });
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = '削除';
                deleteBtn.classList.add('delete-btn');
                deleteBtn.addEventListener('click', () => {
                    li.remove();
                    saveTasks();
                });

                li.appendChild(span);
                li.appendChild(deleteBtn);
                taskList.appendChild(li);
            });
        }
    };

    // 追加ボタンのクリックイベント
    addBtn.addEventListener('click', addTask);

    // 入力欄でEnterキーが押された時のイベント
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // ページ読み込み時に保存されたタスクを読み込む
    loadTasks();
});