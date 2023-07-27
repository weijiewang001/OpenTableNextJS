import Link from "next/link";

export default function RestaurantNavBar() {
  return (
    <nav className="flex text-reg border-b pb-2">
      <Link href="/" className="mr-7"> Overview </Link>
      <Link href="/restaurant/s/menu" className="mr-7"> Menu </Link>
    </nav>
  )
}
