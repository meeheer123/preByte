import React from 'react';
import Typist from 'react-typist';
import 'react-typist/dist/Typist.css';

const TypingEffect = () => {
  return (
    <Typist>
      Welcome to{' '}
      <span className="px-2 py-1 gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
        Talent
      </span>
      {' '}
      Sync

    </Typist>
  );
};

export default TypingEffect;
