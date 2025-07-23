import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-full sm:w-[300px] md:w-[350px] lg:w-[370px] p-3">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[250px] object-cover rounded-lg"
        />

        {/* Heart Icon Styled for Visibility */}
        <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md">
          <HeartIcon product={product} />
        </div>
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <div className="flex justify-between items-center">
            <h2 className="text-base font-medium truncate">{product.name}</h2>
            <span className="bg-pink-100 text-pink-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
              ₹{product.price}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Product;
