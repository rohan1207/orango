import { redirect } from "next/navigation";

/** Legacy `/home` → live homepage at `/`. */
export default function HomeRedirectPage() {
  redirect("/");
}
