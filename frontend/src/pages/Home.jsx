import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";

import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "../pages/Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword && <Header />}

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between items-center mt-20 px-4 md:px-20">
            <h1 className="text-2xl md:text-4xl font-semibold mb-4 md:mb-0">
              Special Products
            </h1>

            <Link
              to="/shop"
              className="bg-pink-600 text-white font-bold rounded-full py-2 px-6 text-sm md:text-base"
            >
              Shop
            </Link>
          </div>

          <div className="flex justify-center flex-wrap gap-6 mt-8 px-4">
            {data.products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
