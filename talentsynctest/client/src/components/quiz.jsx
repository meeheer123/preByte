import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Quiz.css'; // Import the CSS file

const Quiz = () => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const questions = {
    Python: [
      {
        question: 'What is the output of 2 + 3?',
        options: ['4', '5', '6', '7'],
        correctOption: '5',
      },
      {
        question: 'What is the correct way to declare a variable in Python?',
        options: ['var x = 5;', 'int x = 5;', 'x = 5;', 'declare x = 5;'],
        correctOption: 'x = 5;',
      },
    ],
    JavaScript: [
      {
        question: 'What is the result of 3 + 2 + "7"?',
        options: ['57', '32', '12', '5'],
        correctOption: '57',
      },
      {
        question: 'How do you declare a variable in JavaScript?',
        options: [
          'variable x = 5;',
          'var x = 5;',
          'int x = 5;',
          'declare x = 5;',
        ],
        correctOption: 'var x = 5;',
      },
    ],
    Java: [
      {
        question: 'What is the use of static keyword in Java?',
        options: [
          'To define a class as a static class',
          'To define a method as a static method',
          'To define a variable as a class variable',
          'To define a method as a class method',
        ],
        correctOption: 'To define a method as a static method',
      },
      {
        question: 'How do you create a constructor in Java?',
        options: [
          'constructor MyClass()',
          'MyClass.constructor()',
          'public MyClass()',
          'MyClass()',
        ],
        correctOption: 'public MyClass()',
      },
    ],
    CPP: [
      {
        question: 'What is the difference between ++i and i++ in C++?',
        options: [
          '++i increments the value of i and then returns it, while i++ returns the value of i and then increments it',
          '++i increments the value of i by 1, while i++ increments the value of i by 2',
          'There is no difference between ++i and i++ in C++',
          '++i and i++ are invalid in C++',
        ],
        correctOption:
          '++i increments the value of i and then returns it, while i++ returns the value of i and then increments it',
      },
      {
        question: 'What is the output of 5 / 2 in C++?',
        options: ['2', '2.5', '3', '5'],
        correctOption: '2',
      },
    ],
  };

  const handleOptionChange = (category, questionIndex, option) => {
    setSelectedOptions({
      ...selectedOptions,
      [`${category}-${questionIndex}`]: option,
    });
  };

  const calculatePoints = () => {
    let points = 0;
    Object.keys(selectedOptions).forEach((key) => {
      const [category, questionIndex] = key.split('-');
      const question = questions[category][questionIndex];
      if (selectedOptions[key] === question.correctOption) {
        points++;
      }
    });
    return points;
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => setCurrentSlide(index),
  };

  return (
    <div className="quiz-container">
      <Slider {...settings}>
        {Object.keys(questions).map((category) =>
          questions[category].map((question, index) => (
            <div key={`${category}-${index}`}>
              <h3 className="question">{category}</h3>
              <p>{question.question}</p>
              <ul className="options-list">
                {question.options.map((option, optionIndex) => (
                  <li className="option" key={optionIndex}>
                    <label>
                      <input
                        type="radio"
                        name={`${category}-${index}`}
                        value={option}
                        checked={
                          selectedOptions[`${category}-${index}`] === option
                        }
                        onChange={() =>
                          handleOptionChange(category, index, option)
                        }
                      />
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </Slider>
      <button
        type="button"
        onClick={() => setShowResult(true)}
        className="result-button"
      >
        Show Result
      </button>
      {showResult && (
        <div>
          <h3>Points: {calculatePoints()}</h3>
        </div>
      )}
    </div>
  );
};

export default Quiz;
