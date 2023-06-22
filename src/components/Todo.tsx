
interface TodoProps {
  id: string
  title: string
  done: boolean
  onClick: (id: string, done: boolean) => void
}

export default function Todo(props: TodoProps) {
  return (
    <div onClick={() => props.onClick(props.id, props.done)}>
      <input class="hidden" type="checkbox" id={props.id} checked={props.done} />
        <label class="flex items-center h-10 px-2 rounded cursor-pointer hover:bg-gray-100" for="task_1">
          <span class="flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-300 rounded-full">
            <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </span>
          <span class="ml-4 text-sm">{props.title}</span>
        </label>
    </div>
  )
} 