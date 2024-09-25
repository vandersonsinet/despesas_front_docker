import React from 'react';
import '../card.css'; 

function Card({ title, content}) {
    return (
        <div className="card">
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className="card-content">{content}</p>
            </div>
        </div>
    );
}

export default Card;