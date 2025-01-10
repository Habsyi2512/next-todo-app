import React, { Dispatch, SetStateAction } from "react";
import Divider from "../Divider";
import ButtonIcon from "../ButtonIcon";
import Card from "../Card";

interface ComponentProps {
  onClick: () => void;
  onClose: Dispatch<SetStateAction<boolean>>;
}

export default function DeleteModal({ onClick, onClose }: ComponentProps) {
  return (
    <div className="fixed z-50 top-0 w-full h-screen left-0 bg-neutral-900/50 flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        {/* header */}
        <header className="px-5 pt-5 flex items-center justify-between">
          <p>Delete Confirmation</p>
          <button
            onClick={() => onClose(false)}
            className="px-4 py-2 hover:bg-neutral-500 text-sm transition-colors rounded-lg"
          >
            Close
          </button>
        </header>
        <Divider />
        {/* content */}
        <div className="px-5 pb-5 space-y-5">
          <div>
            <p>Are you sure you want to delete it?</p>
            <p>This will permanently delete it.</p>
          </div>
          <div className="flex text-sm items-center justify-end space-x-2">
            <ButtonIcon
              className="bg-red-700 hover:bg-red-600"
              onClick={onClick}
            >
              Confirm
            </ButtonIcon>
            <ButtonIcon
              className="bg-neutral-600 hover:bg-neutral-500"
              onClick={() => onClose(false)}
            >
              Cencel
            </ButtonIcon>
          </div>
        </div>
      </Card>
    </div>
  );
}
