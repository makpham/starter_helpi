import "./Option.css";
interface OptionProps {
  OptionTitle: string;
  OptionDescription: string;
  onClick: () => void;
}

export function Option(prop: OptionProps) {
  return (
    <div className="container" onClick={prop.onClick}>
      <h1 className="title">{prop.OptionTitle}</h1>
      <p className="description">{prop.OptionDescription}</p>
    </div>
  );
}
