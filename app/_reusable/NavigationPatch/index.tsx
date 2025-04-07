import Link from "next/link";

const NavigationPatch = () => {
  return (
    <nav className="bg-gray-800 p-4 sticky z-[100] top-0">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-white text-2xl font-semibold">
          <Link href="/">OprosRU</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavigationPatch;
