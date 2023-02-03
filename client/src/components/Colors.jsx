import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { colors } from "../assets/CONSTANTS";

export default function Colors({ activeColor, setColor }) {
  const [selected, setSelected] = useState(colors[0]);
  const activeColorStyle = `bg-[${activeColor}]`;

  return (
    <div className="mt-2">
      <RadioGroup value={selected} onChange={setSelected}>
        <div className="flex gap-3 w-full max-w-xl">
          {colors.map((color, i) => (
            <RadioGroup.Option
              key={i}
              value={color}
              onClick={() => setColor(color.slice(4, 11))}
              className={({ active, checked }) =>
                `${active ? `${color}` : ""}
                  ${checked ? `${color}` : `${color}`}
                    cursor-pointer rounded-full w-9 h-9 shadow-md focus:outline-none border border-black/20`
              }
            >
              {({ active, checked }) => (
                <>
                  <div className="flex w-full items-center justify-between">
                    {checked && <CheckIcon className="h-9 w-9" />}
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M7 13l3 3 7-7"
        stroke="#000"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
