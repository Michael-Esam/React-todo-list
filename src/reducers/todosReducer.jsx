import {v4 as uid} from 'uuid';


export default function todosReducer(curr, action) {
  switch (action.type) {
    case "add": {
      if (action.payload.title.trim() !== "") {
        let newIn = {
          id: uid(),
          title: action.payload.title.trim(),
          des: "",
          checked: false,
        };
        let update = [...curr, newIn];

        localStorage.setItem("todos", JSON.stringify(update));
        return update;
      }
    }
    case "delete": {
      const newTodos = curr.filter((todo) => todo.id !== action.payload.id);
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    }
    case "edit": {
      event.preventDefault();
      const Dtodo = action.payload;
      const updated = curr.map((t) =>
        t.id === Dtodo.id ? { ...t, title: Dtodo.title, des: Dtodo.des } : t
      );
      localStorage.setItem("todos", JSON.stringify(updated));
      return updated;
    }
    case "get": {
      return JSON.parse(localStorage.getItem("todos"));
    }
    case "checked": {
        const updated = curr.map((t) =>
        t.id === action.payload.id ? { ...t, checked: !t.checked } : t
      );
    localStorage.setItem("todos",JSON.stringify(updated))
    return updated
    }
    default: {
      throw Error("unknown action" + action.type);
    }
  }
  return [];
}