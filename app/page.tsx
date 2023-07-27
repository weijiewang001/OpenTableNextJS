import RestaurantCard from './components/RestaurantCard'
import Header from './components/Header'
import { PrismaClient, Cuisine, PRICE, Location } from '@prisma/client'


export interface RestaurantCardType {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  price: PRICE;
  location: Location;
  slug: string;
}
const prisma = new PrismaClient();

const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      location: true,
      price: true,
      slug: true,
    },
  });
  return restaurants;
};


export default async function Home() {
  const restaurants = await fetchRestaurants()

  return (
    <main className="bg-gray-100 min-h-screen w-screen">
      <main className="max-w-screen-2xl m-auto bg-white">
        <main>
          <Header />
          <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
            {restaurants.map((restaurant) => (
              <RestaurantCard restaurant={restaurant} />
            ))}
          </div>
        </main>
      </main>
    </main>
  )
}
