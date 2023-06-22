import { For, createSignal } from "solid-js";
import { refetchRouteData, useRouteData } from "solid-start";
import server$ from "solid-start/server";
import { createServerData$ } from "solid-start/server";

import { TodoModel } from "~/models/Todo";
import Todo from "~/components/Todo";

// RPC Serverside Functions
const createTodo = server$(async (title: string) => {
  return TodoModel.create({ title, done: false });
})

const toggleTodo = server$(async (id: string, done: boolean) => {
  return await TodoModel.updateOne({ _id: id }, { $set: { done } });
})

// SSR Serverdata
export function routeData() {
  return createServerData$(async () => await TodoModel.fetchAll());
}

export default function Home() {
  const todos = useRouteData<typeof routeData>();

  const [todo_title, set_todo_title] = createSignal<string>("");

  const submitTodo = async (e: SubmitEvent) => {
    e.preventDefault();
    if (await createTodo(todo_title())) {
      set_todo_title("");
      await refetchRouteData();
    };
  }

  const toggle = async (id: string, done: boolean) => {
    toggleTodo(id, done);
    await refetchRouteData();
  }

  return (
    <div class="flex items-center justify-center w-screen h-screen font-medium">
      <div class="flex flex-grow items-center justify-center h-full text-gray-600 bg-gray-100">
        <div class="max-w-full p-8 bg-white rounded-lg shadow-lg w-96">
          <div class="flex items-center mb-6">
            <svg class="h-8 w-8 text-indigo-500 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h4 class="font-semibold ml-3 text-lg">My Todos</h4>
          </div>
          <For each={todos()}>{(todo, i) => (
            <Todo title={todo.title ?? ""} done={todo.done ?? false} id={todo._id} onClick={(id, done) => toggle(id, !done)} />
          )}</For>

          <form onSubmit={submitTodo} class="flex items-center w-full h-8 px-2 mt-2 text-sm font-medium rounded">
            <button>
              <svg class="w-5 h-5 text-gray-400 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
            <input
              class="flex-grow h-8 ml-4 bg-transparent focus:outline-none font-medium"
              type="text" placeholder="add a new task"
              required
              value={todo_title()}
              onInput={(e) => set_todo_title(e.currentTarget.value)} />
          </form>
        </div>
      </div>
    </div>
  );
}