import { Bunting } from "@/components/Bunting";
import { Shopfront } from "@/components/sections/Shopfront";
import { Proprietor } from "@/components/sections/Proprietor";
import { Workshops } from "@/components/sections/Workshops";
import { Stalls } from "@/components/sections/Stalls";
import { Stock } from "@/components/sections/Stock";
import { Enquiry } from "@/components/sections/Enquiry";

export default function Home() {
  return (
    <>
      <Shopfront />
      <Bunting />
      <Proprietor />
      <Bunting offset={2} />
      <Workshops />
      <Bunting offset={4} />
      <Stalls />
      <Bunting offset={1} />
      <Stock />
      <Bunting offset={3} />
      <Enquiry />
    </>
  );
}
