import { redirect } from "next/navigation";

// Old route kept so existing links land on the right section.
export default function Page() {
  redirect("/#enquiry");
}
