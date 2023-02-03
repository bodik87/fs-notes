import { useState } from "react";
import { RadioGroup } from "@headlessui/react";

const colors = [
  "bg-[#FFF475]",
  "bg-[#FBBC04]",
  "bg-[#F28B82]",
  "bg-[#CCFF90]",
  "bg-[#A7FFEB]",
  "bg-[#D7AEFB]",
];

export default function Colors({ activeColor, setColor }) {
  const [selected, setSelected] = useState(colors[0]);
  const activeColorStyle = `bg-[${activeColor}]`;

  return (
    <div className="mt-2">
      <RadioGroup value={selected} onChange={setSelected}>
        <div className="flex gap-4 w-full max-w-xl">
          {colors.map((color, i) => (
            <RadioGroup.Option
              key={i}
              value={color}
              onClick={() => setColor(color.slice(4, 11))}
              className={({ active, checked }) =>
                `${active ? `${color}` : ""}
                  ${checked ? `${color}` : `${color}`}
                    cursor-pointer rounded-full w-10 h-10 shadow-md focus:outline-none`
              }
            >
              {({ active, checked }) => (
                <>
                  <div className="flex w-full items-center justify-between">
                    {checked && <CheckIcon className="h-10 w-10" />}
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
      {/* <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" /> */}
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
