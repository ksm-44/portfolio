import { redirect } from "next/navigation";

/** The backlog grew up and became the /now page. */
export default function BacklogRedirect(): never {
  redirect("/now");
}
