import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm">
        <h1 className="text-4xl font-bold mb-5">
          CPRG 306: Web Development 2 - Assignments
        </h1>
        <div className="text-lg">
          <ul>
            <li className="hover:text-teal-400 hover:underline">
              <Link href="./week-2/">Week 2 Assignment</Link>
            </li>
            <li className="hover:text-teal-400 hover:underline">
              <Link href="./week-3/">Week 3 Assignment</Link>
            </li>
            <li className="hover:text-teal-400 hover:underline">
              <Link href="./week-4/">Week 4 Assignment</Link>
            </li>
            <li className="hover:text-teal-400 hover:underline">
              <Link href="./week-5/">Week 5 Assignment</Link>
            </li>
            <li className="hover:text-teal-400 hover:underline">
              <Link href="./week-6/">Week 6 Assignment</Link>
            </li>
            <li className="hover:text-teal-400 hover:underline">
              <Link href="./week-7/">Week 7 Assignment</Link>
            </li>
            <li className="hover:text-teal-400 hover:underline">
              <Link href="./week-8/">Week 8 Assignment</Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
