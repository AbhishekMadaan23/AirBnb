import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import Header from "../components/Header";
import Banner from "@/components/Banner";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
          {/* 
          {exploreData?.map((item) => (
            <h1>{item.location}</h1>
          ))} */}
        </section>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const exploreData = await fetch("https://links.papareact.com/pyp").then(
      (res) => res.json()
    );
    console.log("////", exploreData);
    return {
      props: {
        exploreData,
      },
    };
  } catch (error) {
    console.log("::::::", error);
    return {
      props: {
        exploreData: [],
      },
    };
  }
}
