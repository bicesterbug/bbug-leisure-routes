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

const projectDescription = `Welcome to the Bicester Leisure Routes (BLR) documentation website.

This website is aimed at contributers and developers who want to use or improve on the BLR project.
If you're a cyclist want to try out the routes, then the best place to find out more is on the BicesterBUG website: [BicesterBUG.org](https://bicesterbug.org)

The BLR project was devised by BicesterBUG as a way to help residents to discover some of the great cycle paths
that are available in Bicester. Some of these are not well signposted but offer a much safer, faster and more pleasant
way to get between neighbourhoods.

The project has been funded by Active Oxfordshire, enabling the initial website development, flyer design, marketing,
insurance and other associated costs.

## Issues
If you have any issues using this website, or the routes more generally you can raise an issue via [GitHub Issues](https://github.com/bicesterbug/bbug-leisure-routes/issues).

Alternatively, you can email us at [info@bicesterbug.org](mailto:info@bicesterbug.org)

## License
This project is made available under the GNU General Public License version 3. 

The aim of releasing the data in this way is to ensure that the work is not lost, regardless of funding.

## Contributions

BicesterBUG welcome and encourage contributions, in any form. 
This can be route updates, new routes, code improvements, API updates or anything that improves the project.
`

export default async function Home() {
  const routes = await getRoutes();
  return (
    <div>
      <div>
        <Markdown>{projectDescription}</Markdown>
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
