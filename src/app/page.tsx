import ButtonIcon from "@/components/ButtonIcon";
import TodoList from "@/components/templates/todo-list";

export default function Home() {
  return (
    <main className="w-full max-w-5xl py-16 mx-auto">
      <h1>Typo</h1>
      <hr className="border-neutral-700 my-5" />
      <ButtonIcon
        className="mb-3 bg-green-600 text-neutral-300 hover:bg-green-700 active:bg-green-600"
      >
        Add Task
      </ButtonIcon>
      <TodoList />
    </main>
  );
}
