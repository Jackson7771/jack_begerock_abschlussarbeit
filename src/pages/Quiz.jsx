import { useState } from 'react'

const questions = [
  {
    question: 'Wer gewann die Fahrer-Weltmeisterschaft 2020?',
    options: ['Lewis Hamilton', 'Max Verstappen', 'Sebastian Vettel', 'Valtteri Bottas'],
    answer: 0,
  },
  {
    question: 'Welches Team gewann die Konstrukteurs-Weltmeisterschaft 2021?',
    options: ['Mercedes', 'Red Bull', 'Ferrari', 'McLaren'],
    answer: 0,
  },
  {
    question: 'Welcher Fahrer hat den Rekord für die meisten Pole-Positions?',
    options: ['Ayrton Senna', 'Michael Schumacher', 'Lewis Hamilton', 'Max Verstappen'],
    answer: 2,
  },
]

export default function Quiz() {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const q = questions[index]

  function submit() {
    if (selected === null) return
    if (selected === q.answer) {
      setScore((prev) => prev + 1)
    }
    setShowResult(true)
  }

  function next() {
    setSelected(null)
    setShowResult(false)
    setIndex((prev) => prev + 1)
  }

  function restart() {
    setIndex(0)
    setSelected(null)
    setShowResult(false)
    setScore(0)
  }

  return (
    <section>
      <h2>Quiz</h2>
      <div className="card">
        {!showResult ? (
          <>
            <p>{q.question}</p>
            <ul>
              {q.options.map((option, i) => (
                <li key={i} style={{ margin: '8px 0' }}>
                  <label>
                    <input
                      type="radio"
                      name="quiz-option"
                      checked={selected === i}
                      onChange={() => setSelected(i)}
                    />
                    {' '}
                    {option}
                  </label>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 16 }}>
              <button onClick={submit} disabled={selected === null}>
                Antwort prüfen
              </button>
            </div>
          </>
        ) : (
          <>
            <p>
              {selected === q.answer ? 'Richtig! Gut gemacht.' : 'Das war leider nicht richtig.'}
            </p>
            <p>
              Richtige Antwort: <strong>{q.options[q.answer]}</strong>
            </p>
            <p>Aktueller Punktestand: {score} / {index + 1}</p>
            <div style={{ marginTop: 16 }}>
              {index + 1 < questions.length ? (
                <button onClick={next}>Nächste Frage</button>
              ) : (
                <button onClick={restart}>Quiz neu starten</button>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
