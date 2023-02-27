import { Fragment } from "react";
import { AiOutlineDownCircle } from "react-icons/ai";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface Menu {
  title: string;
  onClick: () => void;
}

export default function DropDownMenu({ menus }: { menus: Menu[] }) {
  return (
    <details className="dropdown">
      <summary role="button">
        <a className="button">
          <AiOutlineDownCircle />
        </a>
      </summary>
      <ul>
        {menus.map((m) => {
          return (
            <li>
              <a
                role="button"
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  m.onClick();
                }}
              >
                {m.title}
              </a>
            </li>
          );
        })}
      </ul>
    </details>
  );
}
