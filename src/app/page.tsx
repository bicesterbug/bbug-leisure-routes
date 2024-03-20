import getRoutes from "@/data/getRoutes"
import Link from "next/link";
import Markdown from 'react-markdown';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { readFile } from "fs/promises";
import path from "path";

export default async function Home() {
  const routes = await getRoutes();
  const readme = await readFile(path.resolve('README.md'), {encoding: 'utf8'})
  return (
    <div>
      <div>
        <Markdown>{readme}</Markdown>
      </div>
      <h1>Routes</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {
          routes.map((route) => {
            return (
              <TableRow key={route.id}>
                <TableCell>{route.id}</TableCell>
                <TableCell>
                  <Link href={`/routes/${route.id}`}>{route.id} {route.name}</Link>
                </TableCell>
                <TableCell>{route.level}</TableCell>
              </TableRow>
            )
          })
        }
        </TableBody>
      </Table>

    </div>
  )
}
