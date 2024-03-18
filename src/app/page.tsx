import getRoutes from "@/data/getRoutes"
import Link from "next/link";

export default async function Home() {
  const routes = await getRoutes();
  return (
    <div>
      <h1>Bicester Leisure Routes</h1>
      
      <ul>
        {
          routes.map((route) => {
            return (
              <li key={route.id}><Link href={`/routes/${route.id}`}>{route.id} {route.name}</Link></li>
            )
          })
        }
      </ul>
    </div>
  )
}
