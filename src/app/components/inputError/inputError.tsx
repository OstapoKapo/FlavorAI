"use client";

import React from "react";
import { InputErrorProps } from "./types";

const InputError: React.FC<InputErrorProps> = ({ message }) =>  {
  if (!message) return null;
  return <span className="text-red-500 text-sm mt-1">{message}</span>;
}

export default InputError;
