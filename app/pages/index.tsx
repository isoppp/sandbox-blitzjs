import { BlitzPage } from 'blitz'
import Layout from 'app/layouts/Layout'
/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const Home: BlitzPage = () => {
  return (
    <div className="container mx-auto p-10">
      <h1 className="text-4xl font-bold text-center">Congrats!</h1>
    </div>
  )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
