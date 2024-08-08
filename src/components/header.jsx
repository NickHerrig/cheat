export default function Header() {
  return (
    <header className="bg-gray-800 py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-2xl font-bold no-underline hover:text-gray-300">🍩 Cheat Day</a>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="/" className="text-white hover:text-gray-300">
                Home
              </a>
            </li>
            <li>
              <a href="/login" className="text-white hover:text-gray-300">
                Login
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
