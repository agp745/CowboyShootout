import { FileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

export const Route = new FileRoute("/test/").createRoute({
  component: Test,
});

async function GetData() {
  await new Promise((r) => setTimeout(r, 1000));
  return await fetch("https://httpbin.org/get").then((res) => res.json());
}

function TestQuery() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["testGet"],
    queryFn: GetData,
  });

  if (isLoading) {
    return <div className="text-blue-500">Loading...</div>;
  }

  if (isError) {
    return <div className="text-red-500">Error: ${error.message}</div>;
  }

  return <pre className="p-2 text-wrap">{JSON.stringify(data, null, 2)}</pre>;
}

function Test() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-3">
      <TestQuery />
      <Button variant="secondary">
        <Link to="/">Back Home</Link>
      </Button>
    </div>
  );
}
