import React from 'react';
import { useParams } from 'react-router-dom';
import quotes from '../../assets/frases.json'

const Quotes = () => {
  const { id } = useParams();
  const quote = quotes.quotes.find(q => q.id === parseInt(id));

  if (!quote) return <div>Máxima não encontrado.</div>

  return (
    <div>
      <h1>{quote.text}</h1>
      <h2>{quote.author}</h2>
    </div>
  );
};

export default Quotes;
