const ModalCard = ({ children }) => {
  return <div className="bg-slate-500 h-screen flex justify-center">
      <div className="flex justify-center flex-col">
          <div className="p-4 bg-white h-max w-90 text-center rounded">{children}</div>
      </div>
    </div>
};

export default ModalCard;
