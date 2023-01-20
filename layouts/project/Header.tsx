import React from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { useRouter } from "next/router";
export default function Header({ title }: { title: string }) {
  const router = useRouter();
  return (
    <div className="project__layout__header">
      <AiOutlineLeft
        onClick={() => {
          router.push("/project");
        }}
      />
      <h1>{title}</h1>
    </div>
  );
}
