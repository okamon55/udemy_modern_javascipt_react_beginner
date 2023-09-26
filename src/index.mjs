import "./styles.css";

const addTodo = () => {
  // Todo入力欄から値を取得、クリア
  const todoText = document.getElementById("todo-text").value;
  document.getElementById("todo-text").value = "";

  createIncompleteTodoList(todoText);
};

const deleteFromIncompleteList = (id, target) => {
  document.getElementById(id).removeChild(target);
};

const createIncompleteTodoList = (todoText) => {
  // todoリストのDOMを生成
  const todoDiv = document.createElement("div");
  todoDiv.className = "list-row";

  const todoTextDiv = document.createElement("div");
  todoTextDiv.className = "todo";
  todoTextDiv.innerHTML = todoText;
  todoDiv.appendChild(todoTextDiv);

  // 完了ボタン生成
  const completeTodoButton = document.createElement("button");
  completeTodoButton.type = "button";
  completeTodoButton.innerText = "完了";
  completeTodoButton.addEventListener("click", () => {
    // 親タグを未完了Todoリストから削除
    deleteFromIncompleteList(
      "incomplete-todo-list",
      completeTodoButton.parentNode.parentNode,
    );

    // 未完了Todoリストからデータ取得
    const addTarget = completeTodoButton.parentNode;
    const text = addTarget.firstElementChild.innerHTML;

    // 完了TodoリストのDOMを作成
    addTarget.textContent = null;
    const todoTextDiv = document.createElement("div");
    todoTextDiv.className = "todo";
    todoTextDiv.innerHTML = text;
    const backTodoButton = document.createElement("button");
    backTodoButton.type = "button";
    backTodoButton.innerText = "戻す";
    backTodoButton.addEventListener("click", () => {
      deleteFromIncompleteList(
        "complete-todo-list",
        backTodoButton.parentNode.parentNode,
      );

      const text = backTodoButton.parentNode.firstElementChild.innerHTML;
      createIncompleteTodoList(text);
    });
    addTarget.appendChild(todoTextDiv);
    addTarget.appendChild(backTodoButton);
    const todoListLi = document.createElement("li");
    todoListLi.appendChild(addTarget);

    // 完了TodoリストへDOMを追加
    const completeTodoListUl = document.getElementById("complete-todo-list");
    completeTodoListUl.appendChild(todoListLi);
  });
  // 削除ボタン生成
  const deleteTodoButton = document.createElement("button");
  deleteTodoButton.type = "button";
  deleteTodoButton.innerText = "削除";
  deleteTodoButton.addEventListener("click", () => {
    // 親タグを未完了Todoリストから削除
    deleteFromIncompleteList(
      "incomplete-todo-list",
      deleteTodoButton.parentNode.parentNode,
    );
  });

  // todoリストのボタンを追加
  todoDiv.appendChild(completeTodoButton);
  todoDiv.appendChild(deleteTodoButton);

  const todoListLi = document.createElement("li");
  todoListLi.appendChild(todoDiv);

  const incompleteTodoListUl = document.getElementById("incomplete-todo-list");
  incompleteTodoListUl.appendChild(todoListLi);
};

document.getElementById("add-todo").addEventListener("click", () => addTodo());
