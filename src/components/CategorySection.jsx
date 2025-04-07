import { Link } from "react-router-dom"

const CategorySection = ({ title, categories }) => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-light text-gray-800 inline-block relative">
          {title}
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
        </h2>
      </div>

      <div className="flex overflow-x-auto pb-4 space-x-4 md:grid md:grid-cols-4 md:gap-6 md:space-x-0">
        {categories.map((category, index) => (
          <Link key={index} to={`/shop?category=${category.slug}`} className="min-w-[200px] md:min-w-0">
            <div className="bg-secondary rounded-lg p-4 text-center hover:shadow-md transition duration-300">
              <div className="h-40 flex items-center justify-center">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h3 className="mt-4 text-gray-800 font-medium">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategorySection

