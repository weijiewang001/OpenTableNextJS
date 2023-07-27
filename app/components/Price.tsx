import { PRICE } from "@prisma/client";

export default function Price({ price }: { price: PRICE }) {
  const renderPirce = () => {
    if (price === PRICE.CHEAP) {
      return <>
        <span>$$</span><span className="text-gray-400">$$</span>
      </>
    } else if (price === PRICE.REGULAR) {
      return <>
        <span>$$$</span><span className="text-gray-400">$</span>
      </>
    } else {
      <span>$$$$</span>
    }
  }


  return (
    <p className="mr-3 flex">{renderPirce()}</p>
  )
}