
import "./button.css"

export default function Button({name, color, number}) {
  return (
    <div>
      <button className="btn">{`Привет ${name}`}</button>
      <h1>{`Тут у нас будет цвет ${color}`}</h1>
      <p>{`Номер моей машины ${number}`}</p>
    </div>
  )
}
