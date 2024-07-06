import Link from 'next/link';
import "./globals.css";

export default function Home() {
  return (
    <ul>
      <li>
        <Link href="/recursive">
          Recursive Tree
        </Link>
      </li>
      <li>
        <Link href="/iterative">
          Iterative Tree
        </Link>
      </li>
    </ul>


  );
}
