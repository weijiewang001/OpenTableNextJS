
import { PRICE, PrismaClient } from "@prisma/client";
import { useRouter } from "next/navigation";
import NavBar from "../components/NavBar";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import SearchSideBar from "./components/SearchSideBar";

const prisma = new PrismaClient();

interface SearchParams {
  city?: string | undefined;
  cuisine?: string | undefined;
  price?: PRICE | undefined;
}

const fetchRestaurantsByCity = (searchParams: SearchParams) => {
  const where: any = {};

  if (searchParams.city) {
    const location = {
      name: {
        equals: searchParams.city.toLowerCase()
      }
    }
    where.location = location
  }
  if (searchParams.cuisine) {
    const cuisine = {
      name: {
        equals: searchParams.cuisine.toLowerCase()
      }
    }
    where.cuisine = cuisine
  }
  if (searchParams.price) {
    const price = {
      equals: searchParams.price
    }
    where.price = price
  }

  // prisma.restaurant.findMany({
  //   where: {
  //     location: {
  //       name: {
  //         equals: " toronto"
  //       }
  //     },
  //     cuisine: {
  //       name: {
  //         equals: "mexican"
  //       }
  //     },
  //     price: {
  //       equals: PRICE.CHEAP
  //     }
  //   }
  // })

  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true,
    reviews: true,
  }
  // if (!city) return prisma.restaurant.findMany({ select })
  return prisma.restaurant.findMany({
    where,
    select,
  })
}

const fetchLocation = () => {
  return prisma.location.findMany()
}
const fetchCuisine = () => {
  return prisma.cuisine.findMany()
}


export default async function Search({ searchParams }: { searchParams: SearchParams }) {

  const restaurants = await fetchRestaurantsByCity(searchParams)
  const locations = await fetchLocation();
  const cuisines = await fetchCuisine(); 4

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar locations={locations} cuisines={cuisines} searchParams={searchParams} />
        <div className="w-5/6">
          {restaurants.length ? (
            <>
              {restaurants.map((restaurant) => (
                <RestaurantCard restaurant={restaurant} key={restaurant.id} />
              ))}
            </>
          ) : (
            <p>Sorry, we found no restaurants in this area</p>
          )}
        </div>
      </div>
    </>

  )
}

