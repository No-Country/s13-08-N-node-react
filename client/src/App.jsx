import { useMongoDBStore } from './stores/mongoDB.store';

export default function App() {
  const trial = useMongoDBStore(state => state.trial)

  return (
    <div>
      <p>{trial}</p>
    </div>
  )
}