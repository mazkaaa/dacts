import MapSection from "@/components/container/map-section";

export default function Home() {

  return (
    <div className="w-screen h-screen overflow-hidden">
      <section className="w-full max-w-sm bg-base-300 h-full absolute z-50"></section>
      <MapSection />
    </div>
  );
}
