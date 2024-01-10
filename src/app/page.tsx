"use client";
import CartSection from "@/components/container/cart-section";
import MapSection from "@/components/container/map-section";
import OverviewData from "@/components/reusables/widget/overview-data";
import { CartType } from "@/components/types/cart-type";
import { currencyFormat } from "@/components/utils/currency-format";
import { HouseholdDataType } from "@/components/utils/generate-data";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [selectedLayer, setSelectedLayer] = useState<CartType>();

  const [geocodeResult, setGeocodeResult] = useState<any[]>([]);

  const [carts, setCarts] = useState<CartType[]>([]);

  const getGeocodingAddress = async (lng: number, lat: number) => {
    const res = await fetch(
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        lng +
        "," +
        lat +
        ".json?access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_API_KEY,
    );
    const result: {
      attribution: string;
      features: any[];
      query: [number, number];
      type: string;
    } = await res.json();
    setGeocodeResult(result.features);
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      <section className="absolute z-50 h-full w-full max-w-sm overflow-y-auto bg-base-300 p-4">
        <CartSection
          onClickItem={(e) => {
            setSelectedLayer(e);
            getGeocodingAddress(e.position[0], e.position[1]);
          }}
          data={carts}
          onGenerateReport={(e) => {
            console.table(e);
          }}
          onRemoveItem={(index) => {
            carts.splice(index, 1);
          }}
        />
      </section>
      <MapSection
        onSelectedLayer={async (e) => {
          setSelectedLayer(e);
          getGeocodingAddress(e.position[0], e.position[1]);
        }}
      />
      {selectedLayer && geocodeResult.length > 0 ? (
        <OverviewData
          isExistInCart={
            carts.find((item) => item.index === selectedLayer.index)
              ? true
              : false
          }
          onRemoveFromCart={
            carts.find((item) => item.index === selectedLayer.index)
              ? () => {
                  setCarts((prev) =>
                    prev.filter((item) => item.index !== selectedLayer.index),
                  );
                }
              : undefined
          }
          onAddToCart={() => {
            setCarts((prev) => [
              ...prev,
              {
                colorValue: selectedLayer.colorValue,
                index: selectedLayer.index,
                monthly_debt: selectedLayer.monthly_debt,
                monthly_expenses: selectedLayer.monthly_expenses,
                monthly_income: selectedLayer.monthly_income,
                monthly_savings: selectedLayer.monthly_savings,
                position: selectedLayer.position,
                region_name: geocodeResult.find(
                  (item) =>
                    item.place_type[0] === "poi" ||
                    item.place_type[0] === "address",
                ).place_name,
              },
            ]);
          }}
          overviewTitle={
            geocodeResult.find(
              (item) =>
                item.place_type[0] === "poi" ||
                item.place_type[0] === "address",
            ).place_name
          }
          onClose={() => setSelectedLayer(undefined)}
          data={[
            {
              title: "monthly income",
              value: currencyFormat(selectedLayer.monthly_income),
            },
            {
              title: "monthly savings",
              value: currencyFormat(selectedLayer.monthly_savings),
            },
            {
              title: "monthly expenses",
              value: currencyFormat(selectedLayer.monthly_expenses),
            },
            {
              title: "monthly debt",
              value: currencyFormat(selectedLayer.monthly_debt),
            },
          ]}
        />
      ) : null}
    </div>
  );
}
