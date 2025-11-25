import PageHeader from './components/PageHeader'
import CandidatesTable from './components/CandidatesTable'
import { mockCandidates } from './mockData'

const Candidates = () => {
  return (
    <div className="space-y-6">
      <PageHeader />
      <CandidatesTable candidates={mockCandidates} />
    </div>
  )
}

export default Candidates
