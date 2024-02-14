import Head from "next/head";
import Header from "../components/Header";
import Banner from "@/components/Banner";
import SmallCard from "@/components/SmallCard";
import MediumCard from "@/components/MediumCard";
import LargeCard from "@/components/LargeCard";
import Footer from "@/components/Footer";

export default function Home({ exploreData, liveAnywhereData }) {
  if (!exploreData || exploreData.length === 0) {
    return <div>Loading...</div>; // Or display an error message
  }

  return (
    <div className="">
      <Head>
        <title>Airbnb</title>
      </Head>
      <Header />
      <Banner />

      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map((item, index) => (
              <SmallCard
                key={index}
                img={item.img}
                location={item.location}
                distance={item.distance}
              />
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
          <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">
            {liveAnywhereData?.map(({ img, title }) => (
              <MediumCard key={img} img={img} title={title} />
            ))}
          </div>
        </section>

        <LargeCard
          img="https://links.papareact.com/4cj"
          title="The Greatest Outdoors"
          description="Wishlists curated by Airbnb."
          buttonText="Get Inspired"
        />
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  try {
    const exploreData = await fetch("https://www.jsonkeeper.com/b/4G1G").then(
      (res) => res.json()
    );

    const liveAnywhereData = await fetch(
      "https://www.jsonkeeper.com/b/VHHT"
    ).then((res) => res.json());

    console.log("Explore Data:", exploreData); // Debugging message
    return {
      props: {
        exploreData,
        liveAnywhereData,
      },
    };
  } catch (error) {
    console.error("Error fetching explore data:", error); // Error message
    return {
      props: {
        exploreData: [],
      },
    };
  }
}
