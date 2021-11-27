const first = ["紅", "藍", "1", "2", "3"];
const second = ["綠", "棕", "4", "5", "6"];
const third = ["橘", "小", "7", "8", "9"];
const fourth = ["內科", "幹線", "F", "0", "清除"];

const addSearchText = (text, value, onChange) => {
  if (text === "清除") {
    onChange("");
    return;
  }
  onChange(`${value}${text}`);
};

const KeyBoard = ({ value = "", handleChange = () => {} }) => {
  return (
    <div className="w-full fixed bottom-0 z-10 bg-c-white border-t border-b border-gray-500 pt-2 pb-1">
      <div className="flex justify-evenly w-full mb-1">
        {first.map(text => (
          <button
            className="w-2/12 bg-c-primary text-c-white text-base py-2 border border-gray-500 rounded-lg"
            key={text}
            onClick={() => addSearchText(text, value, handleChange)}
          >
            {text}
          </button>
        ))}
      </div>
      <div className="flex justify-evenly w-full mb-1">
        {second.map(text => (
          <button
            className="w-2/12 bg-c-primary text-c-white text-base py-2 border border-gray-500 rounded-lg"
            key={text}
            onClick={() => addSearchText(text, value, handleChange)}
          >
            {text}
          </button>
        ))}
      </div>
      <div className="flex justify-evenly w-full mb-1">
        {third.map(text => (
          <button
            className="w-2/12 bg-c-primary text-c-white text-base py-2 border border-gray-500 rounded-lg"
            key={text}
            onClick={() => addSearchText(text, value, handleChange)}
          >
            {text}
          </button>
        ))}
      </div>
      <div className="flex justify-evenly w-full mb-1">
        {fourth.map(text => (
          <button
            className="w-2/12 bg-c-primary text-c-white text-base py-2 border border-gray-500 rounded-lg"
            key={text}
            onClick={() => addSearchText(text, value, handleChange)}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default KeyBoard;
