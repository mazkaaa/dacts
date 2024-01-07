"use client";
import React, { useEffect, useMemo, useState } from "react";
import DeckGL from "@deck.gl/react/typed";
import Map from "react-map-gl";
import { HexagonLayer } from "@deck.gl/aggregation-layers/typed";
import { LineLayer } from "@deck.gl/layers/typed";
import { ScreenGridLayer } from "@deck.gl/aggregation-layers/typed";
import {
  HouseholdDataType,
  generateData,
} from "@/components/utils/generate-data";

import "mapbox-gl/dist/mapbox-gl.css";

type MapDeckProps = {
  onSelectedLayer?: (event: any) => void
};
type ObjectHexagonType = {
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
};

const MapSection = (props: MapDeckProps) => {
  const colorRange = [
    [255, 255, 178, 25],
    [254, 217, 118, 85],
    [254, 178, 76, 127],
    [253, 141, 60, 170],
    [240, 59, 32, 212],
    [189, 0, 38, 255],
  ];

  const generatedData = useMemo(() => generateData(), [])

  const layers = new HexagonLayer({
    id: "hexagon-layer",
    data: generatedData,
    pickable: true,
    extruded: true,
    radius: 1000,
    elevationScale: 100,
    getPosition: (d: HouseholdDataType) => d.pos,
    colorRange: colorRange as any,
    elevationAggregation: "SUM",
    onClick: (e) => {
      const object: ObjectHexagonType = e.object;
      if (props.onSelectedLayer) {
        props.onSelectedLayer(object);
      }
      return true;
    },
  });

  // const layers = [
  //   new ScreenGridLayer({
  //     id: "grid",
  //     data: generateData(),
  //     opacity: 0.5,
  //     getPosition: (d: HouseholdDataType) => d.pos,
  //     cellSizePixels: 40,
  //     colorRange: colorRange as any,
  //     gpuAggregation: true,
  //     aggregation: "SUM",
  //   }),
  // ];

  const INITIAL_VIEW_STATE = {
    longitude: -0.198465,
    latitude: 51.505538,
    zoom: 6.6,
    maxZoom: 16,
    pitch: 40.5,
    bearing: 0,
  };

  return (
    <div className="relative h-full w-full">
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={[layers]}
        getTooltip={({ object }) => object && object.monthly_income}
      >
        <Map
          reuseMaps={true}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
          mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        />
      </DeckGL>
    </div>
  );
};

export default MapSection;
