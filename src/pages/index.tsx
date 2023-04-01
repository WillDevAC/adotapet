import { HomePage } from "@/templates/Home"
import { NextPage } from "next"
import { FilterProvider } from "@/contexts/filter"

import withTokenExpirationCheck from "@/utils/TokenExpirationCheck"

const Home: NextPage = () => {
  return (
    <FilterProvider>
      <HomePage />
    </FilterProvider>
  )
}

export default withTokenExpirationCheck(Home)
