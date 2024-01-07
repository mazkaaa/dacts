import { faker } from "@faker-js/faker";
import coordsData from "@/components/data/coords.json";

export type HouseholdDataType = {
  id: string;
  members: number;
  pos: [number, number]
  monthly_income: number;
  monthly_expenses: number;
  monthly_savings: number;
  monthly_debt: number;
}
type CoordsType = {
  lng: number;
  lat: number;
}
export const generateData = () => {
  const data: HouseholdDataType[] = [];
  const coords: CoordsType[]  = coordsData as CoordsType[];
  coords.forEach((coord, index) => {
    data.push({
      id: faker.string.uuid(),
      members: faker.number.int({
        min: 1,
        max: 10,
      }),
      pos: [coord.lng, coord.lat],
      monthly_income: Number(
        faker.finance.amount({
          min: 10,
          max: 10000,
        })
      ),
      monthly_debt: Number(
        faker.finance.amount({
          max: 10000,
        })
      ),
      monthly_expenses: Number(faker.finance.amount()),
      monthly_savings: Number(faker.finance.amount()),
    });
  })
  return data;
};
