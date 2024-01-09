"use client";
import MapSection from "@/components/container/map-section";
import OverviewData from "@/components/reusables/widget/overview-data";
import { currencyFormat } from "@/components/utils/currency-format";
import { HouseholdDataType } from "@/components/utils/generate-data";
import { useEffect, useMemo, useState } from "react";

type CartType = {
  region_name: string;
  monthly_income: number;
  monthly_savings: number;
  monthly_expenses: number;
  monthly_debt: number;
  position: [number, number];
  index: number;
  colorValue: number;
}
export default function Home() {
  const [selectedLayer, setSelectedLayer] = useState<
    {
      colorValue: number;
      elevationValue: number;
      filteredPoints: any;
      index: number;
      points: {
        index: number;
        screenCoord: [number, number];
        source: HouseholdDataType;
      }[];
      position: [number, number];
    }
  >();

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
      attribution: string
      features: any[]
      query: [number, number]
      type: string
    } = await res.json()
    setGeocodeResult(result.features)
  }

  return (
    <div className="h-screen w-screen overflow-hidden">
      <section className="absolute z-50 h-full w-full max-w-sm bg-base-300"></section>
      <MapSection
        onSelectedLayer={async (e) => {
          setSelectedLayer(e);
          getGeocodingAddress(e.position[0], e.position[1]);
        }}
      />
      {selectedLayer && geocodeResult.length > 0 ? (
        <OverviewData
        onAddToCart={() => {
          
        }}
          overviewTitle={geocodeResult.find(
            (item) =>
              item.place_type[0] === "poi" || item.place_type[0] === "address",
          ).place_name}
          onClose={() => setSelectedLayer(undefined)}
          data={[
            {
              title: "monthly income",
              value: currencyFormat(
                selectedLayer.points.reduce(
                  (total, item) => total + item.source.monthly_income,
                  0,
                ),
              ),
            },
            {
              title: "monthly savings",
              value: currencyFormat(
                selectedLayer.points.reduce(
                  (total, item) => total + item.source.monthly_savings,
                  0,
                ),
              ),
            },
            {
              title: "monthly expenses",
              value: currencyFormat(
                selectedLayer.points.reduce(
                  (total, item) => total + item.source.monthly_expenses,
                  0,
                ),
              ),
            },
            {
              title: "monthly debt",
              value: currencyFormat(
                selectedLayer.points.reduce(
                  (total, item) => total + item.source.monthly_debt,
                  0,
                ),
              ),
            },
          ]}
        />
      ) : null}
    </div>
  );
}
