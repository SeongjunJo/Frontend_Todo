export const CustomButton = ({ onClick, text, color, disabled, textColor }: ButtonProps) => {
  return (
    <button
      className={`flex-col rounded-sm ${color} opacity-50 hover:opacity-100 ${
        textColor ? `${textColor}` : "text-white"
      } py-1 px-2 mx-2 active:opacity-80`}
      disabled={disabled}
      onClick={() => {
        onClick();
      }}
    >
      {text}
    </button>
  );
};

type ButtonProps = {
  onClick: () => void;
  text: string;
  color: string;
  disabled: boolean;
  textColor?: string;
};
