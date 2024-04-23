import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function Filters() {
  return (
    <div className="w-full h-full flex items-center justify-around">
      <CheckboxContainer />
      <SelectContainer />
    </div>
  );
}

function CheckboxContainer() {
  return (
    <div>
      <div className="items-top flex space-x-2 mb-2">
        <Checkbox id="terms1" />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms1"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Fullstack
          </label>
        </div>
      </div>
      <div className="items-top flex space-x-2 mb-2">
        <Checkbox id="terms1" />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms1"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Front-End
          </label>
        </div>
      </div>
      <div className="items-top flex space-x-2">
        <Checkbox id="terms1" />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms1"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Back-End
          </label>
        </div>
      </div>
    </div>
  );
}

function SelectContainer() {
  return (
    <>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Señority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Trainee</SelectItem>
          <SelectItem value="light">Junior</SelectItem>
          <SelectItem value="dark">Ssr</SelectItem>
          <SelectItem value="system">Sr</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Modality" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Remote</SelectItem>
          <SelectItem value="dark">Hybrid</SelectItem>
          <SelectItem value="system">In-person</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
