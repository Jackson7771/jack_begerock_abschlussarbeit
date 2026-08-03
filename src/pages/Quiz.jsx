import { useState } from 'react'

const sampleQuestion = {
  question: 'Wer gewann die Fahrer-Weltmeisterschaft 2020?',
  options: ['Lewis Hamilton', 'Max Verstappen', 'Sebastian Vettel', 'Valtteri Bottas'],
  answer: 0,
}

export default function Quiz() {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const q = sampleQuestion

  function submit() {
    setIndex((i) => i + 1)
    setSelected(null)
  }

  return (
    <section>
      <h2>Quiz (Prototyp)</h2>
      <div className="card">
        <p>{q.question}</p>
        <ul>
          {q.options.map((o, i) => (
            <li key={i} style={{ margin: '6px 0' }}>
              <label>
                <input type="radio" name="opt" checked={selected===i} onChange={() => setSelected(i)} /> {o}
              </label>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: 12 }}>
          <button onClick={submit}>Nächste Frage</button>
        </div>
      </div>
    </section>
  )
}
