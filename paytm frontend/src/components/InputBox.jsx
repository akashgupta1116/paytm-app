const InputBox = ({ label, placeholder, onChange }) => {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">{label}</div>
      <input
        className="w-full px-2 py-1 border border-slate-500 rounded"
        placeholder={placeholder}
        onChange = {onChange}
      />
    </div>
  );
};

export default InputBox;
