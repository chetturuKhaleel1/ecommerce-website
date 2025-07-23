import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";

import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const { data: fetchedCategories = [], isLoading: categoriesLoading } = useFetchCategoriesQuery();
  const { data: filteredProducts = [], isLoading: productsLoading } = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  const [priceFilter, setPriceFilter] = useState("");

  useEffect(() => {
    if (!categoriesLoading && fetchedCategories.length) {
      dispatch(setCategories(fetchedCategories));
    }
  }, [fetchedCategories, categoriesLoading, dispatch]);

  useEffect(() => {
    if (!productsLoading && filteredProducts.length) {
      const filtered = filteredProducts.filter((product) =>
        product.price.toString().includes(priceFilter)
      );
      dispatch(setProducts(filtered));
    }
  }, [checked, radio, filteredProducts, priceFilter, dispatch, productsLoading]);

  const handleCategoryChange = (checkedState, id) => {
    const updated = checkedState
      ? [...checked, id]
      : checked.filter((catId) => catId !== id);
    dispatch(setChecked(updated));
  };

  const handleBrandFilter = (brand) => {
    const brandFiltered = filteredProducts.filter((product) => product.brand === brand);
    dispatch(setProducts(brandFiltered));
  };

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  const uniqueBrands = [...new Set(filteredProducts.map((p) => p.brand).filter(Boolean))];

  const handleReset = () => {
    window.location.reload(); // or a more graceful reset using Redux state
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar Filters */}
        <aside className="bg-[#151515] p-4 mt-2 mb-2 md:w-64">
          {/* Categories */}
          <FilterSection title="Filter by Categories">
            {categories.map((category) => (
              <CheckboxItem
                key={category._id}
                label={category.name}
                id={category._id}
                onChange={(e) => handleCategoryChange(e.target.checked, category._id)}
              />
            ))}
          </FilterSection>

          {/* Brands */}
          <FilterSection title="Filter by Brands">
            {uniqueBrands.map((brand) => (
              <RadioItem
                key={brand}
                label={brand}
                name="brand"
                onChange={() => handleBrandFilter(brand)}
              />
            ))}
          </FilterSection>

          {/* Price */}
          <FilterSection title="Filter by Price">
            <input
              type="text"
              placeholder="Enter Price"
              value={priceFilter}
              onChange={handlePriceChange}
              className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-pink-300"
            />
          </FilterSection>

         <div className="p-5 pt-0">
  <button
    className="w-full border border-white text-white py-2 rounded hover:bg-white hover:text-black transition duration-200"
    onClick={handleReset}
  >
    Reset
  </button>
</div>

        </aside>

        {/* Products List */}
        <main className="flex-1 p-3">
          <h2 className="text-center text-lg font-semibold mb-2">{products.length} Products</h2>
          <div className="flex flex-wrap">
            {productsLoading ? (
              <Loader />
            ) : products.length > 0 ? (
              products.map((product) => (
                <div className="p-3" key={product._id}>
                  <ProductCard p={product} />
                </div>
              ))
            ) : (
              <p className="text-center w-full text-gray-400">No products found.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Shop;

/* --- Reusable UI Subcomponents --- */

const FilterSection = ({ title, children }) => (
  <div className="mb-4">
    <h3 className="text-center py-2 bg-black rounded-full text-white font-semibold mb-2">
      {title}
    </h3>
    <div className="p-5">{children}</div>
  </div>
);

const CheckboxItem = ({ label, id, onChange }) => (
  <div className="flex items-center mb-2">
    <input
      type="checkbox"
      id={`checkbox-${id}`}
      onChange={onChange}
      className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500"
    />
    <label htmlFor={`checkbox-${id}`} className="ml-2 text-sm text-white">
      {label}
    </label>
  </div>
);

const RadioItem = ({ label, name, onChange }) => (
  <div className="flex items-center mb-3">
    <input
      type="radio"
      id={`radio-${label}`}
      name={name}
      onChange={onChange}
      className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 focus:ring-pink-500"
    />
    <label htmlFor={`radio-${label}`} className="ml-2 text-sm text-white">
      {label}
    </label>
  </div>
);
