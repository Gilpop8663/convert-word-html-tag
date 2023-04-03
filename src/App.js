import './App.css';
import { useState } from 'react';

function App() {
  const [convertedText, setConventedText] = useState('');
  const [normalTextLength, setNormalTextLength] = useState(0);
  const [nonSpaceLength, setNonSpaceLength] = useState(0);

  const handleSubmit = event => {
    event.preventDefault();
    if (event.target.prevText.value === '') {
      setConventedText('');
      return;
    }

    const prevText = event.target.prevText.value;
    const text = prevText.split('\n');
    const convertedHtmlTagText = text
      .filter(item => item !== '')
      .map(item => `<p>${item}</p>`);
    const convetedText = convertedHtmlTagText.join('<br>');

    setConventedText(convetedText);
  };

  const copyTextClick = () => {
    try {
      navigator.clipboard.writeText(convertedText);
      alert('복사 되었습니다.');
    } catch (error) {
      alert('복사가 되지 않았습니다.');
    }
  };

  const handleChange = event => {
    const text = event.target.value;
    const nonSpaceText = text.replace(/ |\n/gi, '');

    setNormalTextLength(text.length);
    setNonSpaceLength(nonSpaceText.length);
  };

  return (
    <div className="convert-app">
      <h1>문장을 HTML 태그로 바꾸는 사이트</h1>
      <form className="text-form" onSubmit={handleSubmit}>
        <label htmlFor="prevText" className="sub-title">
          바꿀 문장을 입력해주세요
        </label>
        <div className="length-text-wrapper">
          <span>공백 포함</span>
          <span className="length-text">{normalTextLength}자</span>
        </div>
        <div className="length-text-wrapper">
          <span>공백 미포함</span>
          <span className="length-text">{nonSpaceLength}자</span>
        </div>
        <textarea onChange={handleChange} id="prevText" rows={40}></textarea>
        <button className="submit-button">변환하기</button>
      </form>
      {convertedText && (
        <div>
          <div className="next-wrapper">
            <h3>바뀌었습니다</h3>
            <button className="copy-button" onClick={copyTextClick}>
              복사하기
            </button>
          </div>
          <p>{convertedText}</p>
        </div>
      )}
    </div>
  );
}

export default App;
