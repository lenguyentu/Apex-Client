import PageHeader from './components/PageHeader'
import EvaluationCard from './components/EvaluationCard'
import { mockEvaluations } from './mockData'

const Evaluations = () => {
  return (
    <div className="space-y-6">
      <PageHeader />
      <div className="grid grid-cols-1 gap-6">
        {mockEvaluations.map((evaluation) => (
          <EvaluationCard key={evaluation.id} evaluation={evaluation} />
        ))}
      </div>
    </div>
  )
}

export default Evaluations
