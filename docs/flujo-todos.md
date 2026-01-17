Flujo Todo-List + Supabase:

🟢 Add Todo

Usuario escribe texto en el formulario

addTodo(text) llama a Supabase .insert({ text, completed: false })

Supabase devuelve todo completo (id, text, completed, created_at) → data

dispatch({ type: "ADD_TODO", payload: data })

Reducer añade el todo al estado → React renderiza

🔴 Delete Todo

Usuario hace click en “Borrar”

deleteTodo(id) llama a Supabase .delete().eq("id", id)

Supabase borra el registro

dispatch({ type: "DELETE_TODO", payload: id })

Reducer elimina el todo → React renderiza

🟡 Toggle Todo

Usuario hace click en checkbox/botón

toggleTodo(id) busca todo en state.todos

Llama a Supabase .update({ completed: !todo.completed }).eq("id", id)

dispatch({ type: "TOGGLE_TODO", payload: id })

Reducer invierte completed → React renderiza

🔵 Update Todo (texto)

Usuario edita texto y guarda

updateTodo(id, newText) llama a Supabase .update({ text: newText }).eq("id", id)

dispatch({ type: "UPDATE_TODO", payload: { id, text: newText } })

Reducer actualiza texto → React renderiza

| Acción | Supabase devuelve | Reducer necesita | Comentario                         |
| ------ | ----------------- | ---------------- | ---------------------------------- |
| Add    | Todo completo     | Todo completo    | Necesario para `id` y `created_at` |
| Delete | opcional          | id               | Solo filtra, nada más              |
| Toggle | opcional          | id               | Reducer invierte booleano          |
| Update | opcional          | id + text        | Reducer cambia texto               |
