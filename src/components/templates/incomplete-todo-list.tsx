import Card from "@/components/Card";
import ContentDiv from "@/components/ContentDiv";
import TodoAction from "./TodoAction";
import { getFormattedDate } from "@/utils/dateUtils";
import { TypeTodo } from "@/types/interface";

export default async function IncompleteTodoList() {
  const data = (await fetch(
    "http://localhost:3000/api/todo/get-incomplete-todos",
    { cache: "force-cache", next: { tags: ["incomplete-todos"] } }
  ).then((res) => res.json())) as { message: string; data: TypeTodo[] };

  if (data.data.length === 0) return <p>No Data...</p>;

  return (
    <div className="space-y-3">
      {data.data.map((todo: TypeTodo) => (
        <Card key={todo.id} className="flex items-center">
          <ContentDiv className="flex-1 rounded-lg">
            <p className="mb-1">{todo.title}</p>
            <p className="text-xs">
              <span>
                Created At: {getFormattedDate(String(todo.created_at))}
              </span>{" "}
              |{" "}
              <span>
                Last Update: {getFormattedDate(String(todo.updated_at))}
              </span>
            </p>
          </ContentDiv>
          <TodoAction todo={todo} />
        </Card>
      ))}
    </div>
  );
}
