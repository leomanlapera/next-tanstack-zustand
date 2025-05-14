import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <div>
        <div>daily practice apps</div>
        <ul className="list-inside list-disc">
          <li>
            <Link href="/todo" className="underline underline-offset-4">
              todo app
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
