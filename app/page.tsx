import Carousel from '../components/Carousel'
import CounterContainer from '../components/CounterContainer'
import NewsGrid from '../components/NewsGrid'
import Hero from '../components/Hero'
import Support from '../components/Support'
import ProjectsGrid from '../components/ProjectsGrid'
import Founders from '../components/Founders'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div>
      <Carousel />
      <CounterContainer />
      <NewsGrid />
      <Hero />
      <Support />
      <ProjectsGrid />
      <Founders />
      <Footer />
      </div>
  )
}
