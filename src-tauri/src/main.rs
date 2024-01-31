use serde::{ Serialize, Deserialize };

#[cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#[derive(Debug, Serialize, Deserialize)]
struct Todos {
    items: Vec<TodoItem>,
}

impl Todos {
    fn push_todo(&mut self, item: TodoItem) {
        self.items.push(item);
    }
}

#[derive(Debug, Serialize, Deserialize)]
struct TodoItem {
    label: String,
    desc: String,
}

#[tauri::command]
fn add_todo(todos: tauri::State<'_, Todos>, todo_item: TodoItem) -> String {
    println!("{:?}", todo_item);
    // todos.push_todo(todo_item);

    String::from("Todo added successfully")
}

fn main() {
    // Initialize the Todos struct with an empty vector
    let mut todos = Todos { items: Vec::new() };

    tauri::Builder
        ::default()
        .invoke_handler(tauri::generate_handler![add_todo])
        .manage(todos)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
