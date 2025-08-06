import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
import Footer from '@/components/Footer'
import { SearchProvider, SearchConfig } from 'pliny/search'
import siteMetadata from '@/data/siteMetadata'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SectionContainer>
      <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
        <Header />
        <main className="mb-auto">{children}</main>
      </SearchProvider>
      <Footer />
    </SectionContainer>
  )
}
