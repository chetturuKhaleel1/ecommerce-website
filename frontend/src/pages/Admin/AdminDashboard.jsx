import Chart from 'react-apexcharts'
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";

import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loading } = useGetUsersQuery();
  const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "line",
      },
      tooltip: {
        theme: "dark",
      },
      colors: ["#00E396"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Trend",
        align: "left",
      },
      grid: {
        borderColor: "#ccc",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Sales",
        },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x),
          },
        },

        series: [
          { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);

  return (
    <>
      <AdminMenu />

      <section className="xl:ml-16 md:ml-0 px-4">
  <div className="w-full flex flex-wrap justify-center gap-6">
    {/* Sales Card */}
    <div className="bg-black text-white rounded-lg p-5 w-[20rem] shadow-lg">
      <div className="font-bold rounded-full w-12 h-12 bg-pink-500 flex items-center justify-center text-white text-xl">
        ₹
      </div>
      <p className="mt-4 text-gray-300">Sales</p>
      <h1 className="text-2xl font-bold mt-2">
        {isLoading ? <Loader /> : `₹ ${sales.totalSales.toFixed(2)}`}
      </h1>
    </div>

    {/* Customers Card */}
    <div className="bg-black text-white rounded-lg p-5 w-[20rem] shadow-lg">
      <div className="font-bold rounded-full w-12 h-12 bg-pink-500 flex items-center justify-center text-xl">
        👥
      </div>
      <p className="mt-4 text-gray-300">Customers</p>
      <h1 className="text-2xl font-bold mt-2">
        {isLoading ? <Loader /> : customers?.length}
      </h1>
    </div>

    {/* Orders Card */}
    <div className="bg-black text-white rounded-lg p-5 w-[20rem] shadow-lg">
      <div className="font-bold rounded-full w-12 h-12 bg-pink-500 flex items-center justify-center text-xl">
        📦
      </div>
      <p className="mt-4 text-gray-300">All Orders</p>
      <h1 className="text-2xl font-bold mt-2">
        {isLoading ? <Loader /> : orders?.totalOrders}
      </h1>
    </div>
  </div>

        <div className="ml-[10rem] mt-[4rem]">
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
            width="70%"
          />
        </div>

        <div className="mt-[4rem]">
          <OrderList />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;