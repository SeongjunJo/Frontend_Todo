import { CustomButton } from "./CustomButton";

export function warningPopUp(resetTodos: () => void, closePopUp: () => void) {
  return (
    <div className="absolute flex flex-col justify-evenly items-center h-[15%] w-[20%] bg-white drop-shadow-2xl z-20 rounded-md border-2 border-black">
      <p className="flex">Are you sure to continue?</p>
      <div className="flex items-center">
        <CustomButton
          onClick={() => {
            closePopUp();
          }}
          text="Cancel"
          color="bg-gray-300"
          disabled={false}
          textColor="text-black"
        />
        <CustomButton
          onClick={() => {
            resetTodos();
            closePopUp();
          }}
          text="Reset"
          color="bg-black"
          disabled={false}
        />
      </div>
    </div>
  );
}
