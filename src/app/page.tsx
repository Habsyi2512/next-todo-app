import HeaderTodoSection from "@/components/templates/HeaderTodoSection";
import IncompleteTodoList from "@/components/templates/incomplete-todo-list";

export default function Home() {
  return (
    <>
      <HeaderTodoSection />
      <IncompleteTodoList />
    </>
  );
}
