import { useState } from 'react'

const quizPools = {
  history: [
    {
      question: 'Wer gewann die Fahrer-Weltmeisterschaft 2020?',
      options: ['Max Verstappen', 'Lewis Hamilton', 'Sebastian Vettel', 'Valtteri Bottas'],
      answer: 1,
    },
    {
      question: 'Welches Team gewann die Konstrukteurs-Weltmeisterschaft 2021?',
      options: ['Ferrari', 'Red Bull', 'Mercedes', 'McLaren'],
      answer: 2,
    },
    {
      question: 'Wer war der erste Fahrer, der sieben Formel-1-Weltmeistertitel gewann?',
      options: ['Lewis Hamilton', 'Michael Schumacher', 'Sebastian Vettel', 'Ayrton Senna'],
      answer: 1,
    },
    {
      question: 'In welchem Jahr gewann Niki Lauda seinen ersten Fahrer-Titel?',
      options: ['1977', '1975', '1979', '1981'],
      answer: 1,
    },
    {
      question: 'Welcher Fahrer gewann den ersten offiziell gewerteten Formel-1-Weltmeistertitel 1950?',
      options: ['Giuseppe Farina', 'Juan Manuel Fangio', 'Stirling Moss', 'Alberto Ascari'],
      answer: 0,
    },
    {
      question: 'Wie viele Siege erreichte Michael Schumacher in seiner Karriere?',
      options: ['72', '91', '84', '103'],
      answer: 1,
    },
    {
      question: 'Welcher deutsche Fahrer gewann vier Weltmeistertitel in Folge von 2010 bis 2013?',
      options: ['Nico Rosberg', 'Sebastian Vettel', 'Michael Schumacher', 'Mick Schumacher'],
      answer: 1,
    },
    {
      question: 'Welcher Rennstall war in den 1990er Jahren mit Ayrton Senna und Alain Prost erfolgreich?',
      options: ['Williams', 'Ferrari', 'Benetton', 'McLaren'],
      answer: 3,
    },
    {
      question: 'Welcher Fahrer wurde 2008 Weltmeister nach einem Zieleinlauf in letzter Kurve?',
      options: ['Felipe Massa', 'Lewis Hamilton', 'Kimi Räikkönen', 'Fernando Alonso'],
      answer: 1,
    },
    {
      question: 'Wer gewann die Formel-1-Saison 1988 mit 15 Siegen aus 16 Rennen?',
      options: ['Team Ferrari', 'Team McLaren', 'Ayrton Senna', 'Nelson Piquet'],
      answer: 1,
    },
  ],
  current: [
    {
      question: 'Welcher Fahrer fährt aktuell für Red Bull Racing?',
      options: ['Max Verstappen', 'Charles Leclerc', 'Lewis Hamilton', 'Lando Norris'],
      answer: 0,
    },
    {
      question: 'Welches Team ist in der aktuellen Saison als Mercedes bekannt?',
      options: ['Scuderia Ferrari', 'Mercedes-AMG Petronas', 'McLaren F1 Team', 'Aston Martin'],
      answer: 1,
    },
    {
      question: 'Welcher Fahrer steht aktuell bei Ferrari unter Vertrag?',
      options: ['George Russell', 'Charles Leclerc', 'Sergio Pérez', 'Oscar Piastri'],
      answer: 1,
    },
    {
      question: 'Welches Team fährt mit grüner Lackierung und einem britischen Sponsor?',
      options: ['Alpine', 'Aston Martin', 'Haas', 'Williams'],
      answer: 1,
    },
    {
      question: 'Welcher Fahrer ist aktuell Teamkollege von Lando Norris?',
      options: ['George Russell', 'Oscar Piastri', 'Carlos Sainz', 'Sergio Pérez'],
      answer: 1,
    },
    {
      question: 'Welches Team ist bekannt für sein schwarzes und rotes Design mit Honda-Technologie?',
      options: ['Red Bull Racing', 'Ferrari', 'Haas', 'AlphaTauri'],
      answer: 0,
    },
    {
      question: 'Wer war zuletzt in der Startaufstellung der Nummer 44 zu finden?',
      options: ['Max Verstappen', 'Lewis Hamilton', 'Charles Leclerc', 'Fernando Alonso'],
      answer: 1,
    },
    {
      question: 'Welches Team fährt derzeit mit einem blauen, pinken und weißen Farbdesign?',
      options: ['Williams', 'BWT Alpine', 'Haas', 'Sauber'],
      answer: 1,
    },
    {
      question: 'Wofür steht der Begriff „Grid“ in der Formel 1?',
      options: ['Startaufstellung', 'Reifenwahl', 'Boxenstrategie', 'Motorenleistung'],
      answer: 0,
    },
    {
      question: 'Welcher Fahrer fährt aktuell unter dem Spitznamen „Checo“?',
      options: ['Nico Hülkenberg', 'Sergio Pérez', 'Daniel Ricciardo', 'Pierre Gasly'],
      answer: 1,
    },
  ],
}

const categories = [
  { id: 'history', label: 'Geschichte' },
  { id: 'current', label: 'Aktuelles Grid' },
]

export default function Quiz() {
  const [category, setCategory] = useState('')
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const questions = category ? quizPools[category] : []
  const q = questions[index]

  function startQuiz() {
    if (!category) return
    setIndex(0)
    setSelected(null)
    setScore(0)
    setShowResult(false)
  }

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
    setCategory('')
    setIndex(0)
    setSelected(null)
    setShowResult(false)
    setScore(0)
  }

  return (
    <section>
      <h2>Quiz</h2>
      <p>Wähle zuerst eine Kategorie und beantworte anschließend mehrere Fragen.</p>
      <div className="card">
        {!category ? (
          <>
            <h3>Quiz-Kategorie wählen</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {categories.map((cat) => (
                <li key={cat.id} style={{ margin: '10px 0' }}>
                  <label>
                    <input
                      type="radio"
                      name="quiz-category"
                      checked={category === cat.id}
                      onChange={() => setCategory(cat.id)}
                    />
                    {' '}
                    {cat.label}
                  </label>
                </li>
              ))}
            </ul>
            <button onClick={startQuiz} disabled={!category} style={{ marginTop: 16 }}>
              Quiz starten
            </button>
          </>
        ) : (
          <>
            <h3>{categories.find((cat) => cat.id === category)?.label} Quiz</h3>
            <p>
              Frage {index + 1} von {questions.length}
            </p>
            <p>{q.question}</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
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
            {!showResult ? (
              <div style={{ marginTop: 16 }}>
                <button onClick={submit} disabled={selected === null}>
                  Antwort prüfen
                </button>
              </div>
            ) : (
              <>
                <p>
                  {selected === q.answer ? 'Richtig! Gut gemacht.' : 'Leider falsch.'}
                </p>
                <p>
                  Richtige Antwort: <strong>{q.options[q.answer]}</strong>
                </p>
                <p>Aktueller Punktestand: {score} / {index + 1}</p>
                <div style={{ marginTop: 16 }}>
                  {index + 1 < questions.length ? (
                    <button onClick={next}>Nächste Frage</button>
                  ) : (
                    <button onClick={restart}>Kategorie neu wählen</button>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  )
}
