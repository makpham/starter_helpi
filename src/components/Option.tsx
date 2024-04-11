import './Option.css'
interface OptionProps{
    OptionTitle: string;
    OptionDescription: string;
    OptionHeight: string;
    onClick: () => void;
};

export function Option(prop: OptionProps){
    return <div onClick={prop.onClick} className='container' style={{height: prop.OptionHeight}}>
            <h1 className='title'>{prop.OptionTitle}</h1>
            <p className='description'>
                {prop.OptionDescription}
            </p>
    </div>
}