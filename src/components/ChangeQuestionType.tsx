import { Button } from 'react-bootstrap';
import './ChangeQuestionType.css'
import { useNavigate } from 'react-router-dom';

interface props{
    page: string,
    text: string
}

function ChangeQuestionType(prop: props){
    const navigate = useNavigate();
    const setPage = (path: string) => {
      navigate(path);
    };
    return <Button className="Merienda" id='change-type' onClick={() => setPage(prop.page)} title='Do detailed questionaire instead'>{prop.text}</Button>
     
}

export default ChangeQuestionType;