import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import React from "react";
import { format } from "date-fns";

const Search = ({ searchResults }) => {
  const router = useRouter();

  console.log(router.query, "/////");

  //ES6 Destructuring
  const { location, startDate, endDate, noOfGuests } = router.query;

  const formattedStartDate = format(new Date(startDate), "dd MMMM yy");

  const formattedEndDate = format(new Date(endDate), "dd MMMM yy");

  const range = `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${noOfGuests}`} />

      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300 - {range} - Stays - {noOfGuests} number of guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>
          <div className=" lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button ">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>
          {searchResults.map((item) => (
            <div key={item.id} className="flex flex-col">
              <img
                src={item.img}
                alt=""
                className="h-52 w-full object-cover rounded-2xl"
              />
              <div className="flex flex-col flex-grow pl-2">
                <p className="text-sm">{item.location}</p>
                <h4 className="text-xl">{item.title}</h4>
                <div className="border-b w-10 pt-2" />
                <p className="pt-2 text-sm text-gray-500 flex-grow">
                  {item.description}
                </p>
                <div className="flex justify-between items-end pt-5">
                  <p className="flex items-center">
                    <span className="text-lg font-semibold">{item.price}</span>
                    <span className="text-sm font-extralight">/ night</span>
                  </p>
                  <div>
                    <p className="text-lg font-semibold">{item.totalPrice}</p>
                    <p className="text-sm font-extralight">
                      {item.longDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch("https://www.jsonkeeper.com/b/5NPS").then(
    (res) => res.json()
  );

  return {
    props: {
      searchResults,
    },
  };
}
