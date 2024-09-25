import { Link } from 'react-router-dom';

export default function Cabecalho(props) {

    return (
        <header>
            <div className="title">
                <ul>
                    <li><Link to="/">Home </Link></li>
                    <li><Link to="/Despesas">Despesas </Link></li>
                </ul>
                <h2>{props.titulo}</h2>
            </div>
         </header>
    );
}