const InputNumber = ({ value, onChange }: {value: number, onChange: () => void}) => {
    return (
      <input
        type="text"
        name="amount"
        id="amount"
        className="text-price w-full text-2xl text-gray600 font-medium leading-7 ms-11 border-0 py-0 focus:outline-none focus:border-0 focus:drop-shadow-none focus:shadow-none"
        value={value}
        onChange={onChange}
      />
    );
  };

export default InputNumber;
