import Card from "@/components/Card";
import ContentDiv from "@/components/ContentDiv";
import Typograph from "@/components/Typograph";

export default function Home() {
  return (
    <main className="w-full max-w-5xl py-16 mx-auto">
      <h1 className="text-2xl font-bold">Todo Application</h1>
      <Typograph>Todo Application</Typograph>
      <hr className="border-neutral-700 my-5" />
      <Card>
        <ContentDiv>halo</ContentDiv>
      </Card>
    </main>
  );
}
