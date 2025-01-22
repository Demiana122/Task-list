
import Link from "next/link";
import prisma from "@/utils/db";
import StatusBadge from "@/components/StatusBadge";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
import { Status } from "@prisma/client";

export const dynamic = "force-dynamic";
//export const revalidate = 10;

const HomePage = async () => {
  const tasks = await prisma.task.findMany();

  return (
    <section>
      <h1 className="text-4xl font-semibold">Tasks List App</h1>
      <div className="flex items-center justify-end mb-20">
        <Link
          href="/task/add"
          className="bg-cyan-300 hover:bg-cyan-400 transition-colors text-black py-1 px-2 text-xl font-semibold rounded-sm"
        >
          Add Task
        </Link>
      </div>
      <table className="table w-full text-left mt-5">
        <thead className="border-t-2 border-b-2 border-gray-300 text-xl">
          <tr>
            <th className="p-3">#</th>
            <th>Task Title</th>
            <th>Task Status</th>
            <th>Task Details</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task: { id: Key | null | undefined; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; status: unknown; }, index: number) => (
            <tr key={task.id} className="border-b border-gray-500">
              <td className="p-3">{index + 1}</td>
              <td>{task.title}</td>
              <td>
                <StatusBadge status={task.status as Status} />
              </td>
              <td>
                <Link
                  href={`/task/${task.id}`}
                  className="bg-blue-600 hover:bg-blue-800 transition-colors text-white rounded-md p-2"
                >
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default HomePage;